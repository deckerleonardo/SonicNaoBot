var Twit = require('twit');

require('dotenv').config();


/* Instancie o bot com as chaves no arquivo .env */
const T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60 * 1000,
});

console.log('Este bot está rodando...');

/* BotInit() : Para iniciar o bot */
function BotInit() {
	var query = {
		q: "#nummedirigeapalavra",
		result_type: "recent"
  }

  T.get('search/tweets', query, BotGotLatestTweet);
  console.log('CHEGOOOOOOOOOUUUUU')

	function BotGotLatestTweet (error, data, response) {
		if (error) {
			console.log('Bot não pôde achar o último tweet, : ' + error);
		} else {
 
      /* Caso nenhum erro tenha ocorrido ele procura pelo id do tweet e da reply com a frase informada */
      for (var i = 0; i < data.statuses.length; i++) {

        var userHandle = data.statuses[i].user.screen_name;
      

        var textToReply = "Num me dirige a palavra nao. Faz favor.";
        textToReply = "Ow, @" + userHandle + ". " + textToReply;
 

        T.post( 'statuses/update', {status: textToReply, in_reply_to_status_id: data.statuses[i].id_str}, function( err, data, response ){
        console.log( data );
        });   
    }
  }
	}
}

/* Inicia o bot */
BotInit();