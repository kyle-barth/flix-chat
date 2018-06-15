import React from 'react';

class ChatScreen extends React.Component {
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