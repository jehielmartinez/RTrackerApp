import React from 'react';
import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import Dashboard from '../Dashboard/Dashboard';
import NewList from '../NewList/NewList';
import SideBar from './SideBar';

const drawerNavigation = createDrawerNavigator(
    {
        Dashboard: {screen: Dashboard},
        NewList: {screen: NewList}
    },
    {
        contentComponent: props => <SideBar {...props}/>
    }
)

export default createAppContainer(drawerNavigation);

