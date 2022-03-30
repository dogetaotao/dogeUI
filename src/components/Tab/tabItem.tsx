import React, {useContext} from "react";
import classnames from "classnames";
import {TabContext} from "./tab";

export interface TabItemProps {
	index?: string,
	disabled?: boolean,
	className?: string,
	style?: React.CSSProperties
}

const TabItem: React.FC<TabItemProps> = (props) => {
	const {index, children, disabled, className, style} = props
	
	const context = useContext(TabContext)
	
	const classes = classnames(className, 'tab-item', {
		'is-disabled' : disabled,
		'is-active' : context.index === index
	})
	
	const handleClick = () => {
		if(context.onSelect && !disabled && (typeof index === 'string')){
			context.onSelect(index)
		}
	}
	return(
		<li className={classes} style={style} onClick={handleClick}>
			{children}
		</li>
	)
}

export default TabItem

TabItem.defaultProps = {
	disabled: false
}

TabItem.displayName = 'TabItem'