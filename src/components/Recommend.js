import React,{Component} from 'react';
import axios from 'axios'
import { List } from 'antd-mobile';
import {Route,Switch,withRouter,NavLink} from 'react-router-dom';
import { Book } from './Book';
import '../sass/choose.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel,faStar,faChevronLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel,faStar,faChevronLeft)

const Item = List.Item;


class Recommend extends Component{
	constructor(){
        super();
        this.state = {
            chose:[],
          
        }
         this.handlerGotoDetails = this.handlerGotoDetails.bind(this);
       }
      componentDidMount() {
	  	 axios.get('/api/dacu_app/app/?c=MainRecommend&a=get_main_recommend_list&userid=0&type=2&start=0&h5_agent=%5B%223.7.0%22%2C10%2C%22iOS%22%2C%2211.0%22%2C%22iPhone%22%2C%22714e59b0af6552770d0204bd9c4d1161%22%2C%22h5_web%22%2C2%2C%2227bbea61d34a0c6731i1i7h293e69a278187396f%22%5D&ui=0&ui_id=0&_=1544192036691').then(res=>{
            console.log(res)
            let data = res.data.data;
            console.log(data)
            this.setState({
				chose:data.area_data
				
			})
            console.log(this.state.chose)
//         
     })
    }
	 handlerGotoDetails(goods){
        //获取history
        let {history} = this.props;
        console.log(history);
        history.push({
            pathname:'/book',
            state:goods
        });
    }
   render(){
        return (<div className="list">
        	<div className="content">
                <Switch>
                    <Route path="/book" component={Book} />
                    
                </Switch>
            </div>
          <NavLink to='/home'> <FontAwesomeIcon icon="chevron-left" /> </NavLink>
        	<List  renderHeader={() => '新作推荐'} >
        	
                 {
                    this.state.chose.map(goods=>{
                        return <Item
                        thumb={goods.thumb}
                       className="books"
                       onClick={this.handlerGotoDetails.bind(this,goods)}
                        key={goods.bookid}
                        activeStyle={{width:"125px"}}
                        >
                        
                        <h4>{goods.title}</h4>
                        <p className="author">{goods.author}</p>
                        <FontAwesomeIcon icon="star" />
                        <FontAwesomeIcon icon="star" />
                        <FontAwesomeIcon icon="star" />
                        <FontAwesomeIcon icon="star" />
                        <p className="descrip"><span>{goods.description}</span></p>
                        </Item>
                    })
                }
                
            
            </List>
         
        </div>)
    }
}
Recommend = withRouter(Recommend);

export {Recommend};