import React, {FC, createContext, useState, useRef, useEffect} from 'react';
import {OptionProps} from './option'
import classnames from "classnames";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
import useClickOutside from "../../hooks/useClickOutside";


type Size = 'lg' | 'sm'
type Mode = 'tags' | 'multiple'
type SelectCallBack = (selectOption: string) => void
type OptionCallBack = (value: string, index: string) => void
type onChangeCallBack = (value: string[] | string) => any
type TransitionType = 'top' | 'bottom' | 'left' | 'right'

export interface SelectProps {
	style?: React.CSSProperties
	className?: string,
	size?: Size
	defaultOptionValue?: string,
	defaultOpen?: boolean,
	mode?: Mode,
	onSelect?: SelectCallBack,
	showArrow?: boolean,
	placeholder?: string,
	onChange?: onChangeCallBack
	transitionType?: TransitionType
}

interface ISelectContext {
	index: string[],
	size?: Size
	onSelect?: OptionCallBack,
	mode?: Mode,
}

export const SelectContext = createContext<ISelectContext>({index: []})

const Select: FC<SelectProps> = (props) => {
	const {
		size,
		defaultOptionValue,
		defaultOpen,
		mode,
		onSelect,
		style,
		showArrow,
		placeholder,
		children,
		transitionType,
		onChange,
		className
	} = props
	
	let defaultCurrentValue: string[] = []
	let defaultValueArray: string[] = []
	const [openList, setOpenList] = useState(defaultOpen)
	const [currentChoice, setCurrentChoice] = useState(defaultValueArray)
	const [currentValue, setCurrentValue] = useState(defaultCurrentValue)
	const nodeRef = useRef(null)
	const componentRef = useRef<HTMLDivElement>(null)
	
	useEffect(() => {
		if (onChange) {
			if (mode !== 'tags') {
				onChange(currentValue[0])
			} else {
				onChange(currentValue)
			}
		}
	}, [currentChoice])
	
	useEffect(() => {
		React.Children.map(children, (child, index) => {
			const childElement = child as React.FunctionComponentElement<OptionProps>
			const helpIndex = index.toString()
			if (defaultOptionValue) {
				if (defaultOptionValue === helpIndex) {
					setTimeout(() => {
						setCurrentChoice([...currentChoice, helpIndex])
						setCurrentValue([...currentValue, childElement.props.children])
					})
				}
			}
		})
	}, [])
	
	useClickOutside(componentRef, () => {
		setOpenList(false)
	})
	
	const classes = classnames('doge-select', className, {
		'select-mode-tags': mode && mode === 'tags',
		[`select-size-${size}`]: size,
		'select-defaultOpen': defaultOpen,
		'select-opened': openList
	})
	
	const deleteTags = (index: number) => {
		const helpIndexArray = currentChoice
		const helpValueArray = currentValue
		
		helpIndexArray.splice(index, 1)
		helpValueArray.splice(index, 1)
		
		setCurrentChoice([...helpIndexArray])
		setCurrentValue([...helpValueArray])
	}
	
	const handleClick = (msg: string, index: string) => {
		if (mode === 'tags') {
			
			if (currentChoice.indexOf(index) >= 0) {
				const helpIndex = currentChoice.indexOf(index)
				deleteTags(helpIndex)
				
			} else {
				setCurrentChoice([...currentChoice, index])
				setCurrentValue([...currentValue, msg])
			}
			
		} else {
			setCurrentChoice([index])
			setCurrentValue([msg])
		}
		if (onSelect) {
			onSelect(index)
		}
	}
	
	const sendContext: ISelectContext = {
		index: currentChoice ? currentChoice : [],
		onSelect: handleClick,
		size: size,
		mode: mode,
	}
	
	const clickOpenList = () => {
		setOpenList(!openList)
	}
	
	
	const renderChildren = () => {
		const ulOpenClasses = classnames('select-ul', {
			'select-show-list': openList
		})
		const childComponent = React.Children.map(children, (child, index) => {
			const childElement = child as React.FunctionComponentElement<OptionProps>
			const {displayName} = childElement.type
			const helpIndex = index.toString()
			
			if (displayName === 'option') {
				return React.cloneElement(childElement, {index: helpIndex})
			} else {
				console.error('Warning: Select has a child which is not a Option component')
			}
		})
		
		return (
			<Transition in={openList} timeout={300} nodeRef={nodeRef}
			            animation={transitionType ? `zoom-in-${transitionType}` : 'zoom-in-left'}>
				<ul ref={nodeRef} className={ulOpenClasses}>
					{childComponent}
				</ul>
			</Transition>
		)
	}
	
	const renderValue = () => {
		if (currentChoice.length === 0) return false
		return currentValue.map((value, index) => {
			return <span key={value} className='tags-item'>
					{value}
				<Icon icon='xmark' size='sm' onClick={(e) => {
					//阻止事件冒泡
					e.stopPropagation()
					e.nativeEvent.stopImmediatePropagation()
					return deleteTags(index)
				}}/>
				</span>
		})
	}
	
	//当input聚焦时，取消其焦点，使其无法输入
	const inputOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		event.target.blur()
	}
	
	return (
		<div className={classes} style={style} ref={componentRef}>
			{mode === 'tags' &&
      <span className='select-span' onClick={clickOpenList}>
				{renderValue() || <span className='select-span-placeholder'>{placeholder}</span> || ''}
      </span>
			}
			{mode !== 'tags' &&
      <input
        onClick={clickOpenList}
        className='select-input'
        placeholder={placeholder}
        defaultValue={currentValue[0]}
        type='text'
        onFocus={inputOnFocus}
      />
			}
			{showArrow && <Icon className='select-arrow' icon='angle-down'/>}
			<SelectContext.Provider value={sendContext}>
				{renderChildren()}
			</SelectContext.Provider>
		</div>
	)
}

Select.defaultProps = {
	mode: 'multiple'
}

export default Select;

