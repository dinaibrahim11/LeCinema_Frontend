/**
 * The You module
 * @module You
 */

import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import YouCover from '../YouCover/YouCover';
import './YouMain.css';
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import YouAbout from '../../pages/YouAbout/YouAbout';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import YouCameraRoll from '../../pages/YouCameraRoll/YouCameraRoll';

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
};
}
      
const useStyles = makeStyles((theme) => ({
    root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
},
}));

/**
 * Array that contains the current pictures in the camera roll
 * @type {Array<strings>}
 */
const DUMMY_IMAGES = ['https://image.shutterstock.com/image-photo/connected-flexible-series-metal-links-600w-1909534807.jpg',
    'https://image.shutterstock.com/image-photo/linked-blocks-bank-world-currencies-600w-1937429821.jpg',
    'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-1767117413.jpg',
    'https://www.gardeningknowhow.com/wp-content/uploads/2020/11/orange-tree.jpg',
    'https://www.gardeningknowhow.com/wp-content/uploads/2020/11/orange-tree.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/4/45/Wide_lightning.jpg' ];

/**
 * Responsible for returning the you page entirely with all its components and routing between them
 * @param {properties} props
 * @returns {element} The you page contents
 */
const YouMain = (props) => {
    const [tab, setTab] = useState('about');
    let history = useHistory();
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
    setValue(newValue);
    };
    useEffect(() => {
        setTab(props.currentTab)
    }, [props.currentTab])
   
    return (
        <div>
            <div>
                <YouCover currPics={DUMMY_IMAGES} />
            </div>
            
            <div className='toolbarBg'></div>
            <div className={classes.root}>
                <div className='navBar'>
                    <AppBar position="static" color="default" >
                        <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="on"
                        aria-label="scrollable auto tabs example"
                        >
                            <Tab label="About" {...a11yProps(0)} onClick={() => setTab('about')}/>
                            <Tab label="Photostream" {...a11yProps(1)} />
                            <Tab label="Albums" {...a11yProps(2)} />
                            <Tab label="Faves" {...a11yProps(3)} />
                            <Tab label="Galleries" {...a11yProps(4)} />
                            <Tab label="Groups" {...a11yProps(5)} />
                            <Tab label="CameraRoll" {...a11yProps(6)} onClick={() => setTab('cameraRoll')}/>
                        </Tabs>
                    </AppBar>
        
                </div>
            </div>
            <main>
                {tab === 'about' ? <YouAbout currPics={DUMMY_IMAGES}/> : <YouCameraRoll currPics={DUMMY_IMAGES}/>}
            </main>
        </div>
    );
};

export default YouMain;