// in MessageParser.js
import React from 'react';

const MessageParser = ({ children, actions }) => {
    const parse = (message) => {
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            actions.handleHello();
        }
        else {
            actions.handleResponse();
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