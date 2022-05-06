import React, {ChangeEvent} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import AutoComplete, {DataSourceType} from "../components/AutoComplete/autoComplete";


export default {
	title: 'Example/AutoComplete',
	component: AutoComplete,
	parameters: {
		// More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
		layout: 'fullscreen',
	},
	argTypes: {
		fetchSuggestions: {
		
		}
	}
} as ComponentMeta<typeof AutoComplete>;

interface SearchProps {
	value: string
}

const handleFetch = (query: string) => {
	return fetch(`https://api.codelife.cc/api/baidu_sugrec/${query}`)
		.then(res => res.json())
		.then(({data}) => {
			if (data.g) {
				return data.g.slice(0, 8).map((item: any) => ({
					value: item.q, ...item
				}))
			} else {
				return []
			}
		})
}

const renderOption = (item: DataSourceType) => {
	const searchAns = item as DataSourceType<SearchProps>
	return (
		<>
			<p style={{marginBottom: '.2rem'}}>{searchAns.value}</p>
		</>
	)
}

export const ATryAutoComplete: ComponentStory<typeof AutoComplete> = (args) => (
	<div style={{height: '24rem', width: '50%', margin: '4rem auto'}}>
		<AutoComplete {...args}/>
	</div>
)

ATryAutoComplete.args = {
	fetchSuggestions: handleFetch,
	renderOption: renderOption
}