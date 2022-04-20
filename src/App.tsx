import React, {useEffect, useState} from 'react';
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from './components/Menu/subMenu'
import Tab from "./components/Tab/tab";
import TabItem from "./components/Tab/tabItem";
import Icon from "./components/Icon/icon";
import Transition from "./components/Transition/transition";
import Input from "./components/Input/input";
import AutoComplete, {DataSourceType} from "./components/AutoComplete/autoComplete";
import Select from "./components/Select/select";
import Option from "./components/Select/option";
import axios from "axios";


interface GithubUserProps {
	login: string,
	url: string,
	avatar_url: string
}

const App: React.FC = () => {
	const [show, setShow] = useState(false)
	const [title, setTitle] = useState('')
	const postData = {
		title: 'my title',
		body: 'hello man'
	}
	
	useEffect(() => {
		axios.post('http://jsonplaceholder.typicode.com/posts', postData)
			.then(resp => {
				console.log(resp)
				setTitle(resp.data.title)
			})
	})
	
	const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if(files) {
			const uploadedFile = files[0]
			const formData = new FormData()
			formData.append(uploadedFile.name, uploadedFile)
			axios.post('http://jsonplaceholder.typicode.com/posts', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}).then(resp => {
				console.log(resp)
			})
		}
	}
	
	const handleFetch = (query: string) => {
		return fetch(`https://api.github.com/search/users?q=${query}`)
			.then(res => res.json())
			.then(({items}) => {
				return items.slice(0, 10).map((item: any) => ({value: item.login, ...item}))
			})
	}
	const renderOption = (item: DataSourceType) => {
		const itemWithGithub = item as DataSourceType<GithubUserProps>
		return (
			<>
				<p style={{fontWeight: 'bold', marginBottom: '.5rem'}}>Name: {itemWithGithub.value}</p>
				<p style={{marginBottom: '.5rem'}}>url: {itemWithGithub.url}</p>
			</>
		)
	}
	return (
		<div className="App">
			<header className="App-header">
				<h1>{title}</h1>
				<input type="file" name='myFile' onChange={handleFileChange}/>
				
				<div style={{margin: '40px'}}>
					<AutoComplete
						fetchSuggestions={handleFetch}
						onSelect={(e) => {
							console.log(e)
						}}
						renderOption={renderOption}
						transitionType='top'
						icon='search'
						iconLeft
						append={
							<Button>search</Button>
						}
					/>
				</div>
				<Button disabled={true}> Heleo</Button>
				<Button btnType='danger'>danger</Button>
				<Button btnType='link' disabled={true}>danger</Button>
				<Button btnType='primary' size='lg'> Heleo</Button>
				<Button btnType='link' href="http://www.dogetaotao.fun"> Heleo</Button>
				<Button>普通按钮</Button>
				
				<div className="div1">
					<Tab tabStyle='card'>
						<TabItem>
							active
						</TabItem>
						<TabItem disabled>
							disabled
						</TabItem>
						<TabItem>
							normal
						</TabItem>
					</Tab>
				</div>
				
				<Menu defaultOpenSubMenus={['2']}>
					<MenuItem>
						sdfv
					</MenuItem>
					<MenuItem disabled>
						1234
					</MenuItem>
					<SubMenu title='down'>
						<MenuItem>
							1234
						</MenuItem>
						<MenuItem>
							1234
						</MenuItem>
					</SubMenu>
				</Menu>
				
				<Menu defaultOpenSubMenus={['2']}>
					<MenuItem>
						sdfv
					</MenuItem>
					<MenuItem disabled>
						1234
					</MenuItem>
					<SubMenu title='down'>
						<MenuItem>
							1234
						</MenuItem>
						<MenuItem>
							1234
						</MenuItem>
					</SubMenu>
				</Menu>
				<Button size='lg' onClick={() => setShow(!show)}>
					Toggle
				</Button>
				<Transition in={show} timeout={300} animation='zoom-in-top'>
					<div>
						<p>
							Edit <code>src/App.tsx</code> and xxx
						</p>
						<p>
							Edit <code>src/App.tsx</code> and xxx
						</p>
						<p>
							Edit <code>src/App.tsx</code> and xxx
						</p>
						<p>
							Edit <code>src/App.tsx</code> and xxx
						</p>
						<p>
							Edit <code>src/App.tsx</code> and xxx
						</p>
					</div>
				</Transition>
				
				<Select
					onChange={(e) => {
						console.log(e)
					}}
					style={{width: '600px', marginLeft: '300px'}}
					onSelect={() => console.log()} mode='multiple' placeholder='choice' showArrow>
					<Option disabled>选择1</Option>
					<Option>选择2</Option>
					<Option>选择3</Option>
					<Option>选择4</Option>
				</Select>
				
				<Icon icon='arrow-down' theme="primary"/>
				<div style={{padding: '20px'}}>
					<Input defaultValue='' icon='cog' iconLeft placeholder='sd'/>
					<Input defaultValue='' placeholder='sd' size='lg' append={
						<p>.com</p>
					}/>
					<Input status='error' defaultValue='' placeholder='error' size='sm' prepend={
						<p>http://</p>
					}/>
					<Input status='warning' defaultValue='' placeholder='warning' size='sm' prepend={
						<p>http://</p>
					}/>
					<Input defaultValue='' placeholder='请输入搜索内容' append={<Button>搜索</Button>}/>
					<Input defaultValue='' placeholder='请输入搜索内容' size='lg'
					       append={<Button size='lg' btnType='primary'><Icon icon='search'/></Button>}/>
					<Input defaultValue='' placeholder='请输入搜索内容' size='sm'
					       append={<Button size='sm' btnType='danger'>举报</Button>}/>
					<Input defaultValue='' placeholder='请输入搜索内容' append={<Button>搜索</Button>}/>
					<Input placeholder='请输入搜索内容' prepend={<Select
						style={{width: '500px'}}
						// defaultOptionValue='2'
						placeholder='please choice'
						mode='multiple'
						showArrow
					>
						<Option>选项1</Option>
						<Option>选项2</Option>
						<Option>选项3</Option>
						<Option>选项4</Option>
					</Select>}/>
				</div>
			</header>
		</div>
	
	);
}

export default App;
