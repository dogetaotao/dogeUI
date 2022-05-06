import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import Select from "../components/Select/select";
import Option from "../components/Select/option";

export default {
	title: 'Example/Select',
	component: Select,
	parameters: {
		// More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
		layout: 'fullscreen',
	},
	argTypes: {
		mode: {
			options: ['tags', 'multiple'],
			description: 'Control the properties of radio or multi-select boxes',
			defaultValue: 'multiple',
			control: {
				type: 'radio'
			}
		},
		size: {
			options: ['lg', 'sm', 'def'],
			description: 'Control Select component size',
			defaultValue: 'def',
			control: {
				type: 'radio'
			}
		},
		defaultOptionValue: {
			options: ['0', '1', '2', '3'],
			description: 'Choose which option is selected by default',
			defaultValue: '-1',
			control: {
				type: 'select'
			}
		},
		placeholder: {
			options: String,
			description: 'Choose which option is selected by default',
			defaultValue: 'please choose',
			control: {
				type: 'text'
			}
		},
		showArrow: {
			options: Boolean,
			description: 'Choose which option is selected by default',
			defaultValue: true,
			control: {
				type: 'boolean'
			}
		},
		transitionType: {
			options: ['top', 'bottom', 'left', 'right'],
			description: 'Control dropdown menu expand animation',
			defaultValue: 'left',
			control: {
				type: 'select'
			}
		},
		defaultOpen: {
			option: Boolean,
			description: 'Controls whether the drop-down list is automatically expanded',
			defaultValue: false
		},
		onSelect: {
			option: Function,
			description: 'You can pass in a function that will act as a callback function that fires when options is checked, The default parameter of this function is the children of the current option',
		},
		onChange: {
			option: Function,
			description: 'The callback function that occurs when the option changes, passing in an object whose default parameter is the new selection',
		}
	}
} as ComponentMeta<typeof Select>;

export const ATrySelect: ComponentStory<typeof Select> = (args) => (
	<div style={{height: '24rem'}}>
		<Select style={{width: '50%', margin: '4rem auto'}} {...args}>
			<Option>
				option1
			</Option>
			<Option>
				option2
			</Option>
			<Option>
				option3
			</Option>
			<Option>
				option4
			</Option>
			<Option disabled>
				disabled
			</Option>
		</Select>
	</div>
)

export const differentSizeOfSelect:ComponentStory<typeof Select> = () => (
	<div style={{height: '32rem'}}>
		<Select showArrow placeholder='please choose' size='sm' style={{width: '50%', margin: '4rem auto'}}>
			<Option>
				option1
			</Option>
			<Option>
				option2
			</Option>
			<Option>
				option3
			</Option>
			<Option>
				option4
			</Option>
		</Select>
		<Select showArrow placeholder='please choose' style={{width: '50%', margin: '4rem auto'}}>
			<Option>
				option1
			</Option>
			<Option>
				option2
			</Option>
			<Option>
				option3
			</Option>
			<Option>
				option4
			</Option>
		</Select>
		<Select showArrow placeholder='please choose' size='lg' style={{width: '50%', margin: '4rem auto'}}>
			<Option>
				option1
			</Option>
			<Option>
				option2
			</Option>
			<Option>
				option3
			</Option>
			<Option>
				option4
			</Option>
		</Select>
	</div>
)


export const differentTypeOfSelect:ComponentStory<typeof Select> = () => (
	<div style={{height: '20rem'}}>
		<Select showArrow placeholder='please choose' mode='multiple' style={{width: '50%', margin: '4rem auto'}}>
			<Option>
				option1
			</Option>
			<Option>
				option2
			</Option>
			<Option>
				option3
			</Option>
			<Option>
				option4
			</Option>
		</Select>
		<Select showArrow placeholder='please choose' mode='tags' style={{width: '50%', margin: '4rem auto'}}>
			<Option>
				option1
			</Option>
			<Option>
				option2
			</Option>
			<Option>
				option3
			</Option>
			<Option>
				option4
			</Option>
		</Select>
	</div>
)

export const SetDefaultOption:ComponentStory<typeof Select> = () => (
	<div style={{height: '20rem'}}>
		<Select defaultOptionValue='0' showArrow placeholder='please choose' mode='multiple' style={{width: '50%', margin: '4rem auto'}}>
			<Option>
				option1
			</Option>
			<Option>
				option2
			</Option>
			<Option>
				option3
			</Option>
			<Option>
				option4
			</Option>
		</Select>
		<Select defaultOptionValue='0' showArrow placeholder='please choose' mode='tags' style={{width: '50%', margin: '4rem auto'}}>
			<Option>
				option1
			</Option>
			<Option>
				option2
			</Option>
			<Option>
				option3
			</Option>
			<Option>
				option4
			</Option>
		</Select>
	</div>
)