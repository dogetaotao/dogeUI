import React from "react";
import classname from 'classnames'

export type ButtonSize = 'lg' | 'sm' | 'def'


export type ButtonType = 'primary' | 'default' | 'danger' | 'link'


interface BaseButtonProps {
	className?: string,
	disabled?: boolean,
	size?: ButtonSize,
	btnType?: ButtonType,
	children?: React.ReactNode,
	href?: string
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
	const {
		btnType,
		className,
		disabled,
		size,
		children,
		href,
		...restProps
	} = props
	
	const classes = classname('btn', className, {
		[`btn-${btnType}`]: btnType,
		[`btn-${size}`]: size,
		'disabled': (btnType === 'link') && disabled
	})
	if (btnType === 'link' && href) {
		return (
			<a href={href} className={classes} {...restProps}>
				{children}
			</a>
		)
	} else {
		return (
			<button className={classes} disabled={disabled} {...restProps}>{children}</button>
		)
	}
}

Button.defaultProps = {
	disabled: false,
	btnType: 'default'
}
export default Button