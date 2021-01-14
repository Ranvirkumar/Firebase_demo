import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as firebase from "firebase"
import TextField from "../../CommonComponent/InputField"
import { Menu, Left, Close, website } from "./../../CommonComponent/Utils"

const emailRegex = RegExp(/^[^]+@[^]+\.[a-z]{2,3}$/)
const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
}
const FORM_DATA = [
    { name: 'email', text: 'Email', error: "emailError" },
]
class Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            formErrors: {
                emailError: "",
            }
        };
    }
    handleChange = (value, name) => {
        let formErrors = this.state.formErrors;
        switch (name) {
            case "email":
                formErrors.emailError =
                    emailRegex.test(value) && value.length > 0
                        ? ""
                        : "invalid email address";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value })
    }
    HandleSubmit = (email) => {
        this.setState({ emailError: "" });
        if (formValid(this.state.formErrors)) {
            firebase.auth().sendPasswordResetEmail(email)
                .then(() => {
                    alert("Email has been sent to you, please check and verify it.")
                })
                .catch(error => {
                    console.log("error during Sign In", error.message)
                })
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
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
                </View>
                <View style={{ backgroundColor: "violet", marginTop: 10, width: 330, marginLeft: 10 }}>
                    <TouchableOpacity
                        style={styles.sign_in}
                        onPress={() => this.HandleSubmit(this.state.email)}
                    >
                        <Text style={{ alignSelf: "center", fontSize: 30 }}>Reset Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Password;
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
