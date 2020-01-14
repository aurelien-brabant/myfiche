

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



