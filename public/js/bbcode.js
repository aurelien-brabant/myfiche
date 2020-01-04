function addBalises(idTextarea, baliseOpen, baliseClose)
{
  //Simple
  if (baliseClose == null)
  {
    var textBefore = getTextBeforeCursor($(idTextarea).val(), $(idTextarea).prop('selectionStart'));
    var textAfter = getTextAfterCursor($(idTextarea).val(), $(idTextarea).prop('selectionStart'), $(idTextarea).val().length);
    $(idTextarea).val(textBefore+baliseOpen+textAfter);
  }
  //Double
  else
  {
    // Si la position de départ du curseur est identique à la position de fin, cela signifie qu’aucune portion de texte n’a été sélectionnée par l’utilisateur
    if ($(idTextarea).prop('selectionStart') == $(idTextarea).prop('selectionEnd'))
    {
      var textBefore = getTextBeforeCursor($(idTextarea).val(), $(idTextarea).prop('selectionStart'));
      var textAfter = getTextAfterCursor($(idTextarea).val(), $(idTextarea).prop('selectionStart'), $(idTextarea).val().length);
      $(idTextarea).val(textBefore+baliseOpen+baliseClose+textAfter);
    }
    // Sinon, nous sommes dans le cas où une portion de texte a été sélectionnée par l’utilisateur
    else
    {
      var textBefore = getTextBeforeCursor($(idTextarea).val(), $(idTextarea).prop('selectionStart'));
      var textAfter = getTextAfterCursor($(idTextarea).val(), $(idTextarea).prop('selectionEnd'), $(idTextarea).val().length);
      var textSelection = getTextSelectionCursor($(idTextarea).val(), $(idTextarea).prop('selectionStart'), $(idTextarea).prop('selectionEnd'));
      $(idTextarea).val(textBefore+baliseOpen+textSelection+baliseClose+textAfter);
    }
  }

}



function getTextBeforeCursor(text, value)
{
  var textBefore = "";
  for (var i = 0 ; i < value ; i++)
  {
    textBefore += text[i];
  }
  return textBefore;
}

function getTextAfterCursor(text, value, textSize)
{
    var textAfter = '';
    for (var i = value ; i < textSize ; i++) {
        textAfter += text[i];
    }
    return textAfter;
}

function getTextSelectionCursor(text, startValue, endValue)
{
	var textSelection = '';
	for (var i = startValue ; i < endValue ; i++) {
		textSelection += text[i];
	}
	return textSelection;
}
