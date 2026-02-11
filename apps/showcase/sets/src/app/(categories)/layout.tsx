"use client"
import { BackToTop } from "$lib/components/BackToTop"
import { VisibilityListener } from "@fefade-ui/react"
import { ReactNode, useState } from "react"

export default function RootLayout({
	children
}: Readonly<{
	children: ReactNode
}>) {
	const [backToTopIsVisible, setBackToTopIsVisible] = useState(false)

	return (
		<>
			<BackToTop isVisible={backToTopIsVisible} />
			{children}
			<VisibilityListener callback={setBackToTopIsVisible} />
		</>
	)
}
