import React, { Component } from 'react';
import {NavLink,withRouter} from 'react-router-dom'
import '../sass/App.scss';
import { Carousel, WingBlank ,Grid} from 'antd-mobile';
import axios from 'axios';


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel,faUserCircle,faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel,faUserCircle,faSearch)


class Home extends Component {
	constructor(){
        super();
        this.state = {
            data:[],
            lis:[],
            list1:[],
            list2:[],
            list3:[],
           
        }
         this.handlerGotoList = this.handlerGotoList.bind(this);
         this.handlerGotoLis = this.handlerGotoLis.bind(this);
         this.handlerGotoBook = this.handlerGotoBook.bind(this);
         this.handlerGotorecom = this.handlerGotorecom.bind(this);
         this.handlerGotonew = this.handlerGotonew.bind(this);
         this.handlerGotonser = this.handlerGotonser.bind(this);
    }
	
     componentDidMount() {
     	
			axios.get('/api/dacu_app/app/?c=MainRecommend&a=get_main_advertise_h5&type=0&h5_agent=%5B%223.7.0%22%2C10%2C%22iOS%22%2C%2211.0%22%2C%22iPhone%22%2C%22714e59b0af6552770d0204bd9c4d1161%22%2C%22h5_web%22%2C0%2C%22bb8c6753d02b93a731i1i7h060e8fa72252871b1%22%5D&ui=0&ui_id=0&_=1543806109815').then(res=>{
	            let data = res.data;
	            this.setState({
							data:data.data,
							
						});
	           
    		 })
		 
   
			axios.get('api/dacu_app/app/?c=MainRank&a=get_label_rank&label=0&get_type=0&start=0&userid=0&home=1&h5_agent=%5B%223.7.0%22%2C10%2C%22iOS%22%2C%2211.0%22%2C%22iPhone%22%2C%22714e59b0af6552770d0204bd9c4d1161%22%2C%22h5_web%22%2C1%2C%22d5c2243db0c4a21031i1i7h162abc25969a50e92%22%5D&ui=0&ui_id=0&_=1543806109816').then(res=>{
			        let li = res.data;
			        this.setState({
				        lis:li.data.data,
							
					});
			//			console.log(this.state.lis);
			})
	
		  	 axios.get('api/dacu_app/app/?c=MainRecommend&a=get_main_recommend_area&userid=0&type_var=%5B1%2C2%2C3%5D&h5_agent=%5B%223.7.0%22%2C10%2C%22iOS%22%2C%2211.0%22%2C%22iPhone%22%2C%22714e59b0af6552770d0204bd9c4d1161%22%2C%22h5_web%22%2C0%2C%22bb8c6753d02b93a731i1i7h060e8fa72252871b1%22%5D&ui=0&ui_id=0&_=1543806109817').then(res=>{
		            let lists = res.data.data;
		            console.log(lists)
		            this.setState({
							list1:lists[1],
							list2:lists[2],
							list3:lists[3],
					});
		    })
		
    }
    handlerGotoList(){
        let {history} = this.props;
        history.push( {pathname:'/list'})
    }
      
    handlerGotoBook(data){
        //获取history
        let {history} = this.props;
        console.log(history);
        history.push({
            pathname:'/book',
            state:data
        });
        window.localStorage.setItem('book',JSON.stringify(data))
    }
    handlerGotoLis(){
        let {history} = this.props;
        history.push( {pathname:'/choose'})
    }
	 handlerGotorecom(){
        let {history} = this.props;
        history.push( {pathname:'/recommend'})
    }
	  handlerGotonew(){
        let {history} = this.props;
        history.push( {pathname:'/new'})
    }
     handlerGotonser(){
        let {history} = this.props;
        history.push( {pathname:'/search'})
    }
  render() {
  	
  	
    return (
    	
	      <div className="App">
	      
	      <div className="header">
	      		<h2 > <NavLink to="/home">咕咕漫画</ NavLink></h2>
					<div className="right">
					 <FontAwesomeIcon icon="search" onClick={this.handlerGotonser}/>
				    </div>
			</div>
	   		
			<WingBlank>
	        <Carousel
	          autoplay={true}
	          infinite
	         >
	          {this.state.data.map(data => (
	            <a
	              key={data.man_id}
	              href="#"
	              style={{ display: 'inline-block', width: '100%' }}
	            >
	              <img
	                src={data.cover}
	                alt=""
	                 style={{ width: '100%', verticalAlign: 'top' }}
	                onLoad={() => {
	                  // fire window resize event to change height
	                  window.dispatchEvent(new Event('resize'));
	                  this.setState({ imgHeight: 'auto' });
	                }}
	              />
	            </a>
	          ))

	          }
	        </Carousel>
	      </WingBlank>
		
			<div className="aweek">
				 <div className="sub-title" onClick={this.handlerGotoList}> <span>一周人气 </ span> <span>更多</span></div>
	 			<Grid data={this.state.lis} itemStyle={{width:"90px", height:"120px"}}
	 			isCarousel onClick={_el => console.log(_el)}
	 			renderItem={(data,index)=>{
	 				
					return(
						<div className="aweekitem">
							<img src={data.thumb_3} />
							
							<p>{data.title}</p>
							<span>{data.author}</span>
						</div>
						
					)
				
	 			}} 
	 			 onClick={this.handlerGotoBook}
	 			/>
	 			
				</div>
		
		<div className="refined">
    		
    		<h3><span>{this.state.list1.area_title} </span > <span onClick={this.handlerGotoLis} >更多</span> </h3>
     		<Grid data={this.state.list1.area_data}
 			columnNum={2}
 	        renderItem={(data,index)=>{
				return(
					<div className="reitem">
						<img src={data.thumb} />
						<p>{data.title}</p>
						<span>{data.author}</span>
					</div>
				)
			
 			}} 
 			 onClick={this.handlerGotoBook}
 			/>
     </div>
	
		<div className="new">
     		<h3><span>{this.state.list2.area_title} </ span> <span onClick={this.handlerGotorecom}>更多</span> </h3>
			<Grid data={this.state.list2.area_data} columnNum={3}  renderItem={(data,index)=>{
				return(
					<div className="newitem">
					<img src={data.thumb} />
					<p>{data.title}</p>
					<span>{data.author}</span>
					</div>
				)
			
 			}}
			 onClick={this.handlerGotoBook}
			/>

     </div>
     <div className="recomand">
     		<h3><span>{this.state.list3.area_title} </ span> <span onClick={this.handlerGotonew}>更多</span> </h3>
			<Grid data={this.state.list3.area_data} columnNum={3}  renderItem={(data,index)=>{
				return(
					<div className="conitem">
					<img src={data.thumb} />
					<p>{data.title}</p>
					<span>{data.author}</span>
					</div>
				)
			
 			}}
			 onClick={this.handlerGotoBook}
			/>

     </div>
     
	 </div>
      
    );
  }
}
Home = withRouter(Home);
export {Home};
