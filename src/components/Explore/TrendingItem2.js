import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import './TrendingItem2.css';
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
import YouAbout from '../../pages/YouAbout/YouAbout';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import YouCameraRoll from '../../pages/YouCameraRoll/YouCameraRoll';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useMediaQuery} from "@material-ui/core";
import { Divider } from '@material-ui/core';
import StarsIcon from '@material-ui/icons/Stars';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';

const TrendingItem2=({T_id2,T_url2,T_t2,T_h2,T_w2})=>{

    const[hover3,SetHover3]=useState(false);
  

    const handlemouse3=()=>{

SetHover3(true);

    }
    const handlemoused3=()=>{
        SetHover3(false);

    }



return(

    <Card  style={{width:T_w2},{height:T_h2}}  onMouseEnter={handlemouse3} onMouseLeave={handlemoused3}  >   

    <CardMedia >
    
    
    <img     className={hover3 === true ? "hov2" : "imm2"} src={T_url2} width={'100%'} height={T_h2}  >
  
    </img>
    <div className="bZ3">
       {T_t2}
   
            
       </div>
    
    
        
   
    
    </CardMedia>
    
    
    
    
    
    
    </Card>
    



);
}
export default TrendingItem2;
