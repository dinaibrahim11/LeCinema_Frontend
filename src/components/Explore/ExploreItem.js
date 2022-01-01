import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import './ExploreItem.css';
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
import StarsIcon from '@material-ui/icons/Stars';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';

const ExploreItem=({I_id,I_url,I_w,I_h,I_CC,I_FC})=>{


    const history = useHistory();// function used to redirect to another oage

    /**
     * @returns {void}
     * @param {*} num the id of photo
     * the function is called when clicked on a photo
     * it navigate to the photo page using the id concatenated to the photo
     */
    const handlePhotoRoute=(num)=>{history.push("/Photos/"+num);}
    /// intializing hover state variable
    const[hover,SetHover]=useState(false);
  
/**
 * @returns {void}
 * @param {void}
 * the fuction is called when the mouse is on the photo
 * it sets the hover by true when on mouse (needed for showing comment count and favourite counts )
 */
    const handlemouse=()=>{

SetHover(true);

    }
    /**
    * @returns {void}
 * @param {void}
 * the fuction is called when the mouse is down photo
 * it sets the hover by false when omouse down (needed for not showing comment count and favourite counts )
     */
    const handlemoused=()=>{
        SetHover(false);

    }



/////////////////////// card for styling ///

    var cardStyle = {
        display: 'block',
        height: '100%',
        width:'90%',
      transitionDuration: '0.1s',
      border:'1px solid black',
       }
// the explore item is needed when mapping explore image array in the explore page
// using the variables sent by the explore page it maps each image on a card
// if the mouse is on a card it shows the favourite and comment counts and vice verse using the hover state variable



return(
    
<Card  style={cardStyle}  onMouseEnter={handlemouse} onMouseLeave={handlemoused} onClick={ ( )=> handlePhotoRoute(I_id)}  >   

<CardMedia >


<img src={I_url} width={'100%'} height={'100%'} ></img>


{hover===true?(
    
    
    <div className="bZ">
   
   <StarBorderOutlinedIcon className="star" />
    {I_CC}   
<ChatBubbleOutlineOutlinedIcon/>
{I_FC}
       
     
    </div>

    ):(null)}

</CardMedia>






</Card>



  );

}
export default ExploreItem;