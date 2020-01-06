module.exports =
  class fetcher {

    constructor()
    {
      this.rp = require('request-promise');
    }

    fetchAll(callback){
      console.log("Fetching data from myfiche...");

      this.rp('https://myfiche.fr/api/service.php?apikey=myfiche_apikey&all=1')
      .then((body) => {
        var parsed = JSON.parse(body);
        callback(parsed);
      })

      .catch((err) => {
      });
    }

  }
