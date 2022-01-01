import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import './ExplorePage.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar, CardHeader, IconButton } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import PhotoIcon from '@material-ui/icons/Photo';
import ForumIcon from '@material-ui/icons/Forum';
import {Grid} from "@material-ui/core"
import { useSelector } from 'react-redux';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useMediaQuery} from "@material-ui/core";
import { Divider } from '@material-ui/core';
import ExploreItem from './ExploreItem';
import TrendingItem from './TrendingItem';
import TrendingItem2 from './TrendingItem2';
import TrendingItem3 from './TrendingItem3';
import { 
    createSlice, 
    createAsyncThunk, 
    createEntityAdapter
} from "@reduxjs/toolkit";



import API from '../../fakeAPI'
function ExplorePage(props){
    

    
       
  ///// sTATE VARIABLE FOR tAB SELECTION //////////////////////////  
const[Tabb,SetTabb]=useState(1); // state variable to set the tab

const rerender = useSelector(state => state.users.toggle); //when a new comment is added, rerender
/////////////////////// STATE VARIABLE FOR EXPLORE ///////////////////////////////////////////////////////////
const links2 = [
    {idd:1,  url:"https://wallpapercave.com/fwp/wp5981208.jpg" ,w:420 ,h:200  ,commentC:50 , favC:400}    ,
    {idd:2  ,url:"https://wallpapercave.com/fwp/wp5716268.jpg" ,w:10,h:300   , commentC:30 , favC:600   },
    {idd:3 ,url:"https://wallpapercave.com/uwp/uwp978614.jpeg",w:420 ,h:200,commentC:10,favC:200},
    {idd:4  , url:"https://wallpapercave.com/uwp/uwp404136.jpeg",w:190 ,h:150,commentC:500,favC:100},
    {idd:5, url:"https://wallpapercave.com/wp/wp170202.jpg" ,w:150  ,h:300 ,commentC:290,favC:20 },
    {idd:6, url:"https://wallpapercave.com/wp/wp4202055.jpg"  ,w:130 ,h:200,commentC:800,favC:80  },
    {idd:7 , url:"https://wallpapercave.com/wp/FMSk24L.jpg" ,w:300 ,h:200 ,commentC:700,favC:90 },
    {idd:8, url:"https://wallpapercave.com/wp/9T3NTEL.jpg"   ,w:210,h:250,commentC:90, favC:55 },
    {idd:9, url:"https://wallpapercave.com/wp/wp4203600.jpg"  ,w:180,h:200  ,commentC:180,favC:60  },
    {idd:10, url:"https://wallpapercave.com/wp/wp4079759.jpg"  ,w:90 ,h:200 ,commentC:290,favC:600   },
    {idd:11, url:"https://wallpapercave.com/wp/wp2586072.jpg"   ,w:170 ,h:300,commentC:80,favC:40   },
    {idd:12, url:"https://wallpapercave.com/wp/wp2882301.jpg"  ,w:90  ,h:200,commentC:900,favC:600}];



/////////////////////// intialzing state variables of explore images ///////////////////////////////
    const[Images2,setImages2]=useState([]);  
    
//////////////// state variable reprsenting trending now ///////////////////////////////////////////
      const tn=[{iddd:1,srcc:"https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60", titlee:"Japan" ,hei:200,wid:200},
      { iddd:2,srcc:"https://wallpapercave.com/wp/wp2952992.jpg", titlee:"Germany",hei:200,wid:200},
      {iddd:3 , srcc:"https://www2.pictorem.com/collection/900_fabartdesigns_sunset,%20dawn,%20nature,%20mountains,%20landscape,%20ka%C3%A7kars,%20grassland,%20cloud,%20highland,%20outdoor,%20summer,%20sky,%20beautiful,%20stunning,%20wallpaper,.jpg", titlee:"Outdoors",hei:200,wid:200},
      {iddd:4, srcc:"https://wallpapercave.com/wp/7wIhmgY.jpg" , titlee:"Black forest" ,hei:200,wid:200                     }
   ,{iddd:5,srcc:"https://p4.wallpaperbetter.com/wallpaper/1013/76/901/birds-waxwing-bird-wallpaper-preview.jpg", titlee:"Sigma",hei:200,wid:200}
    
    
    ]

        
/////////////////////  state variable representing trending this week ///////////////////
    const tw=[{iddd2:1,srcc2:"https://i.pinimg.com/originals/4a/38/de/4a38de34649636200219081fd9dfdb42.jpg", titlee2:"Outside" ,hei2:200,wid2:650},
    { iddd2:2,srcc2:"https://i.pinimg.com/originals/5b/8c/85/5b8c85f1d33f821692e2b9be2ac2b86d.jpg", titlee2:"music",hei2:200,wid2:650},
    {iddd2:3 , srcc2:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwZhRqu-mHFPTZC2U5YfCDe5PZv1l6Pq9MsQ&usqp=CAU", titlee2:"nikkor",hei2:200,wid2:650},
    {iddd2:4, srcc2:"https://p0.pikist.com/photos/340/875/beads-nawleka%C4%87-balls-letters-fun-colorful-the-background-the-structure-of-the-invoice.jpg" , titlee2:"Vowel" ,hei2:200,wid2:650 }
  ]
  
 
// state variables representing trending at all time////////////////////////////////////////////////////////////
const twat=  [ {iddd3:1,  srcc3:"https://i.pinimg.com/736x/ed/5d/03/ed5d03fc057df0f78f373753b03dd981.jpg" ,titlee3:"Sunset",wid3:200 ,hei3:200  },
{iddd3:2  ,srcc3:"https://wallpaperaccess.com/full/1089778.jpg",titlee3:"Beach" ,wid3:200,hei3:200     },
{iddd3:3 ,srcc3:"https://wallpaperaccess.com/full/223672.jpg",titlee3:"Water",wid3:200 ,hei3:200},
{iddd3:4  , srcc3:"https://i.pinimg.com/originals/3e/d1/77/3ed177ee9f8a536fd0f36941550ed683.jpg",titlee3:"Sky",wid3:200 ,hei3:200},
{iddd3:5, srcc3:"https://wallpaperaccess.com/full/1178419.jpg" ,titlee3:"Flower",wid3:200  ,hei3:200  },
{iddd3:6, srcc3:"https://wallpaperaccess.com/full/1124086.jpg",titlee3:"Snow"  ,wid3:200 ,hei3:200 },
{iddd3:7 , srcc3:"https://wallpaperaccess.com/full/384178.jpg" ,titlee3:"Dogs",wid3:200 ,hei3:200 },
{iddd3:8, srcc3:"https://i.pinimg.com/originals/8a/74/6d/8a746d8eb265ab3ef533fa491e93f8b4.jpg",titlee3:"City"   ,wid3:200,hei3:200},
{iddd3:9, srcc3:"https://wallpaperaccess.com/full/4507217.jpg",titlee3:"Christmas"  ,wid3:200,hei3:200},
{iddd3:10, srcc3:"https://wallpaperaccess.com/full/32048.jpg",titlee3:"Cats"  ,wid3:200 ,hei3:200  },
{iddd3:11, srcc3:"https://wallpapercave.com/wp/wp6286493.jpg" ,titlee3:"birds"  ,wid3:200 ,hei3:200 },
{iddd3:12, srcc3:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOYnQiDy3veSV8ixhnFTxBKzyvlplAPEsA3w&usqp=CAU",titlee3:"Cars"  ,wid3:200 ,hei3:200}];


    //////////////////  setting state variables of trending ///////////////////////////////////
    const[TrendingNows,SetTrendingNow]=useState(tn);  
    const[TrendingWeeks,SetTrendingWeek]=useState(tw);    
    const[TrendingATs,SetTrendingAT]=useState(twat);  



   // const dispatch = useDispatch();
    const history = useHistory();


    const postId = props.match.params.id;



/////  user selector variables  /////////////////////////////////////////////////////////////////////////////////////

const token = useSelector(state => state.users.currentUser.token);
const userId = useSelector(state => state.users.currentUser.userId);


//////////////////
/*
API.get(`photo/explore`) .then(res => {
  console.log("search res");
  console.log('akaaaa')

  //console.log(res)
  console.log(res.data.data)
  
  console.log(res.data.data.photos[0].commentCount)
  console.log(res.data.data.photos[0].photo.favourites)
console.log(res.data.data.photos[0].photo.sizes.size.original.source)
console.log(res.data.data.photos[0].photo.sizes.size.original.height)
console.log(res.data.data.photos[0].photo.sizes.size.original.width)
console.log(res.data.data.photos[0].photo._id)

setImages2(res.data.data.photos)

console.log(Images2[0].photo.favourites)

}).catch(err => {
  console.log(err.response)
    console.log(token)
    setImages2([])
})

  */ 
API.get(`user/${userId}/recent`)
.then(res => {
    console.log("RECENT");
    console.log(res);
    console.log(res.data.status);
    if (res.data.status === 'success') {
        console.log(res.data.data.photos.photos[4].favourites);
       // setPostsFeed(res.data.data.photos.photos);
       console.log(res.data.data.photos.photos[0].sizes.size.large.source)
       console.log(res.data.data.photos.photos[0]._id)
       setImages2(res.data.data.photos.photos)
    }
}).catch(err => {
    console.log(err.response);
    setImages2([])
})
 

/*
API.get(`photo/${postId}/comments/recent`)
.then(res => {
    console.log("RECENT");
    console.log(res);
    console.log(res.data.status);
    if (res.data.status === 'success') {
        console.log(res);
       // setPostsFeed(res.data.data.photos.photos);
      // console.log(res.data.data.photos.photos[0].sizes.size.large.source)
      // console.log(res.data.data.photos.photos[0]._id)
       //setImages2(res.data.data.photos.photos)
    }
}).catch(err => {
    console.log(err.response);
    //setImages2([])
})
 

*/








////////////////  THE FUNCTION CHECKS FOR THE TAB SELECTED
///  using state variable and setting it when the tab is selected represned by button
// if the tab selection is 1 then its explore and it maps the state variable of the images array
//// it maps the image array using the API request for getting height,width , favourite count, comment counts and url
// it uses the explore component and send to it the variable we got from the API request
/// if the tab selection is 2 then its the trending and it maps 3 state variables of 3 image arrays after each other
/// one representing trending now , trending this week , and trending all time
/// it send the state variable array elements needed to 3 components(trending item, trending item2, trending item3) 
// representing trending now , trending this week , and trending all time respectively
return(
    <div className="EXPPAGE">
    <div  className="TabsCC">
    <div className="buttonspace2"></div>
<button  className={Tabb === 1 ? "selected_tabb1" : "tabb1"} //Ternary operator to see if Tab is selected or not and Change its cLassName depending on its state(if its =1)
onClick={() => SetTabb(1)  } //Changing the state of tab to be 1 (for tab1) on click to be selected 
>
Explore
 </button>


<button //Button representing First Tab 

className={Tabb === 2 ? "selected_tabb2" : "tabb2"} //Ternary operator to see if Tab is selected or not and Change its cLassName depending on its state(if its =1)
onClick={() => SetTabb(2)  } //Changing the state of tab to be 1 (for tab1) on click to be selected 
>
Trending
 </button>
 </div>






 <div className="tc"></div>

{Tabb===1 ?
(
<div className="textspace">

 
<text    className="exptext">   
    Explore
</text>
</div>):(null)}
<div className="expspace"></div>
<div className="m" style={{paddingLeft:'9%'}}>
<Grid container spacing={2}  >
    
{(Tabb===1  && Images2) ? 

Images2.map( (Image2)=>

    


    <Grid item xs={12} sm={1} md={4} >
        
<ExploreItem
key={Image2._id}
I_id={Image2._id}
I_url={Image2.sizes.size.original.source}
I_w={Image2.sizes.size.original.width}
I_h={Image2.sizes.size.original.height}
I_CC={Image2.favourites}
I_FC={Image2.favourites}

/>
</Grid>

):(null)}
</Grid>
</div>

{Tabb===2 ?
(
<div className="textspace2">

 
<text    className="tredtext">   
    Trending Tags- Now
</text>
</div>):(null)}


<div className="expspace2"></div>
<div className="m2" style={{paddingLeft:'10%'}}>
<Grid container spacing={1}  >
{Tabb===2 ? 



    TrendingNows.map( (TrendingNow)=>
    
        
    
    
        <Grid item xs={10} sm={2} md={2} >
            
    <TrendingItem
    key={TrendingNow.iddd}
    T_id={TrendingNow.iddd}

   
    T_url={TrendingNow.srcc}
   T_t={TrendingNow.titlee}
    T_h={TrendingNow.hei}
    T_w={TrendingNow.wid}
    
    
    />
    </Grid>
    
    ):(null)}
    </Grid>
    </div>

    {Tabb===2 ?
(
<div className="textspace3">

 
<text    className="tredtext2">   
    Trending Tags- This Week
</text>
</div>):(null)}

<div className="expspace3"></div>
<div className="m3" style={{paddingLeft:'10%'}}>
<Grid container spacing={2}  >
{Tabb===2 ? 



    TrendingWeeks.map( (TrendingWeek)=>
    
        
    
    
        <Grid item xs={17} sm={2} md={3} >
            
    <TrendingItem2
    key={TrendingWeek.iddd2}
    T_id2={TrendingWeek.iddd2}

   
    T_url2={TrendingWeek.srcc2}
   T_t2={TrendingWeek.titlee2}
    T_h2={TrendingWeek.hei2}
    T_w2={TrendingWeek.wid2}
    
    
    />
    </Grid>
    
    ):(null)}
    </Grid>
    </div>

    {Tabb===2 ?
(
<div className="textspace4">

 
<text    className="tredtext3">   
Tags — All Time Most Popular
</text>
</div>):(null)}



<div className="expspace3"></div>
<div className="m3" style={{paddingLeft:'10%'}}>
<Grid container spacing={2}  >
{Tabb===2 ? 



    TrendingATs.map( (TrendingAT)=>
    
        
    
    
        <Grid item xs={12} sm={2} md={3} >
            
    <TrendingItem3
    key={TrendingAT.iddd3}
    T_id3={TrendingAT.iddd3}

   
    T_url3={TrendingAT.srcc3}
   T_t3={TrendingAT.titlee3}
    T_h3={TrendingAT.hei3}
    T_w3={TrendingAT.wid3}
    
    
    />
    </Grid>
    
    ):(null)}
    </Grid>
    </div>





</div>


);

}
export default ExplorePage;
