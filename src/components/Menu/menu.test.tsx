import React from "react";
import {render, screen, fireEvent, cleanup ,RenderResult, waitFor} from "@testing-library/react";
import Menu, {MenuProps} from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const testProps: MenuProps = {
	defaultIndex: '0',
	onSelect: jest.fn(),
	className: 'test'
}

const testVerProps: MenuProps = {
	defaultIndex: '0',
	mode: 'vertical'
}
const TestMenu = (props: MenuProps) => {
	return (
		<Menu {...props}>
			<MenuItem>
				active
			</MenuItem>
			<MenuItem disabled>
				disabled
			</MenuItem>
			<MenuItem>
				normal
			</MenuItem>
			<SubMenu title='submenu'>
				<MenuItem>
					4-1node
				</MenuItem>
			</SubMenu>
		</Menu>
	)
}
const createStyleFile = () => {
	const cssFile:string = `
		.doge-submenu {
			display: none
		}
		
		.doge-submenu.menu-opened {
			display: block
		}
	`
	const style = document.createElement('style')
	style.innerHTML = cssFile
	return style
}

let wrapper:RenderResult, menuElement:HTMLElement, activeElement:HTMLElement, disabledElement:HTMLElement
describe('test menu and MenuItem component', () => {
	beforeEach(() => {
		// eslint-disable-next-line testing-library/no-render-in-setup
		wrapper = render(TestMenu(testProps))
		wrapper.container.append(createStyleFile())
		menuElement = screen.getByTestId('test-menu')
		activeElement = screen.getByText('active')
		disabledElement = screen.getByText('disabled')
	})
	it('should render correct Menu and MenuItem based on default props', () => {
		expect(menuElement).toBeInTheDocument()
		expect(menuElement).toHaveClass('doge-menu test')
		// eslint-disable-next-line testing-library/no-node-access
		expect(menuElement.querySelectorAll(':scope >li').length).toEqual(4)
		expect(disabledElement).toHaveClass('menu-item is-disabled')
		expect(activeElement).toHaveClass('menu-item is-active')
	})
	it('click items should change active and call the right callback', () => {
		const thirdItem = screen.getByText('normal')
		fireEvent.click(thirdItem)
		expect(thirdItem).toHaveClass('is-active')
		expect(activeElement).not.toHaveClass('is-active')
		expect(testProps.onSelect).toHaveBeenCalledWith('2')
		fireEvent.click(disabledElement)
		expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
		expect(disabledElement).not.toHaveClass('is-active')
	})
	it('should render vertical mode when mode is set to vertical', () => {
		cleanup()
		render(TestMenu(testVerProps))
		const menuElement = screen.getByTestId('test-menu')
		expect(menuElement).toHaveClass('menu-vertical')
	})
	it('should show dropdown items when hover on subMenu', async () => {
		expect(screen.queryByText('4-1node')).not.toBeVisible()
		const dropdownElement = screen.getByText('submenu')
		fireEvent.mouseEnter(dropdownElement)
		await waitFor(() => {
			expect(screen.queryByText('4-1node')).toBeVisible()
		})
		fireEvent.click(screen.getByText('4-1node'))
		expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
		fireEvent.mouseLeave(dropdownElement)
		await waitFor(() => {
			expect(screen.queryByText('4-1node')).not.toBeVisible()
		})
		
		
	})
})
