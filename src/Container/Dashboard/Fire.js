import * as firebase from "firebase"

class Fire {
    constructor() {
        this.init();
        this.observeAuth();
    }

    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyBise9gOo6Pt2xUWkX58zYB-P5pJPa6Ehw",
                authDomain: "screentask-12db2.firebaseapp.com",
                databaseURL: "https://screentask-12db2.firebaseio.com",
                projectId: "screentask-12db2",
                storageBucket: "screentask-12db2.appspot.com",
                messagingSenderId: "169388035967",
                appId: "1:169388035967:web:d7446bcf8e61c90c9b944a",
                measurementId: "G-8X3MD9QPQX"
            });
        }
    };

    observeAuth = () =>
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    onAuthStateChanged = user => {
        if (!user) {
            try {
                firebase.auth().signInAnonymously();
            } catch ({ message }) {
                alert(message);
            }
        }
    };

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get ref() {
        return firebase.database().ref('messages');
    }

    parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;
        const timestamp = new Date(numberStamp);
        const message = {
            _id,
            timestamp,
            text,
            user,
        };
        return message;
    };

    on = callback =>
        this.ref
            .limitToLast(20)
            .on('child_added', snapshot => callback(this.parse(snapshot)));

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }
    // send the message to the Backend
    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            const message = {
                text,
                user,
                timestamp: this.timestamp,
            };
            this.append(message);
        }
    };

    append = message => this.ref.push(message);

    // close the connection to the Backend
    off() {
        this.ref.off();
    }
}

Fire.shared = new Fire();
export default Fire;
