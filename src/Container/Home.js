// import { createStackNavigator } from 'react-navigation-stack';
// import { createAppContainer } from 'react-navigation';
import Register from "./Register/Register";
import Login from "./Login/Login";
import * as React from 'react';
import * as firebase from "firebase"
import Password from "./Password/Password"
import DashScreen from "./Dashboard/Screen"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import Icon from '@expo/vector-icons/FontAwesome5';
import { TouchableOpacity } from "react-native";

const firebaseConfig = {
    apiKey: "AIzaSyBise9gOo6Pt2xUWkX58zYB-P5pJPa6Ehw",
    authDomain: "screentask-12db2.firebaseapp.com",
    databaseURL: "https://screentask-12db2.firebaseio.com",
    projectId: "screentask-12db2",
    storageBucket: "screentask-12db2.appspot.com",
    messagingSenderId: "169388035967",
    appId: "1:169388035967:web:d7446bcf8e61c90c9b944a",
    measurementId: "G-8X3MD9QPQX"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
const Stack = createStackNavigator();

export default function Home() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        title: 'Login',
                        headerTintColor: 'red',
                        headerStyle: { backgroundColor: 'aqua', height: 55 },
                        headerTitleStyle: { color: 'darkorange', textAlign: 'center', fontWeight: 'bold', fontSize: 30 ,fontStyle:"italic"}
                    }} />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        title: 'Register',
                        headerStyle: { backgroundColor: 'aqua', height: 55 },
                        headerTintColor: 'red',
                        headerTitleStyle: { color: 'darkorange', textAlign: 'center', fontWeight: 'bold', fontSize: 30,fontStyle:"italic" }
                   }} />
                <Stack.Screen
                    name="Dashboard"
                    component={DashScreen}
                    options={{
                        headerShown: false
                    }} />
                <Stack.Screen
                    name="Password"
                    component={Password}
                    options={{
                        title: 'Password',
                        headerTintColor: 'red',
                        headerStyle: { backgroundColor: 'aqua', height: 55 },
                        headerTitleStyle: { color: 'darkorange', textAlign: 'center', fontWeight: 'bold', fontSize: 30,fontStyle:"italic" }
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

