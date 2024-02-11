// in MessageParser.js
import React from 'react';

const MessageParser = ({ children, actions }) => {
    const parse = (message) => {
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            actions.handleHello();
        }
        else if (message.includes('from') && message.includes('to') && message.includes('flight')) {
            actions.handleResponse(message);
        }
        else {
            console.log('no action')
        }
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    parse: parse,
                    actions,
                });
            })}
        </div>
    );
};

export default MessageParser;