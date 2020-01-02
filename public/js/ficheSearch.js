var searchInput = document.querySelector("#searchInput");
var fiches = document.querySelectorAll(".card-title");

searchInput.addEventListener("keyup", function(){
  var searchValue = this.value.toLowerCase();

  for (var i = 0; i < fiches.length ; i++)
  {
    var ficheTitle = fiches[i].textContent.toLowerCase();
    ficheTitle = RemoveAccents(ficheTitle);

    if (!ficheTitle.includes(searchValue))
    {
      fiches[i].parentNode.parentNode.parentNode.classList.add("d-none");
      fiches[i].parentNode.parentNode.parentNode.classList.remove("d-flex");
    }
    else {
      fiches[i].parentNode.parentNode.parentNode.classList.remove("d-none");
      fiches[i].parentNode.parentNode.parentNode.classList.add("d-flex");
    }
  }

})


/* Took from https://gist.github.com/alisterlf/3490957 */
function RemoveAccents(strAccents) {
  var strAccents = strAccents.split('');
  var strAccentsOut = new Array();
  var strAccentsLen = strAccents.length;
  var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
  var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
  for (var y = 0; y < strAccentsLen; y++) {
  	if (accents.indexOf(strAccents[y]) != -1) {
  		strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
  	} else
  		strAccentsOut[y] = strAccents[y];
  }
  strAccentsOut = strAccentsOut.join('');
  return strAccentsOut;
}
