const Amadeus = require('amadeus')

var amadeus = new Amadeus({
    clientId: 'UPXhjTFuFEbCwgKnTeznhykO5qMAYjBH',
    clientSecret: '011buGaGYGI9xDpd'
});

const callAmadeus = ()=>{
    

    amadeus.shopping.flightOffersSearch.get({
        originLocationCode: 'SYD',
        destinationLocationCode: 'BKK',
        departureDate: '2024-06-02',
        returnDate:"2024-06-07",
        adults: 2,
        children: 0,
        infants: 0,
        includedAirlineCodes:'',
        nonStop:true,
        max:5
    }).then(function(response){
        console.log(response.data);
    }).catch(function(responseError){
        console.log(responseError.code);
    });
}

callAmadeus()

module.exports = callAmadeus

