import React, {ChangeEvent, KeyboardEvent, FC, ReactElement, useEffect, useState, useRef} from 'react';
import classnames from "classnames";
import Input, {InputProps} from "../Input/input";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";

interface DataSourceObject {
	value: string
}

type TransitionType = 'top' | 'bottom' | 'left' | 'right'
export type DataSourceType<T = {}> = T & DataSourceObject

interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
	fetchSuggestions: (keyword: string) => DataSourceType[] | Promise<DataSourceType[]>,
	onSelect?: (item: DataSourceType) => void,
	renderOption?: (item: DataSourceType) => ReactElement,
	delayTime?: number,
	transitionType?: TransitionType
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {
	const {
		fetchSuggestions,
		onSelect,
		renderOption,
		value,
		delayTime,
		transitionType,
		...restProps
	} = props
	const [inputValue, setInputValue] = useState(value as string)
	const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
	const [loading, setLoading] = useState(false)
	const [showDropdown, setShowDropdown] = useState(false)
	const [highlightIndex, setHighlightIndex] = useState(-1)
	//防止suggestions列表为空时，ul的样式影响显示
	const [ulDisplay, setUlDisplay] = useState(true)
	const componentRef = useRef<HTMLDivElement>(null)
	const triggerSearch = useRef(false)
	//添加节流的hooks
	const debouncedValue = useDebounce(inputValue, delayTime)
	//点选其他位置缩回建议的hooks
	useClickOutside(componentRef, () => {
		setSuggestions([])
		setUlDisplay(true)
	})
	
	useEffect(() => {
		if (debouncedValue && triggerSearch.current) {
			setUlDisplay(false)
			setSuggestions([])
			const results = fetchSuggestions(debouncedValue)
			if (results instanceof Promise) {
				setLoading(true)
				results.then(data => {
					setLoading(false)
					setSuggestions(data)
					if (data.length > 0) {
						setShowDropdown(true)
					}
				})
			} else {
				setSuggestions(results)
				if (results.length > 0) {
					setShowDropdown(true)
				}
			}
		} else {
			setShowDropdown(false)
		}
		setHighlightIndex(-1)
	}, [debouncedValue, fetchSuggestions])
	
	const ulClassNames = classnames('doge-suggestions-list', {
		'doge-suggestions-display-none': ulDisplay
	})
	
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim()
		setInputValue(value)
		triggerSearch.current = true
	}
	
	const handleSelect = (item: DataSourceType) => {
		setInputValue(item.value)
		setSuggestions([])
		if (onSelect) {
			onSelect(item)
		}
		triggerSearch.current = false
	}
	
	const highlight = (index: number) => {
		if (index < 0) index = 0
		if (index >= suggestions.length) {
			index = suggestions.length - 1
		}
		setHighlightIndex(index)
	}
	
	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		switch (e.key) {
			case 'Enter':
				if (suggestions[highlightIndex]) {
					handleSelect(suggestions[highlightIndex])
				}
				break
			case 'ArrowUp':
				highlight(highlightIndex - 1)
				break
			case 'ArrowDown':
				highlight(highlightIndex + 1)
				break
			case 'Escape':
				setShowDropdown(false)
				break
			default:
				break
		}
	}
	
	const renderTemplate = (item: DataSourceType) => {
		return renderOption ? renderOption(item) : item
	}
	
	const generateDropdown = () => {
		return (
			<Transition
				in={showDropdown || loading}
				animation={transitionType ? `zoom-in-${transitionType}` : 'zoom-in-left'}
				timeout={300}
				onExited={() => {
					setSuggestions([])
				}}
			>
				<ul className={ulClassNames}>
					{loading &&
					<div className='suggestions-loading-icon'>
						<Icon icon='circle' theme='primary' beatFade/>
					</div>
					}
					{
						(!loading && suggestions.length === 0) &&
						<div className='suggestions-loading-icon'>
							<Icon icon='file-circle-xmark' theme='primary' opacity='.5'/>
						</div>
					}
					{
						suggestions.map((item, index) => {
							const classNames = classnames('suggestions-item', {
								'item-highlighted': index === highlightIndex
							})
							return (
								<li key={index} onClick={() => handleSelect(item)} className={classNames}>
									{renderTemplate(item)}
								</li>
							)
						})
					}
				</ul>
			</Transition>
		)
	}
	
	return (
		<div className='doge-auto-complete' ref={componentRef}>
			<Input
				value={inputValue}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				{...restProps}
			/>
			{generateDropdown()}
		</div>
	)
}

AutoComplete.defaultProps = {
	delayTime: 500,
	transitionType: 'left'
}

export default AutoComplete;