import SelectComponent from "./Select.svelte"
import SelectOptionComponent from "./SelectOption.svelte"

type SelectComponentType = typeof SelectComponent & {
	Option: typeof SelectOptionComponent
}

const Select = SelectComponent as any as SelectComponentType
Select.Option = SelectOptionComponent

export { Select as default }
