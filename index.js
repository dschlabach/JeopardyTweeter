const Twitter = require('twit');
const axios = require('axios');

const config = {
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_SECRET
};

const T = new Twitter(config);

async function fetchQuestion() {
  const req = await axios.get("http://jservice.io/api/random");
  const question = req.data[0]
  return question
}

function titleCase(str) {
  console.log("STR:", str)
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       // You do not need to check if i is larger than splitStr length, as your for does that for you
       // Assign it back to the array
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   // Directly return the joined string
   return splitStr.join(' '); 
}

async function postTweet() {
  const q = await fetchQuestion();

  const titleFormatted = await titleCase(q.category.title);

  const answerCapitalized = q.answer.charAt(0).toUpperCase() + q.answer.slice(1)

  console.log(q)

  T.post('statuses/update', { status: `${titleFormatted}\n\n${q.question} \n.\n.\n.\n.\n.\n.\n.\n.\n\n${answerCapitalized}` }, function(err, data, response) {
    console.log(data)
  })

}

postTweet();
