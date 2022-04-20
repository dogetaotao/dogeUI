import React, {ChangeEvent, FC, InputHTMLAttributes, ReactElement} from 'react';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import classnames from "classnames";
import Icon from "../Icon/icon";

type InputSize = 'lg' | 'sm' | 'def'
type InputType = 'password' | 'search' | 'text'
type Status = 'error' | 'warning'

//使用omit忽略Input默认的props里的size属性
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
	size?: InputSize,
	disabled?: boolean,
	icon?: IconProp,
	iconLeft?: boolean,
	status?: Status,
	prepend?: ReactElement,
	append?: ReactElement,
	inputType?: InputType
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = (props) => {
	const {size, disabled, status, icon, iconLeft, prepend, append, style, className, ...restProps} = props
	
	const classes = classnames('doge-input-wrapper', className, {
		[`input-size-${size}`]: size,
		[`input-status-${status}`]: status,
		'disabled': disabled,
		'input-group': prepend || append,
		//用双感叹号转化成boolean值，防止输入空字符串或者不存在的element
		'input-group-append': !!append,
		'input-group-prepend': !!prepend
	})
	
	const iconClasses = classnames('icon-wrapper', {
		'icon-left': iconLeft
	})
	
	const fixControlledValue = (value: any) => {
		if (typeof value === 'undefined' || value === null) {
			return ''
		}
		return value
	}
	//React中，input组件不能同时存在value与defaultValue，
	// 存在value时为受控组件，需要用onChange监控，
	// 存在defaultValue时为非受控组件，和原生组件没什么区别
	if ('value' in props) {
		delete restProps.defaultValue
		restProps.value = fixControlledValue(props.value)
	}
	
	return (
		<div className={classes} style={style}>
			{prepend && <div className='doge-input-group-prepend'>{prepend}</div>}
			{icon && <div className={iconClasses}><Icon icon={icon} title={`title-${icon}`}/></div>}
			<input
				className='doge-input-inner'
				disabled={disabled}
				{...restProps}
			/>
			{append && <div className='doge-input-group-append'>{append}</div>}
		</div>
	)
}

export default Input;