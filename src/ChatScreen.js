import React from 'react';
import ChatKit from '@pusher/chatkit';

class ChatScreen extends React.Component {

    componentDidMount() {
        const chatManager = new ChatKit.ChatManager({
            instanceLocator: 'v1:us1:4f6486d4-e89d-400c-b3cc-2c3b3ba0e8b5',
            userId: this.props.currentUsername,
            tokenProvider: new ChatKit.TokenProvider({
                url: 'http://localhost:1337/authenticate'
            }),
        });

        chatManager.connect().then(currentUser => { 
            console.log('currentUser', currentUser);
            this.setState({ currentUser });
        }).catch(error => { 
            console.error(error);
        });
    }

    render() {
        return (
            <div>
                <h1>Chat</h1>
                <p>'aight {this.props.currentUsername}</p>
            </div>
        );
    }
}

export default ChatScreen;