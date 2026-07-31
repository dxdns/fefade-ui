<script lang="ts">
	import { Button, Table } from "@fefade-ui/svelte"
	import { Constants } from "@fefade-ui/core"
	import { SvelteSet } from "svelte/reactivity"

	let invoicesData = $state([
		{
			id: 107268,
			customerId: 9,
			transactionId: 291246,
			amount: "20.5",
			status: "Pending",
			installment: "1/1",
			installmentNumber: "1",
			createdAt: "2024-10-16T00:00:00-03:00",
			expiresAt: "2024-11-15T00:00:00-03:00"
		},
		{
			id: 107179,
			customerId: 9,
			transactionId: 291072,
			amount: "35.38",
			status: "Pending",
			installment: "1/2",
			installmentNumber: "1",
			createdAt: "2024-10-14T00:00:00-03:00",
			expiresAt: "2024-11-13T00:00:00-03:00"
		},
		{
			id: 107180,
			customerId: 9,
			transactionId: 291072,
			amount: "11.38",
			status: "Pending",
			installment: "2/2",
			installmentNumber: "1",
			createdAt: "2024-10-15T00:00:00-03:00",
			expiresAt: "2024-11-14T00:00:00-03:00"
		}
	])

	const groupedInvoices = $derived(
		Map.groupBy(invoicesData, (invoice) => invoice.transactionId)
	)

	const expandedRows = new SvelteSet<number>()

	function toggleRow(index: number) {
		if (expandedRows.has(index)) {
			expandedRows.delete(index)
		} else {
			expandedRows.add(index)
		}
	}
</script>

<Table>
	<Table.Head>
		<Table.Row>
			<Table.HeaderCell>Transaction</Table.HeaderCell>
			<Table.HeaderCell>Invoices</Table.HeaderCell>
			<Table.HeaderCell></Table.HeaderCell>
		</Table.Row>
	</Table.Head>

	<tbody>
		{#each groupedInvoices as [transactionId, invoices] (transactionId)}
			<Table.Row
				onclick={() => toggleRow(transactionId)}
				style="cursor:pointer; user-select: none;"
			>
				<Table.Cell
					style="display: flex; gap: 1rem; align-items: center; justify-content: center;"
				>
					<Table.ExpandButton expanded={expandedRows.has(transactionId)} />
					{transactionId}
				</Table.Cell>

				<Table.Cell>
					{invoices.length}
				</Table.Cell>

				<Table.Cell>
					<Button disabled>Disabled</Button>
				</Table.Cell>
			</Table.Row>

			{#if expandedRows.has(transactionId)}
				{@const borderStyle = `border: 1px solid ${Constants.themeColorVar.border};`}
				<Table.Row>
					<Table.Cell colspan={3}>
						<Table>
							<Table.Head>
								<Table.Row>
									<Table.HeaderCell style={borderStyle}>ID</Table.HeaderCell>
									<Table.HeaderCell style={borderStyle}>
										Status
									</Table.HeaderCell>
									<Table.HeaderCell style={borderStyle}>Value</Table.HeaderCell>
									<Table.HeaderCell style={borderStyle}>
										Installment
									</Table.HeaderCell>
								</Table.Row>
							</Table.Head>

							<tbody>
								{#each invoices as invoice (invoice.id)}
									<Table.Row>
										<Table.Cell style={borderStyle}>
											{invoice.id}
										</Table.Cell>
										<Table.Cell style={borderStyle}>
											{invoice.status}
										</Table.Cell>
										<Table.Cell style={borderStyle}>
											{invoice.amount}
										</Table.Cell>
										<Table.Cell style={borderStyle}>
											{invoice.installment}
										</Table.Cell>
									</Table.Row>
								{/each}
							</tbody>
						</Table>
					</Table.Cell>
				</Table.Row>
			{/if}
		{/each}
	</tbody>
</Table>
