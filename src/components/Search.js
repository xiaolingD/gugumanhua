import React,{Component} from 'react';
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import '../sass/search.scss'
import axios from 'axios'

class Search extends Component{
	
    render(){
		 return( <div className="search">
			
		      <SearchBar placeholder="请输入漫画名/作者名" ref={ref => this.autoFocusInst = ref} />
		   
		    <p>搜索</p>
		    <div className="hot">
		    <h3>热门搜索</h3>
		    <span>牙斗</span>
		     <span>	LiLy</span>
		      <span>全职高手</span>
		       <span>新梦偶像计划</span>
		        <span>密与行者</span>
		         <span>校花的贴身保镖</span>
		          <span>超西游</span>
		    </div>
        </div>)
    }
}

 
export {Search};