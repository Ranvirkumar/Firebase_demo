import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TextField from "../../CommonComponent/InputField"
import AsyncStorage from '@react-native-community/async-storage';

import * as firebase from "firebase"

const passRegex = RegExp(/((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]){6,12})/)
const emailRegex = RegExp(/^[^]+@[^]+\.[a-z]{2,3}$/)
const FORM_DATA = [
    { name: 'newEmail', text: 'New Email', error: "newEmailError" },
    { name: 'password', text: 'Current password', error: "passwordError" },
]
const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
}

class ChangeEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newEmail: "",
            password: "",
            key: "",
            formErrors: {
                newEmailError: "",
                passwordError: "",
            }
        };
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', async () => {
            var userData = firebase.auth().currentUser;
            firebase.database().ref().child("Data").on("value", snap => {
                const foo = snap.val();
                if (foo !== null) {
                    var key = Object.keys(foo).filter(function (key) { return foo[key].email === userData.email })
                    this.setState({ key: key })
                }
            });;
        })
    }

    handleChange = (value, name) => {
        let formErrors = this.state.formErrors;
        switch (name) {
            case "newEmail":
                formErrors.emailError =
                    emailRegex.test(value) && value.length > 0
                        ? ""
                        : "invalid Email";
                break;
            case "password":
                formErrors.passwordError =
                    passRegex.test(value) && value.length >= 6 && value.length <= 12
                        ? ""
                        : "invalid password";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value })
    }
    Reauthenticate = (password) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, password)
        return user.reauthenticateWithCredential(cred)
    }

    HandleSubmit = (email, password) => {
        this.setState({ emailError: "", passwordError: "" });
        if (formValid(this.state.formErrors)) {
            this.Reauthenticate(password).then(() => {
                var user = firebase.auth().currentUser;
                user.updateEmail(email).then(() => {
                    alert("Email has changed")
                    firebase.database().ref('Data/' + this.state.key).update({ email: email })
                }).catch((error) => {
                    console.log("error message", error)
                })
            }).catch((error) => {
                console.log("error", error)
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

                <View style={{ backgroundColor: "violet", marginTop: 30, width: 330, marginLeft: 10 }}>
                    <TouchableOpacity
                        style={styles.sign_in}
                        onPress={() => this.HandleSubmit(this.state.newEmail, this.state.password)}
                    >
                        <Text style={{ alignSelf: "center", fontSize: 30 }}>Change Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default ChangeEmail;
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
