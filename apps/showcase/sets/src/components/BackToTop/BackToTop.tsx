"use client"
import { Button } from "@fefade-ui/react"
import { ChevronUpIcon } from "lucide-react"

interface Props {
	isVisible: boolean
}

export default function BackToTop({ isVisible }: Props) {
	return (
		<Button
			roundedFull
			variant="outlined"
			style={{
				position: "fixed",
				bottom: "1rem",
				right: "2rem",
				opacity: isVisible ? "1" : "0",
				pointerEvents: isVisible ? "auto" : "none",
				transition: "0.3s opacity ease-in-out"
			}}
			onClick={() => {
				window.scrollTo({
					top: 0,
					behavior: "smooth"
				})
			}}
			aria-label="Back to top"
		>
			<ChevronUpIcon size={24} />
		</Button>
	)
}
