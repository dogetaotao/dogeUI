import React, {useState, createContext, FC} from "react";
import classnames from "classnames";
import {MenuItemProps} from "./menuItem";


//水平标签or垂直标签
type MenuMode = 'horizontal' | 'vertical'
type SelectCallBack = (selectedIndex: string) => void

export interface MenuProps {
	defaultIndex?: string,
	className?: string,
	mode?: MenuMode,
	style?: React.CSSProperties,
	onSelect?: SelectCallBack,
	defaultOpenSubMenus?: string[]
}

//在父组件上可以指定回调，通过context传递回调给子组件
interface IMenuContext {
	index: string,
	onSelect?: SelectCallBack,
	mode?: MenuMode,
	//设置需要自动展开的subMenu
	defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

const Menu: FC<MenuProps> = (props) => {
	const {
		className,
		defaultIndex,
		mode,
		children,
		style,
		onSelect,
		defaultOpenSubMenus,
	} = props
	
	const classes = classnames('doge-menu', className, {
		'menu-vertical': mode === 'vertical',
		'menu-horizontal': mode !== 'vertical'
	})
	//标签的父组件储存处于活动的标签的标号
	const [currentActive, setActive] = useState(defaultIndex)
	
	const handleClick = (index: string) => {
		//点击时切换处于活动状态的item，设置标号
		setActive(index)
		if (onSelect) {
			onSelect(index)
		}
	}
	
	const sendContext: IMenuContext = {
		//没有标签打开时，活动标签设为index为0的标签
		index: currentActive ? currentActive : '0',
		onSelect: handleClick,
		mode: mode,
		defaultOpenSubMenus: defaultOpenSubMenus
	}
	//判断Menu下面的子组件是否都是MenuItem
	const renderChildren = () => {
		return React.Children.map(children, (child, index) => {
			const childElement = child as React.FunctionComponentElement<MenuItemProps>
			const {displayName} = childElement.type
			if (displayName === 'MenuItem' || displayName === 'SubMenu') {
				//使用子组件上下文顺序作为其index，方便了使用
				return React.cloneElement(childElement, {index: index.toString()})
			} else {
				console.error('Warning: Menu has a child which is not a MenuItem component')
			}
		})
	}
	
	return (
		<ul className={classes} style={style} data-testid='test-menu'>
			<MenuContext.Provider value={sendContext}>
				{renderChildren()}
			</MenuContext.Provider>
		</ul>
	)
	
}

Menu.defaultProps = {
	defaultIndex: '0',
	mode: 'horizontal',
	defaultOpenSubMenus: []
}


export default Menu