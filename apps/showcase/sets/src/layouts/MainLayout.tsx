"use client"
import { Navbar } from "$lib/components/Navbar"
import { Provider } from "@fefade-ui/react"
import { ReactNode } from "react"

interface Props {
	children: ReactNode
}

export default function MainLayout({ children }: Props) {
	return (
		<Provider>
			<div style={{ width: "80%", padding: "1rem", margin: "0 auto" }}>
				<Navbar />
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						minHeight: "calc(100vh - 250px)"
					}}
				>
					{children}
				</div>
			</div>
		</Provider>
	)
}
