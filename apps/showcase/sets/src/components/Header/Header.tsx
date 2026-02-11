import { Constants } from "@fefade-ui/core"
import { Badge, Button } from "@fefade-ui/react"

type Props = {
	title: string
	length: number
}

export default function Header({ title, length }: Props) {
	return (
		<div
			style={{
				position: "sticky",
				top: 0,
				zIndex: 20,
				left: 0,
				right: 0,
				display: "flex",
				justifyContent: "center",
				borderTop: `2px solid ${Constants.themeColorVar.border}`
			}}
		>
			<Button
				style={{
					borderBottomLeftRadius: "250px",
					borderBottomRightRadius: "250px",
					padding: "1rem 2rem 1rem 2rem",
					boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
				}}
				onClick={() => {
					window.scrollTo({ top: 0, behavior: "smooth" })
				}}
			>
				<h2 style={{ fontSize: "17px" }}>{title}</h2>
				<Badge size="md">{length}</Badge>
			</Button>
		</div>
	)
}
