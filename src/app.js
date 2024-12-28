var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();
const API_KEY = process.env.API_KEY;

async function analyzeSentiment(text) {
    try {
      const response = await axios.post(
        'https://api.meaningcloud.com/sentiment-2.1',
        new URLSearchParams({
          key: API_KEY, //  API key
          lang: 'en',   // Language of the text (e.g., 'en' for English)
          url: text,    // The text to analyze
        })
      );
  
        const data = response.data;
  
      if (data.status.code === '0') {
        console.log('Sentiment Analysis Result:', data);
        return data; // For example, it could be 'P+' (strong positive), 'N' (negative), etc.
      } else {
        console.error('Error in API response:', data.status.msg);
      }
    } catch (error) {
      console.error('Error during API call:', error.message);
    }
  }


const app = express();
app.use(express.static('public'))

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

//console.log(__dirname);
//console.log(API_KEY);



app.get('/test', function (req, res) {
    res.send("This is the server API page, you may access its services via the client app.");
});


// POST Route

app.post('/analyze-sentiment', async (req, res) => {
    const text  = req.body.msg;
    //console.log("posted data to server");
    //console.log(text);
    const data = await analyzeSentiment(text);
    //console.log(data);
    res.send(data);
});

// Designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});







