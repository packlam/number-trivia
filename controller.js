const axios = require('axios');
const giphyAPIkey = require('./giphy-config')

// watson setup
const watsonConfig = require('./watson-config')
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1');
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2018-03-16',
  username: watsonConfig.username,
  password: watsonConfig.password,
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api'
});

const handleNumber = (req, res, next) => {
  const number = parseInt(req.query.number);

  axios.get(`http://numbersapi.com/${number}`)
    .then(function (responseTrivia) {
      var parameters = {
        'text': responseTrivia.data,
        'features': {
          'keywords': {
            'emotion': false,
            'sentiment': false,
            'limit': 5
          }
        }
      }
      naturalLanguageUnderstanding.analyze(parameters, function(error, responseWatson) {
        if (error) {
          console.log({error, msg: 'Error getting data from Watson'});
        } else {
          const giphyKeyword = responseWatson.keywords[0].text;
          console.log(giphyKeyword);
          axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${giphyAPIkey}&q=${giphyKeyword}&limit=1`)
            .then(responseGiphy => {
              console.log(responseGiphy.data.data[0].images.fixed_width.url);
              const dataToRender = {
                number,
                fact: responseTrivia.data,
                keyword: responseWatson.keywords[0].text,
                gifURL: responseGiphy.data.data[0].images.fixed_width.url
              }
              res.render('display', { dataToRender });
            })
            .catch(error => {
              console.log({error, msg: 'Error getting data from Giphy'})
            })
        }
    });
  })
  .catch(function (error) {
    console.log({error, msg: 'Error getting data from Numbers API'});
  });
}

module.exports = handleNumber;