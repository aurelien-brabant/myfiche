var title = $("#ficheTitre")[0];
var description = $("#ficheDescription")[0];
var content = $("#ficheContent")[0];
var modalErrors = $("#modalErrors")[0];
var modalTitle = $("#modalTitle")[0];
var titleLengthIndicator = $("#titleLengthIndicator")[0];
var contentCharCount = $("#contentCharCount")[0];





/********************* EVENT LISTENERS *********************/


/* Prevents form submission when using enter key */

$('input').keydown(function(event){

	if (event.which == 13) 
	{
		event.preventDefault();
	}
})

/* Image field live update - update is on change and not on keyup to avoid excessive requesting */

$("#ficheImage").change(function(){
	console.log("e");
	$("#ficheImagePreview").attr("src", $(this).val());
})

/* Character count live update + advice if too short/long */

$('#ficheContent').keyup(function(){

	if (this.value.length < 300 || this.value.length > 25000)
		$('#contentCharCount').css("color", "red");
	else 
		$('#contentCharCount').css("color", "green");

	$('#contentCharCount').text($(this).val().length);
})



/********************* FRONT END SUBMIT VERIFICATION *********************/

$("#UI-save-content").click(function(){
	verif(null);
})

$("#editPublish").click(function(){

	verif("publish");
})

$("#selectCategory").change(function(){
	editFiche("changeCategory");
})

$("#changeVisibility").click(function(){
	if ($(this).hasClass("btn-success"))
	{
		$(this).removeClass("btn-success")
		$(this).addClass("btn-danger")
		$(this).children().removeClass("fa-eye")
		$(this).children().addClass("fa-eye-slash")
		return editFiche("turnInvisible")
	}

	else if ($(this).hasClass("btn-danger"))
	{
		$(this).removeClass("btn-danger")
		$(this).addClass("btn-success")
		$(this).children().removeClass("fa-eye-slash")
		$(this).children().addClass("fa-eye")
		return editFiche("turnVisible")
	}
})



function verif(method)
{
	if (method === null)
		return editFiche("currentSave");

	if (method === "publish")
	{
		let ficheTitleLen	 = $("#ficheTitle").val().length,
		ficheContentLen		 = $("#ficheContent").val().length,
		agreeToChart		 = $('#agreeChart').prop('checked');

		var errors = [];

		if (ficheTitleLen > 150 || ficheTitleLen < 10)
			errors.push("Le titre doit comporter <em>entre 10 et 100</em> caractères. <br>( Actuellement : " +ficheTitleLen+" )");

		if (ficheContentLen < 300 || ficheContentLen > 25000) 
			errors.push("Le contenu de la fiche doit comporter <em>entre 300 et 25000</em> caractères. <br>( Actuellement : " +ficheContentLen+" )");

		if (!agreeToChart)
			errors.push("Vous devez adhérer à la <a href=\"\">charte Myfiche</a> (cocher la case)");

		if (errors.length != 0)
		{

			var builtString = "";
			errors.forEach(function(err){
				builtString += err + "<br><br>";
			});
			$("#modalTitle").parent().addClass("bg-danger");
			var plurial = errors.length === 1 ? "" : "s"
			modalTitle.innerHTML = "<strong>" + errors.length + "</strong> erreur" +plurial + " lors de l'envoi de la fiche.";
			modalErrors.innerHTML = builtString;
			$('#verifModal').modal("show");

			return;
		}
		else
		{
			return editFiche("publish");
		}
	}

}



/********************* AUTO SAVE *********************/


const methodAlert = {
		currentSave: {
			text: 'Sauvegarde effectuée.',
			type: 'info'
		},
		publish: {
			text: 'Publication effectuée avec succès !',
			type: 'success' 
		},
		changeCategory: 
		{
			text: 'Categorie modifiee.',
			type: 'success'
		},
		turnVisible:
		{
			text: "La fiche est maintenant visible.",
			type: "success"
		},
		turnInvisible:
		{
			text: "La fiche est maintenant invisible",
			type: "danger"
		}
	}

function editFiche(method)
{
	var path;
	// Getting data from form's fields

	path = window.location.pathname;
	path = path.substr(0, path.lastIndexOf("/"));
	
	const data = {
		fiche: {
			title: $('#ficheTitle').val(),
			description: $('#ficheDescription').val(),
			image: $('#ficheImage').val(),
			content: $('#ficheContent').val()
		},
		selectCategory: $('#selectCategory').val()
	}

	// Posting it
	$.post(path+"?method="+method, data, function(data, status){
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


setInterval(function(){ editFiche('currentSave'); }, 20 * 1000);








