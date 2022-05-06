import React, {ChangeEvent} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import Input from "../components/Input/input";
import Button from "../components/Button/button"
import Select from "../components/Select/select";
import Option from "../components/Select/option";
import Icon from "../components/Icon/icon";


export default {
	title: 'Example/Input',
	component: Input,
	parameters: {
		// More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
		layout: 'fullscreen',
	},
	argTypes: {
		size: {
			options: ['lg', 'sm', 'def'],
			description: 'Control the size of the Input component',
			control: {
				type: 'radio'
			}
		},
		
		inputType: {
			options: ['password', 'search', 'text'],
			description: 'Control input box type',
			control: {
				type: 'radio'
			}
		},
		
		icon: {
			option: Icon,
			defaultValue: 'null',
			description: 'Controls whether to show the icon',
			control: {
				options: ['search', 'eye', 'film', null],
				type: 'select'
			}
		},
		
		iconLeft: {
			option: Boolean,
			description: 'The position of the control icon inside the Input',
			control: {
				type: 'boolean'
			}
		},
		
		status: {
			options: ['error', 'warning', null],
			description: 'Control the state of the input box',
			control: {
				type: 'radio'
			}
		},
		
		placeholder: {
			option: String,
			description: 'Control the placeholder of the Input component',
			control: {
				type: 'text'
			}
		},
		
		disabled: {
			option: Boolean,
			description: 'Control whether the input box can be used',
			defaultValue: false,
			control: {
				type: 'boolean'
			}
		},
		prepend: {
			options: [],
			description: 'The content displayed in front of the input box, if you want to display some fixed content, please use the span tag'
		},
		
		append: {
			options: [],
			description: 'The content displayed in the last of the input box, if you want to display some fixed content, please use the span tag'
		},
		
		onChange: {
			option: Function,
			description: 'The callback function called when the content of the Input input box changes',
			
		}
	}
} as ComponentMeta<typeof Input>;


export const ATryInput: ComponentStory<typeof Input> = (args) => (
	<div style={{height: '24rem'}}>
		<Input style={{margin: '4rem auto', width: '50%'}} {...args}/>
	</div>
)

export const DifferentSizeOfInput: ComponentStory<typeof Input> = () => (
	<div style={{height: '24rem'}}>
		<Input style={{margin: '4rem auto', width: '50%'}} size='sm' placeholder='please input'/>
		<Input style={{margin: '4rem auto', width: '50%'}} placeholder='please input'/>
		<Input style={{margin: '4rem auto', width: '50%'}} size='lg' placeholder='please input'/>
	</div>
)

export const DifferentStatusOfInput: ComponentStory<typeof Input> = () => (
	<div style={{height: '24rem'}}>
		<Input style={{margin: '4rem auto', width: '50%'}} placeholder='please input'/>
		<Input style={{margin: '4rem auto', width: '50%'}} status='error' placeholder='please input'/>
		<Input style={{margin: '4rem auto', width: '50%'}} status='warning' placeholder='please input'/>
	</div>
)

export const TheUseOfPrependAndAppend: ComponentStory<typeof Input> = () => (
	<div style={{height: '24rem'}}>
		<Input style={{margin: '4rem auto', width: '50%'}} placeholder='please input' prepend={
			<span style={{padding: '0 .5rem'}}>http://</span>
		} append={
			<span style={{padding: '0 .5rem'}}>.com</span>
		}/>
		<Input style={{margin: '4rem auto', width: '50%'}} placeholder='please input' prepend={
			<Select defaultOptionValue='0' showArrow>
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
		}/>
		<Input style={{margin: '4rem auto', width: '50%'}} placeholder='please input' append={
			<Button style={{marginRight: '0'}}>
				Search
			</Button>
		}/>
		<Input style={{margin: '4rem auto', width: '50%'}} placeholder='please input' append={
			<Button btnType='primary' style={{marginRight: '0'}}>
				<Icon icon='search'/>
			</Button>
		}/>
	</div>
)

export const TheUseOfOnChange: ComponentStory<typeof Input> = () => (
	<div style={{height: '10rem'}}>
		<Input style={{margin: '4rem auto', width: '50%'}} placeholder='please input' onChange={(e) => {
			alert(e.target.value)
		}}/>
	</div>
)
