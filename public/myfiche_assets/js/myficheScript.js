/*=========================================================================================*/
/*                                                                                         */
/*                                 ~ MYFICHE J.S 1.0 ~                                     */
/*               All scripts used on the website are grouped in this single file           */
/*                                                                                         */
/*=========================================================================================*/

let author = 'Aurelle',
    version = '1.0',
    dependencies = [
    	'jQuery',
    	'Bootstrap_4'
    ]

/*=========================================================================================*/
/*                                                                                         */
/*                               ~ SEARCH ENGINES ~                                        */
/*                 All the systems that are performing dynamic search                      */
/*=========================================================================================*/

function initializeFicheSearch()
{

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
}

function initializeCategoriesSearchEngine()
{

	$('#searchCategory').keyup(function(e){

		let inputVal = $(this).val().toLowerCase();

		$('.category .categoryTitle').each(function(){
			let title = removeAccents($(this).text().toLowerCase());
			if (title.includes(inputVal))
			{
				$(this).parent().parent().parent().parent().show();
			}
			else
			{
				$(this).parent().parent().parent().parent().fadeOut(1000);
			}
		});
	});

}


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



/*=========================================================================================*/
/*                                                                                         */
/*                               ~ CATEGORIES ~                                            */
/*                                                                                         */
/*=========================================================================================*/


// categories view must call the method defined below
function initializeCategories()
{

	$('.category').click(function(){
		window.location.href = '/categories/' + $(this).attr('id') + '/fiches';
	})

	$('.categoryDropdownIcon').click(function(e){

		let categoryID = $(this).parent().parent().parent().attr('id');

		if ($('#dd_' +categoryID).is(':hidden'))
		{
			$('#dd_' +categoryID).slideDown(300);
		}
		else 
		{
			$('#dd_' +categoryID).slideUp(300);
		}


		$('#tdd_'+categoryID).toggleClass('animated-to-down')
		$('#tdd_'+categoryID).toggleClass('animated-to-up')
		$('#tdd_' +categoryID).children().toggleClass('fa-chevron-down');
		$('#tdd_' +categoryID).children().toggleClass('fa-chevron-up');

		e.stopPropagation();

	})

	$('.best-rated-item').click(function(e){
		window.location.href = 'categories/' +$(this).parent().parent().parent().parent().parent().attr('id')+ '/fiches/'+$(this).attr('id');
		e.stopPropagation();
	});

}


/*=========================================================================================*/
/*                                                                                         */
/*                                    ~ BBCode ~                                           */
/*                                                                                         */
/*=========================================================================================*/

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

/*=========================================================================================*/
/*                                                                                         */
/*                                 ~ FicheComments ~                                       */
/*                                                                                         */
/*=========================================================================================*/

function initializeFicheComments()
{
	let commentFormFields = 
	[
		{
			fieldSelector: '#commentTitle',
			minCC: 10,
			maxCC: 50
		},

		{
			fieldSelector: '#commentContent',
			minCC: 30,
			maxCC: 300
		},
	]

	initializeCheckLengthListeners(commentFormFields);
	initializeFormSubmitVerification('#addCommentForm', '#commentAgreeChart', commentFormFields);

}




function addCheckLength(selector, minAmount, maxAmount)
{
	$(selector).keydown(function(event){

		if (event.which == 13)
		{
			event.preventDefault();
		}
		if (!maxAmount) { maxAmount = 0; }

		let currValLength = $(this).val().length;

		if (currValLength < minAmount || currValLength > maxAmount)
		{
			$(this).css('color', 'red');
		}
		else 
		{
			$(this).css('color', 'green');
		}
	})
}

function initializeCheckLengthListeners(formFieldsObjectArray)
{
	for (field of formFieldsObjectArray)
	{
		addCheckLength(field.fieldSelector, field.minCC, field.maxCC);
	}
}

function initializeFormSubmitVerification(formId, agreeChartCheckboxId, fields){

	$(formId).submit(function(ev){
		for (field of fields)
		{
			fieldVal = $(field.fieldSelector).val().length

			if (fieldVal < field.minCC || fieldVal > field.maxCC || !$(agreeChartCheckboxId).prop("checked"))
			{	
				ev.preventDefault();
				$.notify({
		            message: 'Erreur : Vérifiez que les champs remplis sont corrects et que la case "J\'adhère à la charte myfiche" est cochée.'
		              
		        },{
		            // settings
		            type: 'danger'
		        });
				return false;
			}

		}
	})

}


/*=========================================================================================*/
/*                                                                                         */
/*                                 ~ Main Navbar ~                                         */
/*                    Navbar used most of the time, except in pannel                      */
/*=========================================================================================*/

$(function () {
    $(document).scroll(function () {
        var $nav = $("#mainNavbar");
        $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    });
});

/*=========================================================================================*/
/*                                                                                         */
/*                                 ~ Fiche create ~                                        */
/*                                                                                         */
/*=========================================================================================*/

function initializeFichesNew()
{

var title = document.querySelector("#ficheTitre");
var description = document.querySelector("#ficheDescription");
var content = document.querySelector("#ficheContent");
var modalErrors = document.querySelector("#modalErrors");
var modalTitle = document.querySelector("#modalTitle");
var titleLengthIndicator = document.querySelector("#titleLengthIndicator");
var contentCharCount = document.querySelector("#contentCharCount");


$('input').keydown(function(event){

  if (event.which == 13) 
  {
    event.preventDefault();
  }
})




function verifSubmit(method)
{

  if (method === 'no')
  {
    return editFiche('currentSave');
  }

  var errors = [];

  var agreeToChart = $('#agreeChart').prop('checked');


  if (title.value.length > 150 || title.value.length < 10)
  {
    errors.push("Le titre doit comporter <em>entre 10 et 100</em> caractères. <br>( Actuellement : " +title.value.length+" )");
  }


  if (content.value.length < 300 || content.value.length > 25000) {
    errors.push("Le contenu de la fiche doit comporter <em>entre 300 et 25000</em> caractères. <br>( Actuellement : " +content.value.length+" )")
  }

  if (!agreeToChart)
  {
    errors.push("Vous devez adhérer à la <a href=\"\">charte Myfiche</a> (cocher la case)");
  }



  if (errors.length != 0)
  {
    
    var builtString = "";
    errors.forEach(function(err){
      builtString += err + "<br><br>";
    });
    modalTitle.parentNode.classList.add("bg-danger");
    var plurial = errors.length === 1 ? "" : "s"
    modalTitle.innerHTML = "<strong>" + errors.length + "</strong> erreur" +plurial + " lors de l'envoi de la fiche.";
    modalErrors.innerHTML = builtString;
    $('#verifModal').modal("show");

    return;
  }

  else {
    editFiche('publish');
  }

}

var UIContentSizePlus = document.querySelector("#UI-plus-content")
var UIContentSizeMinus = document.querySelector("#UI-minus-content")
var UIContentSizeReset = document.querySelector("#UI-reset-content")
var UIContentDelete = document.querySelector("#UI-delete-content")

let contentDefHeight = 300;
var contentHeight = contentDefHeight;

UIContentSizePlus.addEventListener("click", function(){
  content.style.height = String(contentHeight = contentHeight + 50) + "px";
})
UIContentSizeMinus.addEventListener("click", function(){
  if (contentHeight > 250)
  {
    content.style.height = String(contentHeight = contentHeight - 50) + "px";
  }
})

UIContentSizeReset.addEventListener("click", function(){
  content.style.height = String(contentDefHeight) + "px";
  contentHeight = contentDefHeight;
});

UIContentDelete.addEventListener("click", function(){

  if (this.style.opacity == 1.0)
  {
    $('#confirmDelete').modal("show");
  }

});

function deleteContent()
{
  content.value = "";
  UIContentDelete.style.opacity = 0.5;
}

content.addEventListener("keyup", function(){
  if (this.value.length === 0) {

    UIContentDelete.style.opacity = 0.5;
  }
  else
  {
    UIContentDelete.style.opacity = 1;
  }

  if (this.value.length < 300 || this.value.length > 25000)
  {
    contentCharCount.style.color = "red";
  }
  else {
    contentCharCount.style.color = "green";
  }

  contentCharCount.textContent = this.value.length;
})

}

/*=========================================================================================*/
/*                                                                                         */
/*                                 ~ Editor AutoSave ~                                     */
/*                                                                                         */
/*=========================================================================================*/

function initializeAutoSave()
{
	const urlParams = new URLSearchParams(window.location.search);
	const ficheID = urlParams.get('edit');

	const URL = 'http://localhost:3000/fiches/' +ficheID + "?action=currentSave" ;

	const methodAlert = {
		currentSave: {
			text: 'Sauvegarde effectuée.',
			type: 'info'
		},
		publish: {
			text: 'Publication effectuée avec succès !',
			type: 'success' 
		},
	}




	setInterval(function(){ editFiche('currentSave'); }, 20000);

}




function editFiche(method)
{
	// Building URL to post on 
	const URL = 'http://localhost:3000/fiches/' +ficheID + "?method=" + method ;

	// Getting data from form's fields
	const data = {
		fiche: {
				title: $('#ficheTitre').val(),
				description: $('#ficheDescription').val(),
				image: $('#ficheImage').val(),
				content: $('#ficheContent').val()
		}
	}

	// Posting it
	$.post(URL, data, function(data, status){
		if (status) 
		{
			$.notify({
	            // options
	            message: methodAlert[method].text
	        },{
	            // settings
	            type: methodAlert[method].type
	        });
		}
	})

}






