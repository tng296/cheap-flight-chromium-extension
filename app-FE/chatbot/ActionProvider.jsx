import React from 'react';
import Axios from 'axios';
import { useState } from 'react';

const ReturnProps = {
    duration: '',
    price: '',
    departureTime: '',
    oneway: '',
    roundtrip: '',
    urgentBooking: ''
};

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const [userResponse, setUserResponse] = useState(' ');
    const [flightDetails, setFlightDetails] = useState(ReturnProps);

    const handleHello = async () => {
        const botMessage = createChatBotMessage('Where would you like to go? It would be nice if you can provide me with the date and time of your departure');
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    const handleResponse = async (userInput) => {
        console.log(userInput)
        await Axios.post('http://localhost:3000/api', { message: userInput })
            .then((response) => {
                console.log(response.data)
                handleFlightDetails(response.data);
            }).catch(error => {
                console.log(error);
            });
    };


    const handleFlightDetails = (details) => {
        if(details.missingItems == undefined){
            details.forEach((detail, index) => {
                const botMessage = createChatBotMessage(`Your flight details are as follows:
                Flight number ${index + 1} I found
                Instant Ticketing Required: ${detail.instantTicketingRequired}
                Price: ${detail.price.grandTotal}
                Last Ticketing Date: ${detail.lastTicketingDate}
                Number of Bookable Seats: ${detail.numberOfBookableSeats}
                One Way: ${detail.oneWay}
                Airline Code: ${detail.validatingAirlineCodes}`);
    
                setState((prev) => ({
                    ...prev,
                    messages: [...prev.messages, botMessage],
                }));
            });
        }else{
            let botMessage = ''
            //createChatBotMessage(`Please enter more details input`);
            if(typeof details.missingItems !== "string"){
                botMessage = createChatBotMessage(`Your input missings: ${
                    details.missingItems.map(item=>item)
                }`)
            }else{
                botMessage = createChatBotMessage(`You enter a nonsense text, please try again`)
            }
            setState((prev) => ({
                ...prev,
                messages: [...prev.messages, botMessage],
            }));
        }
        
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        handleHello,
                        handleResponse,
                        handleFlightDetails
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;