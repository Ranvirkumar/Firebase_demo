import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome5';
import { Drawer } from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import * as firebase from "firebase"

export default class CustomSidebarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }
  componentDidMount() {
    this.props.navigation.addListener('focus', async () => {
      var userData = firebase.auth().currentUser;
      firebase.database().ref().child("Data").on("value", snap => {
        const foo = snap.val();
        if (foo !== null) {
          var key = Object.keys(foo).filter(function (key) { return foo[key].email === userData.email })
          this.setState({ list: foo[key] })
        }
      });;
    });

  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#ffad33" }}>
        <DrawerContentScrollView {...this.props}>
          <View>
            <Icon name="user-friends" color="gold" size={245} />
            <Text style={{ fontSize: 20, fontStyle: "italic", color: "brown", alignSelf: "center", fontWeight: "bold" }} >Name:{this.state.list.Name}</Text>
            <Text style={{ fontSize: 16, fontStyle: "italic", color: "brown", alignSelf: "center", fontWeight: "bold" }}>Email:{this.state.list.email}</Text>
            <Text style={{ fontSize: 16, fontStyle: "italic", color: "brown", alignSelf: "center", fontWeight: "bold" }}>Mobile:{this.state.list.mobile}</Text>
          </View>
          <View style={styles.drawerContent}>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={() => (
                  <Icon
                    name="bell"
                    color="blue"
                    size={24}
                  />
                )}
                label="Notification"
                labelStyle={{ color: "brown", fontSize: 20, fontWeight: "bold", fontStyle: "italic" }}
                onPress={() => { this.props.navigation.navigate('Notification') }}
              />
              <DrawerItem
                icon={() => (
                  <Icon
                    name="file-contract"
                    color="blue"
                    size={24}
                  />
                )}
                label="Contact"
                labelStyle={{ color: "brown", fontSize: 20, fontWeight: "bold", fontStyle: "italic" }}
                onPress={() => { this.props.navigation.navigate('Contact') }}
              />
              <DrawerItem
                icon={() => (
                  <Icon
                    name="sms"
                    color="blue"
                    size={24}
                  />
                )}
                label="Chat"
                labelStyle={{ color: "brown", fontSize: 20, fontWeight: "bold", fontStyle: "italic" }}
                onPress={() => { this.props.navigation.navigate('Chat') }}
              />
              <DrawerItem
                icon={() => (
                  <Icon
                    name="share-alt"
                    color="blue"
                    size={24}
                  />
                )}
                label="Shared"
                labelStyle={{ color: "brown", fontSize: 20, fontWeight: "bold", fontStyle: "italic" }}
                onPress={() => { this.props.navigation.navigate('Shared') }}
              />
              <DrawerItem
                icon={() => (
                  <Icon
                    name="lock"
                    color="blue"
                    size={24}
                  />
                )}
                label="ChangePassword"
                labelStyle={{ color: "brown", fontSize: 20, fontWeight: "bold", fontStyle: "italic" }}
                onPress={() => { this.props.navigation.navigate('ChangePassword') }}
              />
              <DrawerItem
                icon={() => (
                  <Icon
                    name="envelope-square"
                    color="blue"
                    size={24}
                  />
                )}
                label="ChangeEmail"
                labelStyle={{ color: "brown", fontSize: 20, fontWeight: "bold", fontStyle: "italic" }}
                onPress={() => { this.props.navigation.navigate('ChangeEmail') }}
              />
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={() => (
              <Icon
                name="sign-out-alt"
                color="blue"
                size={24}
              />
            )}
            label="Sign Out"
            labelStyle={{ color: "brown", fontSize: 20, fontWeight: "bold", fontStyle: "italic" }}
            onPress={() => { this.props.navigation.navigate('Login') }}
          />
        </Drawer.Section>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },

  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: -10,
    borderTopColor: 'red',
    borderTopWidth: 2,
  },
});