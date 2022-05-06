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
				type: 'radio'
			}
		},
		defaultOpenSubMenus: {
			options: Array,
			defaultValue: [],
			description: 'When mode is vertical, pass in an array, the submenu of the elements in the array with index will be expanded by default',
			control: {
				type: 'radio',
				options: [['null'], ['3']]
			}
		},
		defaultIndex: {
			options: String,
			defaultValue: '0',
			description: 'Pass in the index of the item that is active by default, the default value is ‘0’',
			control: {
				type: 'radio',
				options: ['0', '1']
			}
		},
		onSelect: {
			option: Function,
			description: 'You can pass in a function that will act as a callback function that fires when options is checked, The default parameter of this function is the index value of the current option',
		}
	}
} as ComponentMeta<typeof Menu>;

export const ATryMenu: ComponentStory<typeof Menu> = (args) => (
	<div>
		<Menu {...args} onSelect={(e) => {
			console.log(e)
		}}>
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

export const HorizontalMenu: ComponentStory<typeof Menu> = () => (
	<div>
		<Menu>
			<MenuItem>
				menuItem1
			</MenuItem>
			<MenuItem>
				menuItem2
			</MenuItem>
			<MenuItem>
				menuItem3
			</MenuItem>
			<MenuItem disabled>
				disabledItem
			</MenuItem>
			<SubMenu title='subMenu'>
				<MenuItem>
					menuItem4
				</MenuItem>
				<MenuItem>
					menuItem5
				</MenuItem>
			</SubMenu>
		</Menu>
	</div>
)

export const VerticalMenu: ComponentStory<typeof Menu> = () => (
	<div style={{width: '20rem'}}>
		<Menu mode='vertical'>
			<MenuItem>
				menuItem
			</MenuItem>
			<MenuItem>
				menuItem2
			</MenuItem>
			<MenuItem>
				menuItem3
			</MenuItem>
			<MenuItem disabled>
				disabledItem
			</MenuItem>
			<SubMenu title='subMenu'>
				<MenuItem>
					menuItem4
				</MenuItem>
				<MenuItem>
					menuItem5
				</MenuItem>
			</SubMenu>
		</Menu>
	</div>
)

export const DifferentSubMenu: ComponentStory<typeof Menu> = () => (
	<div>
		<Menu mode='vertical' defaultIndex='-1'>
			<SubMenu title='verticalLeft' transitionType='left'>
				<MenuItem>
					menuItem
				</MenuItem>
				<MenuItem>
					menuItem
				</MenuItem>
			</SubMenu>
			
			<SubMenu title='verticalTop' transitionType='top'>
				<MenuItem>
					menuItem
				</MenuItem>
				<MenuItem>
					menuItem
				</MenuItem>
			</SubMenu>
			
			<SubMenu title='verticalRight' transitionType='right'>
				<MenuItem>
					menuItem
				</MenuItem>
				<MenuItem>
					menuItem
				</MenuItem>
			</SubMenu>
			
			<SubMenu title='verticalBottom' transitionType='bottom'>
				<MenuItem>
					menuItem
				</MenuItem>
				<MenuItem>
					menuItem
				</MenuItem>
			</SubMenu>
		</Menu>
		<Menu defaultIndex='-1'>
			<SubMenu title='horizontalLeft' transitionType='left'>
				<MenuItem>
					menuItem
				</MenuItem>
				<MenuItem>
					menuItem
				</MenuItem>
			</SubMenu>
			
			<SubMenu title='horizontalTop' transitionType='top'>
				<MenuItem>
					menuItem
				</MenuItem>
				<MenuItem>
					menuItem
				</MenuItem>
			</SubMenu>
			
			<SubMenu title='horizontalRight' transitionType='right'>
				<MenuItem>
					menuItem
				</MenuItem>
				<MenuItem>
					menuItem
				</MenuItem>
			</SubMenu>
			
			<SubMenu title='horizontalBottom' transitionType='bottom'>
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




