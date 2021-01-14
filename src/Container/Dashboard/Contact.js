import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Share } from 'react-native';
import TextField from "../../CommonComponent/InputField"
const FORM_DATA = [
  { name: 'mobile', text: 'Mobile', error: "mobileError" },
]

const MobileRegex = RegExp(/^[6-9][0-9]{9}$/)
const formValid = formErrors => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
  });
  return valid;
}





export default class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobile: null,
      formErrors: {
        mobileError: "",
      }
    }
  }
 
  HandleSubmit = (mobile) => {
    this.setState({ mobileError: "" });
    if (formValid(this.state.formErrors)) {
      Linking.openURL(`tel:${mobile}`)
    }
  }
  handleChange = (value, name) => {
    let formErrors = this.state.formErrors;
    switch (name) {
      case "mobile":
        formErrors.mobileError =
        MobileRegex.test(value) && value.length > 0
            ? ""
            : "invalid mobile address";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value })
  }
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
                <Text style={styles.error}>{this.state.formErrors[item.error]}</Text>
              </View>
            );
          })
        }
        <View style={{ backgroundColor: "violet", marginTop: 10, width: 330, marginLeft: 10 }}>
          <TouchableOpacity
            style={styles.sign_in}
            onPress={() => this.HandleSubmit(this.state.mobile)}
          >
            <Text style={{ alignSelf: "center", fontSize: 30 }}>Contact</Text>
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
