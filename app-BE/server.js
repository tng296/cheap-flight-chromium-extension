const cors = require("cors")
const express = require("express")
const chatGPT = require("./askChatGPT")
const Amadeus = require('amadeus')
const bodyParser = require("body-parser")
require("dotenv").config()
const app = express()
const port = process.env.PORT

//set up with express
app.use(bodyParser.json())
app.use(cors())

var amadeus = new Amadeus({
    clientId: 'UPXhjTFuFEbCwgKnTeznhykO5qMAYjBH',
    clientSecret: '011buGaGYGI9xDpd'
});

app.get("/",(req,res)=>{
   res.send("hello world")
})

app.post("/api", async (req,res)=>{
    let message = req.body.message
    let response = await chatGPT(message)
    
    if(response != "nonsense"){
        response = JSON.parse(response)
        console.log(response)
    }

    //Important originLocationCode, destinationLocationCode, depatureDate, adults,  
    if(response.originLocationCode == "" || response.destinationLocationCode == "" || response.departureDate == "" || response.adults == ""){
        res.send("Missing important information please redo")
    }else if(response == "nonsense"){
        res.send("nonsense message please input again")
    }else{
        amadeus.shopping.flightOffersSearch.get({
            originLocationCode: response.originLocationCode,
            destinationLocationCode: response.destinationLocationCode,
            departureDate: response.departureDate,
            returnDate:response.returnDate, 
            adults: Number(response.adults),
            children: response.chilren == '' ? 0 : Number(response.children),
            infants: response.infants == '' ? 0 : Number(response.infants),
            nonStop:true,
            max:5
        }).then(function(response){
            res.send(response.data);
        }).catch(function(responseError){
            console.log(responseError.code);
        });
    }
    
})

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})