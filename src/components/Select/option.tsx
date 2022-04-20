import React, {FC, useContext} from 'react';
import {SelectContext} from "./select";
import classnames from "classnames";


export interface OptionProps {
	children: string;
	index?: string,
	className?: string,
	style?: React.CSSProperties,
	disabled?: boolean
}


const Option: FC<OptionProps> = (props) => {
	
	const {index, disabled, className, style, children} = props
	
	const context = useContext(SelectContext)
	
	const checkChoice = () => {
		if (context.index.length === 0) {
			return false
		} else {
			return context.index.indexOf(index as string) >= 0
		}
	}
	
	const classes = classnames(className, 'select-option', {
		'is-disabled': disabled,
		'is-choice': checkChoice()
	})
	
	const handleClick = () => {
		if (context.onSelect && !disabled && (typeof index === 'string')) {
			context.onSelect(children as string, index)
		}
	}
	
	return (
		<li className={classes} style={style} onClick={handleClick}>
			{children}
		</li>
	)
}

Option.defaultProps = {
	disabled: false
}

Option.displayName = 'option'
export default Option;