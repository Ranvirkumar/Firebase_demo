import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,  } from 'react-native';
import * as firebase from "firebase"
import TextField from "../../CommonComponent/InputField"
import * as GoogleSignIn from 'expo-google-sign-in';
import AsyncStorage from '@react-native-community/async-storage';



const emailRegex = RegExp(/^[^]+@[^]+\.[a-z]{2,3}$/)
const passRegex = RegExp(/((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]){6,12})/)
const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
}

const FORM_DATA = [
    { name: 'email', text: 'Email', error: "emailError" },
    { name: 'password', text: 'Password', error: "passwordError" },
]

var provider = new firebase.auth.GoogleAuthProvider();
export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            user:null,
            formErrors: {
                emailError: "",
                passwordError: ""
            }
        }
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
            case "password":
                formErrors.passwordError =
                    passRegex.test(value) && value.length > 6 && value.length < 12
                        ? ""
                        : "invalid password";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value })
    }

    HandleSubmit = (email, password) => {
        this.setState({ emailError: "", passwordError: "" });
        if (formValid(this.state.formErrors)) {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => { 
                    this.props.navigation.navigate("Dashboard") })
                .catch(error => {
                    console.log("Error during Sign In", error.message)
                })
        }
    }
    // componentDidMount() {
    //     this.initAsync();
    //   }
    
    //   initAsync = async () => {
    //     await GoogleSignIn.initAsync({
    //       clientId: '169388035967-88c1ppgfnepk5kove6p7vtv1o0kimjje.apps.googleusercontent.com',
    //     });
    //     this._syncUserWithStateAsync();
    //   };
    
    //   _syncUserWithStateAsync = async () => {
    //     const user = await GoogleSignIn.signInSilentlyAsync();
    //     this.setState({ user });
    //   };
    
    //   signOutAsync = async () => {
    //     await GoogleSignIn.signOutAsync();
    //     this.setState({ user: null });
    //   };
    
    //   signInAsync = async () => {
    //     try {
    //       await GoogleSignIn.askForPlayServicesAsync();
    //       const { type, user } = await GoogleSignIn.signInAsync();
    //       if (type === 'success') {
    //         this._syncUserWithStateAsync();
    //       }
    //     } catch ({ message }) {
    //       alert('login: Error:' + message);
    //     }
    //   };
    
    //   onPress = () => {
    //     if (this.state.user) {
    //       this.signOutAsync();
    //     } else {
    //       this.signInAsync();
    //     }
    //   };
    
    
    // HandleSubmit = async () => {
    //     this.setState({ emailError: "", passwordError: "" })
    //     try {
    //         let user = await AsyncStorage.getItem('data');
    //         var parsed = JSON.parse(user);
    //     }
    //     catch (error) {
    //         alert(error)
    //     }
    //     if (formValid(this.state.formErrors)) {
    //         console.log("valid form")
    //         if ((this.state.email === parsed.email) && (this.state.password === parsed.password)) {
    //             this.props.navigation.navigate("Dashboard")
    //         }
    //     }
    // }
    render() {
        return <View style={styles.container}>
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
            <View style={{ paddingLeft: 190, paddingTop: 10 }}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Password')}
                >
                    <Text style={{ fontSize: 14, color: "chocolate" }}>Forget Password</Text>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: "violet", marginTop: 10, width: 330, marginLeft: 10 }}>
                <TouchableOpacity
                    style={styles.sign_in}
                    onPress={() => this.HandleSubmit(this.state.email, this.state.password)}
                >
                    <Text style={{ alignSelf: "center", fontSize: 30 }}>Login</Text>
                </TouchableOpacity>
            </View>
           
            <View style={{ marginTop: 15, backgroundColor: "wheat" }}>
                <TouchableOpacity
                    style={styles.register}
                    onPress={() => this.props.navigation.navigate('Register')}
                >
                    <Text>Go to Register</Text>
                </TouchableOpacity>
            </View>
            {/* <View>
            <Text onPress={this.onPress}>Toggle Auth</Text>
            </View> */}
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
