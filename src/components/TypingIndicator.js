import React from 'react';

class TypingIndicator extends React.Component {
    render() {
        if (this.props.usersWhoAreTyping.length === 0) {
            // return empty div
            return <div />
        } else if (this.props.usersWhoAreTyping.length === 1) {
            // get first person
            return <p>{this.props.usersWhoAreTyping[0]} is typing...</p>
        } else if (this.props.usersWhoAreTyping.length > 1) {
            return <p>{this.props.usersWhoAreTyping.join(' and ')} are typing...</p>
        }
    }
}

export default TypingIndicator;