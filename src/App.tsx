import React, {useState} from 'react';
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from './components/Menu/subMenu'
import Tab from "./components/Tab/tab";
import TabItem from "./components/Tab/tabItem";
import Icon from "./components/Icon/icon";
import Transition from "./components/Transition/transition";


const App: React.FC = () => {
  const [show, setShow] = useState(false)
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>hello WOrld</h1>
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
        <Icon icon='arrow-down' theme="primary"/>
      </header>
    </div>
  );
}

export default App;
