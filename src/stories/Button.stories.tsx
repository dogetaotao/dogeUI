import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import Button from '../components/Button/button';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Example/Button',
	component: Button,
	argTypes: {
		children: {
			defaultValue: 'Button',
			description: "you can change button's children",
			options: String,
			control: {type: 'text'}
		},
		size: {
			description: 'we provide 3 sizes for button',
			defaultValue: 'def',
			options: ['lg', 'sm', 'def'],
			control: {type: 'select'}
		},
		btnType: {
			defaultValue: 'default',
			description: 'we provide 4 types for button',
			options: ['primary', 'default', 'danger', 'link'],
			control: {type: 'select'}
		},
		disabled: {
			defaultValue: false,
			description: 'you can let your button disabled',
			options: [true, false],
			control: {type: 'boolean'}
		},
		href: {
			description: 'when btnType is link, you can set this attribute',
			options: String,
			control: {type: 'text'}
		}
		
	}
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;


export const ATryButton: ComponentStory<typeof Button> = (args) => (
	<Button children='Button' {...args}/>
)
// export const TryButtons = TryButton.bind({})
export const differentSizeOfButtons: ComponentStory<typeof Button> = (args) => (
	<div>
		<Button children='large' size='lg'/>
		<Button children='default' size='def'/>
		<Button children='small' size='sm'/>
	</div>
)

export const differentTypeOfButtons: ComponentStory<typeof Button> = (args) => (
	<div>
		<Button children='default'/>
		<Button children='primary' btnType='primary'/>
		<Button children='danger' btnType='danger'/>
		<Button children='link' btnType='link'/>
	</div>
)

export const disabledButton: ComponentStory<typeof Button> = (args) => (
	<div>
		<Button disabled>disabled</Button>
		<Button disabled btnType='primary'>disabled</Button>
		<Button disabled btnType='danger'>disabled</Button>
		<Button disabled btnType='link'>disabled</Button>
	</div>

)
// More on args: https://storybook.js.org/docs/react/writing-stories/args
