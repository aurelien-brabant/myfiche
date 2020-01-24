/* 
 ** This search engine works using dedicated classes that must be correctly included in the HTML page.
 ** .searchEngineInputField must be applied to every input that must trigger search process.
 ** .searchEngineTargetBlock must be applied to block that will see its visibility toggled
 ** .searchEngineTargetField must be applied to any child of searchEngineTargetBlock that will be used for search
*/

/* Took from https://gist.github.com/alisterlf/3490957 */
function removeAccents(strAccents) {
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

function initSearchEngine()
{

	$(".searchEngineInputField").keyup(function(){
		let searchValue = $(this).val();

		$(".searchEngineTargetBlock").each(function(){
				
			var fieldValues = [];
			fieldValues.push( removeAccents( $(this).find(".searchEngineTargetField").text().toLowerCase() ) );
		
			for (fieldValue of fieldValues)
			{
				if (fieldValue.includes(searchValue))
				{
					$(this).show();
				}
				else 
				{
					$(this).fadeOut();
				}
			}
		});
	});
}

initSearchEngine();
