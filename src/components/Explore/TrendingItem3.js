import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import './TrendingItem3.css';
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

const TrendingItem3=({T_id3,T_url3,T_t3,T_h3,T_w3})=>{
///// intializing hover4 ///////////////////////////////////////////////////////
    const[hover4,SetHover4]=useState(false);
  
    /**
 * @param {void}
 * @returns {void}
 * the function sets the hover4 by true needed for some effect when mouse is on the picture
 */

    const handlemouse4=()=>{

SetHover4(true);

    }
       /**
 * @param {void}
 * @returns {void}
 * the function sets the hover4 by true needed for some effect when mouse is down the picture
 */



    const handlemoused4=()=>{
        SetHover4(false);

    }

 // this trending item represent the trending all the time
// the trendingg item is needed when mapping trending all the time image array in the explore page
// using the variables sent by the explore page it maps each image on a card
// if the mouse is on a card it lightens more and vice verse using the hover3 state variable

return(

    <Card  style={{width:T_w3},{height:T_h3}}  onMouseEnter={handlemouse4} onMouseLeave={handlemoused4}  >   

    <CardMedia >
    
    
    <img     className={hover4 === true ? "hov3" : "imm3"} src={T_url3} width={'100%'} height={T_h3}  >
  
    </img>
    <div className="bZ4">
       {T_t3}
   
            
       </div>
    
    
        
   
    
    </CardMedia>
    
    
    
    
    
    
    </Card>
    



);
}
export default TrendingItem3;
