import fs from "fs"
import path from "path"
import { createWorker, type ImageLike } from "tesseract.js"

async function imageToTextUtil(image: ImageLike) {
	const worker = await createWorker("eng", undefined, { corePath: "/tmp" })
	const ret = await worker.recognize(image, {}, { imageBinary: true })
	const text = ret.data.text
	await worker.terminate()
	return text
}

export async function POST(req: Request) {
	const texts: string[] = []

	try {
		const formData = await req.formData()
		const file = formData.get("file") as File

		if (!file) {
			throw new Error("No files received.")
		}

		const buffer = Buffer.from(await file.arrayBuffer())
		const filename = file.name.replaceAll(" ", "_")
		const pathImage = path.join("/tmp", filename)

		fs.writeFile(pathImage, buffer, () => {})

		await imageToTextUtil(pathImage)
			.then((text: string) => {
				texts.push(text)
			})
			.finally(() => {
				fs.rm(pathImage, () => {})
			})
	} catch (err: any) {
		return Response.json({ error: err.message }, { status: 400 })
	}

	return Response.json({ texts: texts.join(" ").split("\n") })
}
