

var title = document.querySelector("#ficheTitre");
var description = document.querySelector("#ficheDescription");
var content = document.querySelector("#ficheContent");
var modalErrors = document.querySelector("#modalErrors");
var modalTitle = document.querySelector("#modalTitle");
var titleLengthIndicator = document.querySelector("#titleLengthIndicator");
var contentCharCount = document.querySelector("#contentCharCount");

title.addEventListener("keyup", function(){
  if (title.value.length < 50 && title.value.length > 10)
  {
    titleLengthIndicator.classList.remove("fa-times", "bg-danger");
    titleLengthIndicator.classList.add("fa-check", "bg-success");
  }
  else {
    titleLengthIndicator.classList.add("fa-times", "bg-danger");
    titleLengthIndicator.classList.remove("fa-check", "bg-success");
  }
})


function verifSubmit(ev)
{
  var errors = [];
  var agreeToChart = document.querySelector("#agreeChart").checked;

  if (title.value.length > 50 || title.value.length < 10)
  {
    errors.push("Le titre doit comporter <em>entre 10 et 50</em> caractères. <br>( Actuellement : " +title.value.length+" )");
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
