"use client"
import apiService from "$lib/services/apiService"
import { Header } from "$lib/components/Header"
import { CardInfo } from "$lib/components/InfoCard"
import { Grid } from "$lib/components/Grid"

export default function () {
	const api = apiService()
	const data = api.getTypography()

	return (
		<div>
			<Header title="Typography" length={data.length} />

			<Grid>
				{data
					.slice()
					.reverse()
					.map((props) => (
						<CardInfo key={props.label} {...props} />
					))}
			</Grid>
		</div>
	)
}
