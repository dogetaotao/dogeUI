import {FC} from 'react'
import Option, {OptionProps} from "./option";
import Select, {SelectProps} from "./select";

export type ISelectComponent = FC<SelectProps> & {
	Option: FC<OptionProps>
}

const TransSelect = Select as ISelectComponent

TransSelect.Option = Option

export default TransSelect
