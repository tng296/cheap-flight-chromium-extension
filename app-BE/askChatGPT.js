const OpenAI = require("openai")
const openai = new OpenAI({
  apiKey: ``, // This is the default and can be omitted
});

async function chatGPT(message) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: `Here is the message: ${message}. From this message please generate a JSON {
        "originLocationCode": "",
        "destinationLocationCode": "",
        "departureDate": "",
        "returnDate": "",
        "adults": "",
        "children": "",
        "infants": "",
        "travelClass": "",
        "includedAirlineCodes": "",
        "excludedAirlineCodes": "",
        "nonStop": "",
        "currencyCode": "",
        "maxPrice": "",
        "max": ""
      }. If the message do not provided enough data, leave those key value as "". Do not use current time to fill the JSON. If the message is nonsense, you just need to response a string "nonsense". Notice, city/aiport/location/airlines must results in IATA code` }],
    model: 'gpt-3.5-turbo',
  });

  return chatCompletion.choices[0].message.content
}


module.exports = chatGPT
