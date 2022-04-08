import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import Menu from '../components/Menu/menu';
import SubMenu from "../components/Menu/subMenu";
import MenuItem from "../components/Menu/menuItem";

export default {
	title: 'Example/Menu',
	component: Menu,
	parameters: {
		// More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
		layout: 'fullscreen',
	},
	argTypes: {
		mode: {
			options: ['horizontal', 'vertical'],
			description: 'Attributes that control whether the menu component is horizontal or vertical',
			defaultValue: 'horizontal',
			control: {
				type: 'select'
			}
		},
		defaultOpenSubMenus: {
			options: Array,
			defaultValue: [],
			description: 'When mode is vertical, pass in an array, the submenu of the elements in the array with index will be expanded by default',
			control: {
				type: 'switch',
				options: [[null], ['3']]
			}
		},
		defaultIndex: {
			options: String,
			defaultValue: '0',
			description: 'Pass in the index of the item that is active by default, the default value is ‘0’',
			control: {
				type: 'inline-radio',
				options: ['0', '1']
			}
		}
	}
} as ComponentMeta<typeof Menu>;

export const ATryMenu: ComponentStory<typeof Menu> = (args) => (
	<div>
		<Menu {...args}>
			<MenuItem>
				menuItem1
			</MenuItem>
			<MenuItem>
				menuItem2
			</MenuItem>
			<MenuItem disabled>
				disabledItem
			</MenuItem>
			<SubMenu title='subMenu'>
				<MenuItem>
					menuItem3
				</MenuItem>
				<MenuItem>
					menuItem4
				</MenuItem>
			</SubMenu>
		</Menu>
	</div>
)

export const HorizontalMenu: ComponentStory<typeof Menu> = (args) => (
	<div>
		<Menu {...args}>
			<MenuItem>
				menuItem
			</MenuItem>
			<MenuItem disabled>
				disabledItem
			</MenuItem>
			<SubMenu title='subMenu'>
				<MenuItem>
					menuItem
				</MenuItem>
				<MenuItem>
					menuItem
				</MenuItem>
			</SubMenu>
		</Menu>
	</div>
)


