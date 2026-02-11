import { PropsWithChildren } from "react"

export default function Grid({ children }: PropsWithChildren) {
	return (
		<div
			style={{
				display: "grid",
				gap: "1rem",
				gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
				padding: "1rem 0"
			}}
		>
			{children}
		</div>
	)
}
