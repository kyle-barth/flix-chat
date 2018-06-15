import React from 'react';
import ChatKit from '@pusher/chatkit';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import TypingIndicator from './components/TypingIndicator';

class ChatScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            messages: [],
            currentRoom: {},
            currentUser: {},
            usersWhoAreTyping: [],
        }

        this.sendMessage = this.sendMessage.bind(this);
        this.sendTypingEvent = this.sendTypingEvent.bind(this);
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
                    },
                    onUserStartedTyping: user => {
                       //console.log(user.name, 'started typing'); 
                        this.setState({
                            usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
                        });
                    },
                    onUserStoppedTyping: user => {
                        //console.log(user.name, 'stopped typing'); 
                        this.setState({
                            usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                                username => username !== user.name
                            ),
                        });
                    },
                }
            }).then(currentRoom => {
                // gives easier access to current room (and user) properties
                this.setState({ currentRoom });
            });

        }).catch(error => { 
            console.error(error);
        });
    }

    sendMessage(text) {
        this.state.currentUser.sendMessage({
            roomId: this.state.currentRoom.id,
            text,
        });
    }

    sendTypingEvent() {
        // gets the state of the user to show if typing
        this.state.currentUser.isTypingIn({
            roomId: this.state.currentRoom.id
        })
        .catch(error => console.error('error', error));
        // ^ just in case anything goes wrong
    }

    render() {
        return (
            <div>
                <h1>Chat</h1>
                <p>'aight {this.props.currentUsername}</p>
                <MessageList messages={this.state.messages} />
                <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
                <SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingEvent} />
            </div>
        );
    }
}

export default ChatScreen;