import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Notification from "./Notification"
import Shared from "./Share"
import Contact from "./Contact"
import ChangePassword from "./ChangePassword"
import ChangeEmail from "./ChangeEmail"
import {View ,TouchableOpacity,Image,Dimensions} from "react-native"
import CustomSidebarMenu from "./SideBar"
import Icon from '@expo/vector-icons/FontAwesome5';

const Stack = createStackNavigator();
const Drawer =createDrawerNavigator();
export default function DashScreen() {
  
    return (
        <Drawer.Navigator
            initialRouteName="Contact"
            drawerContentOptions={{ activeTintColor: '#e91e63', itemStyle: { marginVertical: 5 }}}
            drawerContent={props =><CustomSidebarMenu {...props}/>}
            >
            <Drawer.Screen
                name="Notification"
                component={NotificationStack} />
            <Drawer.Screen
                name="Contact"
                component={ContactStack} />
            <Drawer.Screen
                name="Shared"
                component={SharedStack} />
            <Drawer.Screen
                name="ChangePassword"
                component={ChangePasswordStack} />
            <Drawer.Screen
                name="ChangeEmail"
                component={ChangeEmailStack} />
        </Drawer.Navigator>
    );
}


const NavigationDrawerStructure = (props)=> {
    const toggleDrawer = () => {
      props.navigationProps.toggleDrawer();
    };
  
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={()=> toggleDrawer()}>
          <Icon name="bars" color="brown" size={30} style={{marginLeft: 20}}/>
        </TouchableOpacity>
      </View>
    );
  }
  function NotificationStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="Notification">
          <Stack.Screen
            name="Notification"
            component={Notification}
            options={{
              title: 'Notification',
              headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
              headerStyle: {backgroundColor: 'aqua',height: 55 },
              headerTintColor: 'orange', 
              headerTitleStyle: {color: 'darkorange',textAlign: 'center',fontWeight: 'bold',fontSize: 30,fontStyle:"italic"},}}
          />
        </Stack.Navigator>
    );
  }

  function ContactStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="Contact">
          <Stack.Screen
            name="Contact"
            component={Contact}
            options={{
              title: 'Contact',
              headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
              headerStyle: {backgroundColor: 'aqua',height: 55 },
              headerTintColor: 'orange', 
              headerTitleStyle: {color: 'darkorange',textAlign: 'center',fontWeight: 'bold',fontSize: 30,fontStyle:"italic"},}}
          />
        </Stack.Navigator>
    );
  }

  function SharedStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="Shared">
          <Stack.Screen
            name="Shared"
            component={Shared}
            options={{
              title: 'Shared',
              headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
              headerStyle: {backgroundColor: 'aqua',height: 55 },
              headerTintColor: 'orange', 
              headerTitleStyle: {color: 'darkorange',textAlign: 'center',fontWeight: 'bold',fontSize: 30,fontStyle:"italic"},}}
          />
        </Stack.Navigator>
    );
  }

  function ChangePasswordStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="ChangePassword">
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{
              title: 'ChangePassword',
              headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
              headerStyle: {backgroundColor: 'aqua',height: 55 },
              headerTintColor: 'orange', 
              headerTitleStyle: {color: 'darkorange',textAlign: 'center',fontWeight: 'bold',fontSize: 30,fontStyle:"italic"},}}
          />
        </Stack.Navigator>
    );
  }

  function ChangeEmailStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="ChangeEmail">
          <Stack.Screen
            name="ChangeEmail"
            component={ChangeEmail}
            options={{
              title: 'ChangeEmail',
              headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
              headerStyle: {backgroundColor: 'aqua',height: 55 },
              headerTintColor: 'orange', 
              headerTitleStyle: {color: 'darkorange',textAlign: 'center',fontWeight: 'bold',fontSize: 30,fontStyle:"italic",},}}
          />
        </Stack.Navigator>
    );
  }
