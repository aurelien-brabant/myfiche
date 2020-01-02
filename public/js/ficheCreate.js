/*  */

var title = document.querySelector("#ficheTitre");
var description = document.querySelector("#ficheDescription");
var content = document.querySelector("#ficheContent");
var modalErrors = document.querySelector("#modalErrors");
var modalTitle = document.querySelector("#modalTitle");




function verifSubmit(ev)
{
  var errors = [];
  var agreeToChart = document.querySelector("#agreeChart").checked;

  if (title.value.length > 50 || title.value.length < 10)
  {
    errors.push("Le titre doit comporter <em>entre 10 et 50</em> caractères. <u>Le vôtre en contient " +title.value.length+"</u>.");
  }

  if (content.value.length < 300 || content.value.length > 25000) {
    errors.push("Le contenu de la fiche doit comporter <em>entre 300 et 25000</em> caractères. <u>Le vôtre en contient " +content.value.length+"</u>.")
  }

  if (!agreeToChart)
  {
    errors.push("Vous devez adhérer à la <a href=\"\">charte Myfiche</a> (cocher la case)");
  }

  if (errors.length != 0)
  {
    ev.preventDefault();
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

  }

}
