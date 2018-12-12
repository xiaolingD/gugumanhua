import React, { Component } from 'react';
import '../sass/App.scss';
import { WingBlank ,Grid} from 'antd-mobile';
import axios from 'axios'




class Aweek extends Component {
	constructor(){
        super();
        this.state = {
           
            lis:[],
          
        }
         this.handlerGotoList = this.handlerGotoList.bind(this);
        
    }
	
     componentDidMount() {
     	 axios.get('api/dacu_app/app/?c=MainRank&a=get_label_rank&label=0&get_type=0&start=0&userid=0&home=1&h5_agent=%5B%223.7.0%22%2C10%2C%22iOS%22%2C%2211.0%22%2C%22iPhone%22%2C%22714e59b0af6552770d0204bd9c4d1161%22%2C%22h5_web%22%2C1%2C%22d5c2243db0c4a21031i1i7h162abc25969a50e92%22%5D&ui=0&ui_id=0&_=1543806109816').then(res=>{
			     let li = res.data;
			     this.setState({
				    lis:li.data.data,
							
				});
			//	console.log(this.state.lis);
				})
		

    }
      handlerGotoList(){
        //获取history
        console.log(this.props)
        let {history} = this.props;
        console.log(history);
        history.push( {pathname:'/list'})
    }
    
  render() {
  	
  	
    return (
    	
	      <div className="App">
	      
	 
			<div className="aweek">
			{ console.log(this.state.lis)}
				 <div className="sub-title" onClick={this.handlerGotoList}> 一周人气</div>
	 			<Grid data={this.state.lis} activeStyle="active" hasLine itemStyle={{width:'90px'}} isCarousel carouselMaxRow={1} columnNum={1}
	 			renderItem={(data,index)=>{
					return(
						<div className="aweekitem">
							<img src={data.thumb_3} />
							
							<p>{data.title}</p>
							<span>{data.author}</span>
						</div>
						
					)
				
	 			}} 
	 			
	 			/>
	 			
				</div>
		
	
   
	 </div>
      
    );
  }
}
export {Aweek};
