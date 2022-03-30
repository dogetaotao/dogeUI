import React, {useContext} from 'react';
import classnames from "classnames";
import {MenuContext} from "./menu"

export interface MenuItemProps {
	index?: string, //标签标号
	disabled?: boolean,
	className?: string,
	style?: React.CSSProperties
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
	const {index, disabled, style, className, children} = props
	
	const context = useContext(MenuContext)
	
	const classes = classnames(className, 'menu-item', {
		'is-disabled': disabled,
		'is-active': context.index === index
	})
	const handleClick = () => {
		if (context.onSelect && !disabled && (typeof index === 'string')) {
			context.onSelect(index)
		}
	}
	
	return (
		<li className={classes} style={style} onClick={handleClick}>
			{children}
		</li>
	)
}

export default MenuItem;

MenuItem.defaultProps = {
	disabled: false
}
//给MenuItem绑定displayName，方便类型判断
MenuItem.displayName = 'MenuItem'