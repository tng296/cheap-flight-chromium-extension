import './App.css'
import FlightChatbot from '../components/FlightChatbot'
import React from 'react'
import { useState } from 'react'
import ActionProvider from '../chatbot/ActionProvider'
import MessageParser from '../chatbot/MessageParser'
import config from '../chatbot/config.js'

function App() {
  return (
    <div>
      <FlightChatbot />
    </div>
  )
}

export default App
