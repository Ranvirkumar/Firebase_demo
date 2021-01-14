import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,  Alert, ScrollView } from 'react-native';
import * as firebase from "firebase"
import TextField from "../../CommonComponent/InputField"
import AsyncStorage from '@react-native-community/async-storage';

const NameRegex = RegExp(/^[A-Z][a-zA-Z '.-]*$/)
const emailRegex = RegExp(/^[^]+@[^]+\.[a-z]{2,3}$/)
const passRegex = RegExp(/((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]){6,12})/)
const MobileRegex = RegExp(/^[6-9][0-9]{9}$/)
const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
}

const FORM_DATA = [
    { name: 'Name', text: 'Name', error: "NameError" },
    { name: 'email', text: 'Email', error: "emailError" },
    { name: 'password', text: 'Password', error: "passwordError" },
    { name: 'mobile', text: 'mobile', error: "mobileError" },
]


export default class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            Name: "",
            email: "",
            password: "",
            mobile: "",
            formErrors: {
                NameError: "",
                emailError: "",
                passwordError: "",
                mobileError: ""
            }
        }
    }

    handleChange = (value, name) => {
        let formErrors = this.state.formErrors;
        switch (name) {
            case "Name":
                formErrors.NameError =
                    NameRegex.test(value) && value.length > 0
                        ? ""
                        : "invalid Name";
                break;
            case "email":
                formErrors.emailError =
                    emailRegex.test(value) && value.length > 0
                        ? ""
                        : "invalid email address";
                break;
            case "password":
                formErrors.passwordError =
                    passRegex.test(value) && value.length >= 6 && value.length <= 12
                        ? ""
                        : "invalid password";
                break;
            case "mobile":
                formErrors.mobileError =
                    MobileRegex.test(value) && value.length > 0
                        ? ""
                        : "invalid Mobile";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value })
    }
    HandleSubmit = (Name, email, password, mobile) => {
        this.setState({ NameError: "", emailError: "", passwordError: "", mobileError: "" });
        if (formValid(this.state.formErrors)) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(userCredentials => {
                    var uid = userCredentials.user.uid
                    const data = {
                        Name,
                        email,
                        password,
                        mobile
                    };
                    firebase.database().ref("Data/").push(data)
                    return userCredentials.user.updateProfile({
                        id:uid,
                        displayName: Name,
                        phoneNumber: mobile
                    })
                })
                .catch(error => {
                    console.log("Error", error.message)
                })
        }

    }

    // HandleSubmit = () => {
    //     if (formValid(this.state.formErrors)) {
    //         AsyncStorage.setItem('data', JSON.stringify(this.state));
    //         alert("successfully Registered")
    //     }
    // }
    render() {
        return <View style={styles.container}>
                        <ScrollView style={{margin:10,paddingTop:60}}>

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

                <View style={{ backgroundColor: "violet", marginTop: 30, width: 320, marginLeft: 10 }}>
                    <TouchableOpacity
                        style={styles.sign_in}
                        onPress={() => this.HandleSubmit(this.state.Name, this.state.email, this.state.password, this.state.mobile)}
                    >
                        <Text style={{ alignSelf: "center", fontSize: 30 }}>Register</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ borderColor: "red", borderRadius: 12, borderWidth: 2, margin: 10,width:310}}>
                    <Text style={styles.NoteText}>Note: Name must start with capital letter.</Text>
                    <View ><Text style={styles.NoteText}>Password must conatain capital letter,small </Text><Text style={styles.NoteText}>letter, digit,special char and length between 6-12.</Text></View>
                </View>
                </ScrollView>
        </View>
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
        width: 340,
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
    },
    NoteText: {
        fontWeight: "bold",
        color: "sienna",
        paddingStart:15
    }
})