import { Badge, Card } from "@fefade-ui/react"
import Image from "next/image"
import { DataType } from "$lib/types"
import noImage from "$lib/assets/images/no-image.jpg"
import { Constants } from "@fefade-ui/core"
import styles from "./InfoCard.module.css"

export default function InfoCard({
	label,
	link,
	tags,
	image,
	license
}: DataType) {
	return (
		<Card
			key={label}
			href={link}
			target="_blank"
			style={{
				cursor: "pointer",
				textAlign: "center",
				padding: 0,
				lineHeight: 2
			}}
		>
			<div style={{ position: "relative" }}>
				<Image
					priority
					className={styles.image}
					alt={label}
					src={image ?? noImage.src}
					width={500}
					height={250}
				/>

				{tags && (
					<div
						style={{
							display: "flex",
							gap: "0.5rem",
							position: "absolute",
							right: 0,
							background: Constants.themeColorVar.bg,
							padding: "0.3rem 0.5rem",
							borderRadius: "5px 0 0 0",
							zIndex: 1,
							bottom: "5px"
						}}
					>
						{tags.slice(0, 3).map((tag, i) => (
							<Badge key={`${tag}-${i}`} variant="outlined">
								{tag}
							</Badge>
						))}
					</div>
				)}
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "0 1rem",
					gap: "0.5rem"
				}}
			>
				<h3
					style={{
						width: "100%",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis"
					}}
				>
					{label}
				</h3>
				{license && <Badge size="md">{license.split(" ")[0]}</Badge>}
			</div>
		</Card>
	)
}
