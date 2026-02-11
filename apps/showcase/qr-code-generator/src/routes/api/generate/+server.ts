import { json, type RequestEvent } from "@sveltejs/kit"
import QRCode from "qrcode"
import { createCanvas, loadImage } from "canvas"
import { z } from "zod"
import { nanoid } from "nanoid"

const form = z.object({
	content: z.string().min(1),
	image: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: "File is empty." })
		.optional()
		.or(z.literal(undefined))
})

function qrCodeUtil() {
	return {
		async generate(text: string, logoPath?: string | Buffer) {
			const qrCodeData = await QRCode.toDataURL(text, {
				errorCorrectionLevel: "H"
			})

			const canvas = createCanvas(300, 300)
			const ctx = canvas.getContext("2d")

			const qrCodeImage = await loadImage(qrCodeData)
			ctx.drawImage(qrCodeImage, 0, 0, 300, 300)

			if (logoPath) {
				const logo = await loadImage(logoPath)

				const logoSize = 60
				const x = (canvas.width - logoSize) / 2
				const y = (canvas.height - logoSize) / 2
				ctx.drawImage(logo, x, y, logoSize, logoSize)
			}

			return canvas
		}
	}
}

export async function POST({ request }: RequestEvent) {
	const _qrCodeUtil = qrCodeUtil()

	try {
		const formData = await request.formData()

		const parsed = form.parse({
			content: formData.get("content"),
			image: formData.get("image") ?? undefined
		})

		const arrayBuffer = await parsed.image?.arrayBuffer()
		const logoBuffer = arrayBuffer ? Buffer.from(arrayBuffer) : undefined

		const imageBuffer = await _qrCodeUtil.generate(parsed.content, logoBuffer)

		const nanoId = nanoid()
		return new Response(imageBuffer.toBuffer("image/png"), {
			status: 200,
			headers: {
				"Content-Type": "image/png",
				"Content-Disposition": `inline; filename="${nanoId}.png"`
			}
		})
	} catch (error) {
		return json(JSON.stringify(error), { status: 500 })
	}
}
