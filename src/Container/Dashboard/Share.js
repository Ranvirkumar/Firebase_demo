import React, { Component } from 'react';
import { View, Text, StyleSheet, Share, TouchableOpacity, } from 'react-native';


import TextField from "../../CommonComponent/InputField"
const FORM_DATA = [
  { name: 'inputValue', text: 'Sharing_Input'},
]
export default class Shared extends Component{
  constructor() {
    super();
    this.state = {
      inputValue: '',
    };
  }
  handleChange = (value, name) => {
    this.setState({[name]: value })
  }
  ShareMessage = (inputValue) => {
    if(inputValue.length > 0){
      Share.share({
        message: inputValue.toString(),
      })
      .then(result => console.log(result))
      .catch(errorMsg => console.log(errorMsg));
    }else{
      alert("Please Enter the data to share")
    }
    
  };
  render() {
    return (
      <View style={styles.container}>
        {
          FORM_DATA.map((item, index) => {
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
        <View style={{ backgroundColor: "violet", marginTop: 10, width: 330, marginLeft: 10 }}>
          <TouchableOpacity
            style={styles.sign_in}
            onPress={() => this.ShareMessage(this.state.inputValue)}
          >
            <Text style={{ alignSelf: "center", fontSize: 30 }}>Share the text</Text>
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
