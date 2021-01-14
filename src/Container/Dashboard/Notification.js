import React, { Component } from 'react';
import { View, Text ,TouchableOpacity,StyleSheet, Linking,Share} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import {Menu,Left,Close,website} from "./../../CommonComponent/Utils"
import TextField from "../../CommonComponent/InputField"



const FORM_DATA = [
  { name: 'Title', text: 'Title'},
  { name: 'Body', text: 'Body'},
]


export default class Notification extends Component {
constructor(props) {
  super(props);
  this.state={
    token:"",
    notification:"",
    Body:"",
    Title:""
  }
}

componentDidMount() {
  this.registerForPushNotificationsAsync()
  .then(token => this.setState({token :token}));
   Notifications.addNotificationReceivedListener(notification => {
     this.setState({notification:notification});
   });
     Notifications.addNotificationResponseReceivedListener(response => {
     console.log(response);
   });
}
componentWillUnmount(){
 Notifications.removeAllNotificationListeners();
}
registerForPushNotificationsAsync=async()=> {
 let token;
 if (Constants.isDevice) {
   const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
   let finalStatus = existingStatus;
   if (existingStatus !== 'granted') {
     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
     finalStatus = status;
   }
   if (finalStatus !== 'granted') {
     alert('Failed to get push token for push notification!');
     return;
   }
   token =website?"": (await Notifications.getExpoPushTokenAsync()).data;
 } else {
   alert('Must use physical device for Push Notifications');
 }
 
 return token;
}
sendPushNotification= async(token,Title,Body)=>{
 const message = {
   to: token,
   sound: 'default',
   title: Title,
   body: Body,
   data: { data: 'goes here' },
 };

 await fetch('https://exp.host/--/api/v2/push/send', {
   method: 'POST',
   headers: {
     Accept: 'application/json',
     'Content-Type': 'application/json',
   },
   body: JSON.stringify(message),
 });
}

handleChange = (value, name) => {
  this.setState({[name]: value })
}
  render() {
    return (
      <View style={styles.container}>
        <View>
                {
                    FORM_DATA.map((item,index) => {
                        return (
                            <View key={index}>
                                <Text style={styles.labelHead}>{item.text}</Text>
                                <TextField
                                    inputStyle={styles.field}
                                    onInputChange={(value) => this.handleChange(value, item.name)}
                                    placeHolderText={item.text}
                                    name={item.name}
                                    defaultValue={this.props[item.name]}
                                />
                            </View>
                        );
                    })
                }
            </View>
        <View style={{ backgroundColor: "violet", marginTop: 10, width: 330, marginLeft: 10 }}>
          <TouchableOpacity
            style={styles.sign_in}
            onPress={()=>this.sendPushNotification(this.state.token,this.state.Title,this.state.Body)}
          >
            <Text style={{ alignSelf: "center", fontSize: 30 }}>Push Notification</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  header: {
      fontSize: 30,
      fontStyle: "italic",
      fontWeight: "bold",
      alignSelf: "center"
  },
  labelHead: {
      fontSize: 20,
      color: "saddlebrown",
      fontWeight: "bold"
  },
  field: {
      borderRadius: 12,
      borderWidth: 2,
      width: 350,
      color: "midnightblue",
      height: 30,
      textAlign: 'center',
  },
  sign_in: {
      borderWidth: 2,
      borderColor: "turquoise",
      height: 45,
      textAlign: "center"
  },
  register: {
      borderWidth: 2,
      borderColor: "turquoise",
      height: 35,
      paddingTop: 5,
      paddingLeft: 15,
      paddingRight: 15,
  },
  error: {
      color: "tomato",
      fontSize: 14
  }
})
