import React,{Component} from 'react';

import {withRouter,Route,Switch} from 'react-router-dom';

import '../sass/Book.scss';

import {Page} from './Page';
import {Tabs, WhiteSpace ,Button,Grid,List } from 'antd-mobile';
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel,faUserCircle,faSearch ,faCommentAlt,faThumbsUp} from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel,faUserCircle,faSearch,faCommentAlt,faThumbsUp)
const Item = List.Item;
const Brief = Item.Brief;
class Book extends Component{
	constructor(){
		super();
		 this.state = {
           data:{

           },
           chap:[],
           view:[],
            
        }
		   this.goToPage = this.goToPage.bind(this);
	}
	  componentDidMount() {
     	
			axios.get('/api/dacu_app/app/?c=BookDetail&a=get_chapter_list240&id=19&userid=0&sign=0&view_type=0&h5_agent=%5B%223.7.0%22%2C10%2C%22iOS%22%2C%2211.0%22%2C%22iPhone%22%2C%22714e59b0af6552770d0204bd9c4d1161%22%2C%22h5_web%22%2C1%2C%22d5c2243db0c4a21031i1i7h162abc25969a50e92%22%5D&ui=0&ui_id=0&_=1544148906574').then(res=>{
//	           console.log(res);
	           let chapter=res.data.data;
//	           console.log(chapter);
	            this.setState({
					chap:chapter.data
				});
//	            console.log(this.state.chap);
    		})
			axios.get('/api/dacu_app/app/?c=Comment&a=get_comment_simple_h5&userid=0&bid=19&h5_agent=%5B%223.7.0%22%2C10%2C%22iOS%22%2C%2211.0%22%2C%22iPhone%22%2C%22714e59b0af6552770d0204bd9c4d1161%22%2C%22h5_web%22%2C1%2C%22d5c2243db0c4a21031i1i7h162abc25969a50e92%22%5D&ui=0&ui_id=0&_=15441489').then(res=>{
//			       console.log(res);
			       let review=res.data.data;
//			        console.log(review);
			        this.setState({
				       view:review.comment_data
							
					});
					
//						console.log(this.state.view);
			})
    }
	componentWillMount(){
//			{console.log(this.props.location.state)}
//			console.log(JSON.parse(window.localStorage.getItem('book')))
		 let {state:data} = this.props.location;
        if(data){
        	localStorage.setItem('data',JSON.stringify(data));
        }
        else{
        	data = JSON.parse(localStorage.getItem('data'));
        }
         this.setState({
            data
        });

	}
	goToPage(){
		let {history} = this.props;
        history.push( {pathname:'/page'})
	}
    render(){
       let {data}= this.state
		const tabs = [
		  { title: '章节', sub: '1' },
		  { title: '评论', sub: '2' },
		];
		
        return <div className="book">
        		<div className="content">
	      			 <Switch>
			            <Route path="/page" component={Page} />
			           
			          </Switch>
               </div>
			  <div className="head"> 
			  <p> {data.title}</p>
			  <div className="icon">
					
					 <FontAwesomeIcon icon="search" className="search"/>
				    </div>
			  </div>
           	 	<img src={data.thumb}/>
           	 	<div className="explain">
	            	<h4>{data.title}</h4>
	         		 <p className="author">{data.author}</p>
	          		 <p className="descrip"><span>{data.description}</span></p>
	          		 <Button  type="warning" onClick={this.goToPage}>开始阅读</Button>
				</div>
				
			    <div>
			    <WhiteSpace />
					<div style={{ height: 400 }}>
				      <Tabs tabs={tabs}
				    
				      >
					     <div >
					        <Grid data={this.state.chap} activeStyle={false} renderItem={(data,index)=>{
					         	return(
					         	  <p>{data.name}</p>
					         	)
					          }}
					        />
					        
					    </div>
					    <div >
					        <List renderHeader={() => '最新评论'} className="my-list">
					        
					        	{
					        		this.state.view.map(views=>{
					        	 	return <Item
					        	 	        multipleLine
										     platform="android"
										      key={views.id}
										     >
					        	 			
					        	 			{views.username}
										   <Brief>{views.content}</Brief>
										   <div className="viewfoot">
										   <span>来自      {views.from} </span>
										    <span>   <FontAwesomeIcon icon="comment-alt" /> 
										    {views.reply_count}</span>
										     <span><FontAwesomeIcon icon="thumbs-up" /> {views.support} </span>
										   </div>
								      </Item>
							      
					        	 })
					      
							 }
							    
						      </List>
						       <Button  type="ghost" className="more">查看更多</Button>
					        </div>
				      </Tabs>
    </div>
			    <WhiteSpace />
			  </div>
        </div>
    }
}

  
Book=withRouter(Book)
export {Book};