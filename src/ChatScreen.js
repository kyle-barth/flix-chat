import React from 'react';
import ChatKit from '@pusher/chatkit';
import MessageList from './components/MessageList';

class ChatScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        const chatManager = new ChatKit.ChatManager({
            instanceLocator: 'v1:us1:4f6486d4-e89d-400c-b3cc-2c3b3ba0e8b5',
            userId: this.props.currentUsername,
            tokenProvider: new ChatKit.TokenProvider({
                url: 'http://localhost:1337/authenticate'
            }),
        });

        chatManager.connect().then(currentUser => { 
            //console.log('currentUser', currentUser);
            this.setState({ currentUser });

            // returns a promise
            return currentUser.subscribeToRoom({
                roomId: 9548428,
                messageLimit: 100,
                hooks: {
                    onNewMessage: message => {
                        this.setState({
                            messages: [...this.state.messages, message],
                        });
                    }
                }
            }).then(currentRoom => {
                this.setState({ currentRoom });
            });

        }).catch(error => { 
            console.error(error);
        });
    }

    render() {
        return (
            <div>
                <h1>Chat</h1>
                <p>'aight {this.props.currentUsername}</p>
                <MessageList messages={this.state.messages} />
            </div>
        );
    }
}

export default ChatScreen;