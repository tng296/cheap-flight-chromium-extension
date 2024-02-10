import React from 'react'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import ActionProvider from '../chatbot/ActionProvider'
import MessageParser from '../chatbot/MessageParser'
import config from '/Users/vincentnguyen/Developer/CodeRed-/app-FE/chatbot/config.js'


const FlightChatbot = () => {
    return (
        <div>
            <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
            />
        </div>
    );
}
export default FlightChatbot
