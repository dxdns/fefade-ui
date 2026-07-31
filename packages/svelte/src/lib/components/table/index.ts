import TableComponent from "./Table.svelte"
import TableRowComponent from "./TableRow.svelte"
import TableHeaderCellComponent from "./TableHeaderCell.svelte"
import TableCellComponent from "./TableCell.svelte"
import TableHeadComponent from "./TableHead.svelte"
import ExpandButtonComponent from "./ExpandButton.svelte"

type TableComponentType = typeof TableComponent & {
	Row: typeof TableRowComponent
	HeaderCell: typeof TableHeaderCellComponent
	Cell: typeof TableCellComponent
	Head: typeof TableHeadComponent
	ExpandButton: typeof ExpandButtonComponent
}

const Table = TableComponent as any as TableComponentType
Table.Row = TableRowComponent
Table.HeaderCell = TableHeaderCellComponent
Table.Cell = TableCellComponent
Table.Head = TableHeadComponent
Table.ExpandButton = ExpandButtonComponent

export { Table as default }
