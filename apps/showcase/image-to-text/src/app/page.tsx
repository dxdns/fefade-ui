"use client"
import { ChangeEvent, useState } from "react"
import { Button, Link, Textarea } from "@fefade-ui/react"
import { default as NextLink } from "next/link"
import apiService from "$lib/services/apiService"
import { Constants } from "@fefade-ui/core"

export default function ImageToText() {
	const [texts, setTexts] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const api = apiService()
	const maxSize = 2 * 1024 * 1024

	async function handleChange(e: ChangeEvent<HTMLInputElement>) {
		e.preventDefault()

		try {
			setIsLoading(true)
			setTexts([])

			const file = e.target.files?.[0]
			if (!file) {
				throw new Error("No file selected.")
			}
			if (file.size > maxSize) {
				throw new Error("The image must be a maximum of 2 MB.")
			}

			const formData = new FormData()
			formData.append("file", file)

			const response = await api.imageToText(formData)
			if (!response.ok) throw new Error("error")

			const obj = await response.json()
			setTexts(obj.texts)
		} catch (err) {
			if (err instanceof Error) {
				alert(err.message)
			} else {
				console.error(err)
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
			<Link as={NextLink} href="/" title="image to text">
				<h1>Image to text</h1>
			</Link>

			<label
				htmlFor="file-input"
				style={{
					border: `2px dashed ${Constants.themeColorVar.muted}`,
					borderRadius: "8px",
					padding: "2rem",
					textAlign: "center",
					cursor: "pointer"
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 -960 960 960"
					style={{
						display: "inline-block",
						verticalAlign: "middle",
						fill: "currentColor",
						height: "50px",
						width: "50px"
					}}
				>
					<path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
				</svg>

				<p>Drag and drop</p>
				<p>or</p>

				<Button isLoading={isLoading} variant="outlined" title="browse file">
					Choose file
				</Button>

				<input
					id="file-input"
					type="file"
					accept="image/png, image/jpeg"
					onChange={handleChange}
					style={{ display: "none" }}
				/>
			</label>

			{texts.length > 0 && (
				<Textarea
					id="text-output"
					defaultValue={texts.join("").trim()}
					style={{ minHeight: "150px" }}
				/>
			)}
		</div>
	)
}
