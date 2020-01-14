const urlParams = new URLSearchParams(window.location.search);
const ficheID = urlParams.get('edit');
console.log('eee')
console.log(ficheID);
console.log('eee')
console.log('eee')

const URL = 'localhost:3000/fiches/' +ficheID ;
const ficheData = {
	title: $('#ficheTitre').val(),
	description: $('#ficheDescription').val(),
	image: $('#ficheImage').val(),
	content: $('#ficheContent').val()
}


$('#UI-save-content').click(function(){
	console.log(ficheData);
})