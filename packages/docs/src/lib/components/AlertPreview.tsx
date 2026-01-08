import { Constants } from "@fefade-ui/core"
import { Alert } from "@fefade-ui/react"

export default function () {
	return (
		<div>
			{Constants.statusColors.map((color) => (
				<div key={color}>
					<Alert color={color}>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<strong>{color}</strong>
							<small>description</small>
						</div>
					</Alert>
				</div>
			))}
		</div>
	)
}
