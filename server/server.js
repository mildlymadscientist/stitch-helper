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

//from https://stackoverflow.com/questions/40635979/how-to-correctly-extract-text-from-a-pdf-using-pdf-js

function gettext(pdfUrl) {
    var pdf = pdfjsLib.getDocument(pdfUrl);
    return pdf.then(function (pdf) { // get all pages text
        var maxPages = pdf.pdfInfo.numPages;
        var countPromises = []; // collecting all page promises
        for (var j = 1; j <= maxPages; j++) {
            var page = pdf.getPage(j);

            var txt = "";
            countPromises.push(page.then(function (page) { // add page promise
                var textContent = page.getTextContent();
                return textContent.then(function (text) { // return content promise
                    return text.items.map(function (s) { return s.str; }).join(''); // value page text 
                });
            }));
        }
        // Wait for all pages and join text
        return Promise.all(countPromises).then(function (texts) {
            return texts.join('');
        });
    });
}

// waiting on gettext to finish completion, or error
gettext("https://cdn.mozilla.net/pdfjs/tracemonkey.pdf").then(function (text) {
    alert('parse ' + text);
},
    function (reason) {
        console.error(reason);
    });