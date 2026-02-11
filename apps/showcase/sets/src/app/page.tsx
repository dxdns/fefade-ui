"use client"
import { Card } from "@fefade-ui/react"

export default function Home() {
	const paddings = [40, 30, 20, 10, 5]

	return (
		<div
			style={{
				position: "relative",
				width: "100%",
				height: 350,
				margin: "0 auto"
			}}
		>
			{paddings.map((pad, i) => (
				<Card
					key={i}
					animatedBorder
					style={{
						padding: `${pad}px`,
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						transform: `translate(${i * 5}px, ${i * 5}px)`,
						zIndex: i
					}}
				/>
			))}

			<h1
				style={{
					fontSize: "clamp(3.6rem,9vw + 2rem,8rem)",
					textAlign: "center",
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					margin: 0,
					pointerEvents: "none",
					zIndex: paddings.length + 1
				}}
			>
				Sets
			</h1>
		</div>
	)
}
