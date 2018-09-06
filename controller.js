const axios = require('axios');
const watsonConfig = require('./watson-config')
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1');
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2018-03-16',
  username: watsonConfig.username,
  password: watsonConfig.password,
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api'
});

const handleNumber = (req, res, next) => {
  const number = parseInt(req.params.number);
  // if (/^\d+$/.test(number)) {
  //   res.send({msg: `Your number is ${number}`})
  // } else {
  //   res.send({msg: `${req.params.number} is not a valid number!`})
  // }

  axios.get(`http://numbersapi.com/${number}`)
  .then(function (response) {
    console.log(response.data);
    var parameters = {
      'text': response.data,
      'features': {
        'keywords': {
          'emotion': false,
          'sentiment': false,
          'limit': 5
        }
      }
    }
    naturalLanguageUnderstanding.analyze(parameters, function(err, response) {
      if (err)
        console.log('error:', err);
      else
        console.log(JSON.stringify(response, null, 2));
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

module.exports = handleNumber;