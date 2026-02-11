import React from "react"
import { Inter } from "next/font/google"
import { Metadata } from "next"
import { MainLayout } from "$lib/layouts"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Image to text | fefade",
	description: "Convert image to text. PNG | JPG to text",
	alternates: {
		canonical: "https://image-to-text.fefade.com"
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-br" data-theme="dark">
			<body className={inter.className}>
				<MainLayout>{children}</MainLayout>
			</body>
		</html>
	)
}
