import React, {useContext, useState, FunctionComponentElement, useRef} from 'react';
import classnames from "classnames";
import {MenuContext} from "./menu"
import {MenuItemProps} from "./menuItem";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";

type TransitionType = 'top' | 'bottom' | 'left' | 'right'
export interface SubMenuProps {
	index?: string,
	title: string,
	className?: string,
	transitionType?: TransitionType
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
	const {className, children, index, title, transitionType} = props
	const context = useContext(MenuContext)
	const openedSubMenus = context.defaultOpenSubMenus as Array<string>
	const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
	const [menuOpen, setOpen] = useState(isOpened)
	const nodeRef = useRef(null)
	const classes = classnames('menu-item submenu-item', className, {
		'is-active': context.index === index,
		'is-opened': menuOpen,
		'is-vertical': context.mode === 'vertical'
	})
	
	const handleClick = (e: React.MouseEvent) => {
		//阻止默认的点击动作发生
		e.preventDefault()
		setOpen(!menuOpen)
	}
	let timer: any
	const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
		clearTimeout(timer)
		//阻止默认的点击动作发生
		e.preventDefault()
		timer = setTimeout(() => {
			setOpen(toggle)
		}, 300)
	}
	const renderChildren = () => {
		const subMenuClasses = classnames('doge-submenu', {
			'menu-opened': menuOpen
		})
		const childrenComponent = React.Children.map(children, (child, i) => {
			const childElement = child as FunctionComponentElement<MenuItemProps>
			if (childElement.type.displayName === 'MenuItem') {
				return React.cloneElement(childElement, {
					index: `${index}-${i}`
				})
			} else {
				console.error('Warning: SUbMenu has a child which is not a MenuItem Component')
			}
		})
		return (
			// @ts-ignore
			<Transition in={menuOpen} timeout={300} nodeRef={nodeRef} animation={transitionType? `zoom-in-${transitionType}`: 'zoom-in-left'}>
				<ul ref={nodeRef} className={subMenuClasses}>
					{childrenComponent}
				</ul>
			</Transition>
		)
	}
	const clickEvents = context.mode === "vertical" ? {
		onClick: handleClick
	} : {}
	const hoverEvents = context.mode !== 'vertical' ? {
		onMouseEnter: (e: React.MouseEvent) => {
			handleMouse(e, true)
		},
		onMouseLeave: (e: React.MouseEvent) => {
			handleMouse(e, false)
		}
	} : {}
	return (
		<li key={index} className={classes} {...hoverEvents}>
			<div className='submenu-title' {...clickEvents}>
				{title}
				<Icon icon='angle-down'/>
			</div>
			{renderChildren()}
		</li>
	)
}

SubMenu.displayName = 'SubMenu'
SubMenu.defaultProps = {
	transitionType: 'left'
}
export default SubMenu