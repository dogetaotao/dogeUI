import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import Tab from '../components/Tab/tab';
import TabItem from '../components/Tab/tabItem';


export default {
	title: 'Example/Tab',
	component: Tab,
	parameters: {
		// More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
		layout: 'fullscreen',
	},
	argTypes: {
		mode: {
			options: ['horizontal', 'vertical'],
			description: 'Attributes that control whether the tab component is horizontal or vertical',
			defaultValue: 'horizontal',
			control: {
				type: 'radio'
			}
		},
		tabStyle: {
			options: ['card', 'line'],
			defaultValue:'line',
			description:'The tab component provides two styles, but the card will only take effect when the mode is horizontal',
			control: {
				type: 'radio'
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
		},
	}
} as ComponentMeta<typeof Tab>;

export const ATryTab: ComponentStory<typeof Tab> = (args) => (
	<div>
		<Tab {...args}>
			<TabItem>
				tabItem1
			</TabItem>
			<TabItem>
				tabItem2
			</TabItem>
			<TabItem disabled>
				disabled
			</TabItem>
		</Tab>
	</div>
)

export const cardTab: ComponentStory<typeof Tab> = () => (
	<div>
		<Tab tabStyle='card'>
			<TabItem>
				tabItem1
			</TabItem>
			<TabItem>
				tabItem2
			</TabItem>
			<TabItem>
				tabItem3
			</TabItem>
			<TabItem>
				tabItem4
			</TabItem>
			<TabItem disabled>
				disabled
			</TabItem>
		</Tab>
	</div>
)

export const lineTab: ComponentStory<typeof Tab> = () => (
	<div>
		<Tab>
			<TabItem>
				tabItem1
			</TabItem>
			<TabItem>
				tabItem2
			</TabItem>
			<TabItem>
				tabItem3
			</TabItem>
			<TabItem>
				tabItem4
			</TabItem>
			<TabItem disabled>
				disabled
			</TabItem>
		</Tab>
		<Tab mode='vertical'>
			<TabItem>
				tabItem1
			</TabItem>
			<TabItem>
				tabItem2
			</TabItem>
			<TabItem>
				tabItem3
			</TabItem>
			<TabItem>
				tabItem4
			</TabItem>
			<TabItem disabled>
				disabled
			</TabItem>
		</Tab>
	</div>
)

