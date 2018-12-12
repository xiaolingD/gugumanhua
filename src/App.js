import React, { Component } from 'react';
import {Redirect,Route,withRouter,Switch} from 'react-router-dom'

import {Home} from './components/Home';
import {Alist} from './components/Alist';
import {Book} from './components/Book';
import {Chose} from './components/Chose';
import {Recommend} from './components/Recommend';
import {New} from './components/New';
import {Search} from './components/Search';
import {Page} from './components/Page';

import axios from 'axios';
import { TabBar } from 'antd-mobile';


import 'antd-mobile/dist/antd-mobile.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle,faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faUserCircle,faSearch)



axios.defaults.baseURI='http://localhost:4004';



class App extends Component {
	constructor(){
        super();
        this.state = {
           tabs:[
            {
                title:'首页',
                path:'/home',
                
            },
            {
                title:'列表',
                path:'/list',
               
            },
            {
                title:'详情',
                path:'/book',
               
            },
            {
                title:'精选',
                path:'/choose',
               
            },
            {
                title:'推荐',
                path:'/recommend',
               
            },
             {
                title:'刚刚更新',
                path:'/new',
               
            },
            {
                title:'搜索',
                path:'/search',
               
            },
             {
                title:'内容',
                path:'/page',
               
            },
            
           
        ],
        currentTab:0
        }
      
   }
      handlerGotoList(idx,path){
      	  this.setState({
          currentTab:idx
      });
       this.props.history.push(path);
    }
       componentWillMount(){
      //获取hash值
      let hash = window.location.hash.slice(1);//#list

      //找出对应索引值
      let currentTab = 0
      this.state.tabs.some((item,idx)=>{
          currentTab = idx;
          return item.path === hash
      });

      this.setState({
          currentTab
      });

//    console.log('app props:',this.props)
  }
  render() {
  	
  	
    return (
    
	      <div className="App">
	       
	      	<div className="content">
  	      
  	       <Switch>
              <Route path="/list" component={Alist} />
              <Route path="/home" component={Home} />
               <Route path="/book" component={Book} />
                <Route path="/choose" component={Chose} />
                <Route path="/recommend" component={Recommend} />
                 <Route path="/new" component={New} />
                  <Route path="/search" component={Search} />
                  <Route path="/page" component={Page} />
                 
               <Redirect from="/" to="/home" exact/>
           </Switch>
  	 
  	       </div>
  	      
  	        <TabBar
                tintColor="#f00"
                noRenderContent={true}
                hidden={!this.props.tabbarStatus}
                >
  	        {
                    this.state.tabs.map((tab,idx)=>{
                        return <TabBar.Item
                           key={tab.path} selected={this.state.currentTab === idx}
                            onPress={this.handlerGotoList.bind(this,idx,tab.path)}
                            >
                            
                            </TabBar.Item>
                    })
                }
  	         </TabBar>
      </div>
      
    );
  }
}
App = withRouter(App);

export default App;
