import React from "react";
import {fireEvent, render, screen} from '@testing-library/react'
import Button, {ButtonProps} from "./button";

const defaultProps = {
	onClick: jest.fn()
}

const testProps: ButtonProps = {
	btnType: 'primary',
	size: 'lg',
	className: 'testBtn'
}

const disabledProps: ButtonProps = {
	onClick: jest.fn(),
	btnType: 'primary',
	size: 'lg',
	className: 'testBtn',
	disabled: true
}

describe('test Button Components', () => {
	
	it('should render the correct default button', () =>{
		render(<Button {...defaultProps}>Nice</Button>)
		const element = screen.queryByText('Nice') as HTMLButtonElement
		expect(element).toBeInTheDocument()
		expect(element.disabled).toBeFalsy()
		// @ts-ignore
		expect(element.tagName).toEqual('BUTTON')
		expect(element).toHaveClass('btn btn-default')
		// @ts-ignore
		fireEvent.click(element)
		expect(defaultProps.onClick).toHaveBeenCalled()
	})
	it('should render the correct component based on different props' ,() =>{
		render(<Button {...testProps}>Nice</Button>)
		const element = screen.queryByText('Nice')
		expect(element).toBeInTheDocument()
		expect(element).toHaveClass('btn-primary btn-lg testBtn')
	})
	it('should render a link when btnType equals link and href is provided', () =>{
		render(<Button btnType='link' href='http://www.dogetaotao.fun'>Link</Button>)
		const element = screen.queryByText('Link')
		expect(element).toBeInTheDocument()
		// @ts-ignore
		expect(element.tagName).toEqual('A')
		expect(element).toHaveClass('btn-link btn')
	})
	it('should render disabled button when disabled set to true', () =>{
		render(<Button {...disabledProps}>disabledBtn</Button>)
		const element = screen.queryByText('disabledBtn') as HTMLButtonElement
		expect(element).toBeInTheDocument()
		expect(element.disabled).toBeTruthy()
		fireEvent.click(element)
		expect(disabledProps.onClick).not.toHaveBeenCalled()
	})
})