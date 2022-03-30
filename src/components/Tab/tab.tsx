import React, {createContext, useState} from "react";
import classnames from "classnames";

type tabStyle = 'line' | 'card'
type mode = 'vertical' | 'horizontal'
type SelectCallBack = (selectedIndex: string) => void

export interface TabsProps {
	defaultIndex?: string,
	className?: string,
	tabStyle?: tabStyle,
	style?: React.CSSProperties,
	mode?: mode
	onSelect?: SelectCallBack
}

interface ITabContext {
	index: string,
	onSelect?: SelectCallBack,
	tabStyle?: tabStyle
	mode?: mode
}

export const TabContext = createContext<ITabContext>({index: '0'})


const Tab: React.FC<TabsProps> = (props) => {
	const {className, children, mode, tabStyle, style, defaultIndex, onSelect} = props
	const classes = classnames('doge-tab', className, {
		'tab-vertical': mode === 'vertical' && tabStyle !== 'card',
		'tab-horizontal': mode !== 'vertical' || tabStyle === 'card',
		'tab-card': tabStyle === 'card' && mode !== 'vertical',
		'tab-line': tabStyle !== 'card'
	})
	
	const [currentActive, setActive] = useState(defaultIndex)
	
	const handleClick = (index: string) => {
		setActive(index)
		if (onSelect) {
			onSelect(index)
		}
	}
	
	const sendContext: ITabContext = {
		index: currentActive ? currentActive : '0',
		onSelect: handleClick,
		mode: mode,
		tabStyle: tabStyle
	}
	
	const renderChildren = () => {
		return React.Children.map(children, (child, index) => {
			const childElement = child as React.FunctionComponentElement<ITabContext>
			const {displayName} = childElement.type
			if (displayName === 'TabItem') {
				return React.cloneElement(childElement, {index: index.toString()})
			} else {
				console.error('Warning: Tab has a child which is not a TabItem component')
			}
		})
		
	}
	
	
	return (
		<ul className={classes} style={style}>
			<TabContext.Provider value={sendContext}>
				{renderChildren()}
			</TabContext.Provider>
		</ul>
	)
}

export default Tab

Tab.defaultProps = {
	defaultIndex: '0',
	mode:'horizontal',
	tabStyle: 'line'
}