import type { RequestHandler } from "./$types"
import { z } from "zod"

const form = z.object({
	streamUrl: z.url("invalid")
})

export const GET: RequestHandler = async ({ fetch, url }) => {
	const parseResult = form.safeParse({
		streamUrl: url.searchParams.get("streamUrl")
	})

	if (!parseResult.success) {
		return new Response(JSON.stringify({ error: parseResult.error.format() }), {
			status: 400
		})
	}

	const { streamUrl } = parseResult.data

	let closed = false

	return new Response(
		new ReadableStream({
			start(controller) {
				const safeEnqueue = (data: string) => {
					if (closed) return
					try {
						controller.enqueue(new TextEncoder().encode(data))
					} catch {
						closed = true
					}
				}

				const safeClose = () => {
					if (closed) return
					closed = true
					controller.close()
				}

				;(async () => {
					try {
						const res = await fetch(streamUrl, {
							headers: { "Icy-MetaData": "1" }
						})

						const metaint = parseInt(res.headers.get("icy-metaint") || "")
						if (!metaint) {
							const radioName = res.headers.get("icy-name") || "unknown"
							safeEnqueue(`data: ${radioName}\n\n`)
							safeClose()
							return
						}

						const reader = res.body!.getReader()
						let audioData = new Uint8Array()

						while (!closed) {
							const { done, value } = await reader.read()
							if (done || closed) break
							if (!value) continue

							const merged = new Uint8Array(audioData.length + value.length)
							merged.set(audioData)
							merged.set(value, audioData.length)
							audioData = merged

							while (audioData.length >= metaint + 1 && !closed) {
								audioData = audioData.slice(metaint)

								const metaLength = audioData[0] * 16
								if (audioData.length < 1 + metaLength) break

								const metaBlock = audioData.slice(1, 1 + metaLength)
								const metaStr = new TextDecoder("utf-8")
									.decode(metaBlock)
									.replace(/\0/g, "")
									.replace(/�/g, "ô")
									.replace(/À/g, "ã")
									.replace(/‡/g, "ç")

								const match = /StreamTitle='([^']*)'/.exec(metaStr)
								if (match?.[1]) {
									safeEnqueue(`data: ${match[1]}\n\n`)
								}

								audioData = audioData.slice(1 + metaLength)
							}
						}

						safeClose()
					} catch (error: any) {
						if (!closed) {
							safeEnqueue(`event: error\ndata: ${error.message}\n\n`)
							safeClose()
						}
					}
				})()
			},

			cancel() {
				closed = true
			}
		}),
		{
			headers: {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
				Connection: "keep-alive"
			}
		}
	)
}
