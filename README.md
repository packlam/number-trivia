# number-trivia

**Number Trivia** is a simple [EJS](https://ejs.co/) app that takes a user-provided number as input, and fetches a piece of trivia associated with that number, before feeding the trivia through a Natural Language Processing engine, extracting the 'top' keyword, and fetching an animated GIF for that keyword to display alongside the trivia.

The app makes use of:

* The [Numbers API](http://numbersapi.com/)
* IBM's [Natural Language Understanding](https://console.bluemix.net/apidocs/natural-language-understanding) platform
* The [Giphy Search API](https://developers.giphy.com/docs/)
