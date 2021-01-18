import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import * as firebase from "firebase"
import Icon from '@expo/vector-icons/FontAwesome5';

import Fire from './Fire';


class Chat extends React.Component {

    state = {
        messages: [],
    };

    get user() {
        var userData = firebase.auth().currentUser;
        return {
            name: userData.displayName,
            _id: Fire.shared.uid,
        };
    }

    renderSend = (props) => {
        const {text,messageIdGenerator,user, onSend} = props
        return (
            <TouchableOpacity style={{alignSelf:"center",paddingRight:10}} onPress={()=>{
                if (text && onSend) {
                    onSend({ text: text.trim(), user:user,_id:messageIdGenerator()}, true);
              }}}>
                <Icon
                    name="arrow-circle-right"
                    color="blue"
                    size={24}
                  />
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={Fire.shared.send}
                user={this.user}
                renderSend={this.renderSend}
            />
        );
    }

    componentDidMount() {
        Fire.shared.on(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );
    }
    componentWillUnmount() {
        Fire.shared.off();
    }
}

export default Chat;