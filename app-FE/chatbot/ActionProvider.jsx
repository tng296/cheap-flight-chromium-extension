import React from 'react';
import Axios from 'axios';
import { useState } from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const [userResponse, setUserResponse] = useState(' ');

    const handleHello = async () => {
        const botMessage = createChatBotMessage('Where would you like to go? It would be nice if you can provide me with the date and time of your departure');
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    const handleResponse = async (userInput) => {
        console.log("hello from handleResponse")
        console.log(userInput)
        await Axios.post('http://localhost:3000/api', { message: userInput })
            .then((response) => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            });
    };

    console.log(userResponse)

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        handleHello,
                        handleResponse
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;