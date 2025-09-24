//Takes PDF and sends it alongside instructions to OpenAI API
require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI(process.env.OPENAI_API_KEY);

//using axios
const axios = require('axios');
axios.post('https://api.openai.com/v1/engines/davinci-codex/completions',
    {
        prompt: 'Return the following PDF content as a summary using standard crochet notation',
        max_tokens: 60
    },
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
    })
    .then(response => {
        console.log(response.data.choices[0].text.strip());
    })
    .catch(error => {
        console.error(error);
    });