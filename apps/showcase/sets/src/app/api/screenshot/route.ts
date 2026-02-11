import puppeteer from "puppeteer-core"
import { z } from "zod"
import { nanoid } from "nanoid"
import { NextRequest, NextResponse } from "next/server"

const form = z.object({
	url: z.url()
})

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url)
		const { data, success } = await form.safeParseAsync({
			url: searchParams.get("url")
		})

		if (!success) {
			throw new Error("Invalid URL")
		}

		const browser = await puppeteer.connect({
			browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BLESS_TOKEN}`
		})

		const page = await browser.newPage()
		await page.goto(data.url, { waitUntil: "networkidle2", timeout: 30000 })

		const screenshotBuffer = await page.screenshot({
			type: "png",
			fullPage: true
		})

		await browser.close()

		const filename = `${nanoid()}.png`

		const blob = new Blob([screenshotBuffer.buffer as ArrayBuffer], {
			type: "image/png"
		})

		return new Response(blob, {
			status: 200,
			headers: {
				"Content-Type": "image/png",
				"Content-Disposition": `attachment; filename="${filename}"`
			}
		})
	} catch (error) {
		console.error(error)
		return NextResponse.json("error", { status: 400 })
	}
}
