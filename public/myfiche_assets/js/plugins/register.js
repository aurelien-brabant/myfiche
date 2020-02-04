let passwordRules =
{
	minLength: 8,
	maxLength: 30,
	mustIncludeLowercase: true,
	mustIncludeUppercase: true,
	mustIncludeSpecialChar: false
}

let messages =
{
	passwordIncorrectLength: "Le mot de passe doit comporter entre " +passwordRules.minLength+ " et " +passwordRules.maxLength+  " caractères.",
	mustIncludeLowercase: "Le mot de passe doit contenir au moins une lettre en minuscule",
	mustIncludeUppercase: "Le mot de passe doit contenir au moins une lettre en majuscule"
}
function containsLowercase(password)
{
	return password.toUpperCase() != password;
}

$("#passwordAlert").hide();
$("#passwordMatchAlert").hide();
$("#submitRegister").css("opacity", "0.5");

function containsLowercase(password)
{
	return password.toUpperCase() != password;
}

function containsUppercase(password)
{
	return password.toLowerCase() != password;
}

function verifSubmit()
{
	let passwordVal = $("#password").val();
	let passValidationVal = $("#passwordValidation").val();
	if (passwordVal.length >= passwordRules.minLength
		&& passwordVal.length <= passwordRules.maxLength)
	{
		if (passwordRules.mustIncludeLowercase && !containsLowercase(passwordVal))
			return false;
			
		if (passwordRules.mustIncludeUppercase && !containsUppercase(passwordVal))
			return false;

		return true;
	}
	return false;
}

$("#registerForm").submit(function(event)
{
	if (!verifSubmit())
	{
		$.notify({
				// options
				message: "Il semblerait que certaines de vos informations ne soient pas valides. Vérifiez bien que vous n'avez pas d'alertes."
			},{
				// settings
				type: "danger"
			});
		event.preventDefault();
	}
})







$("#password").keyup(function(){
	let passwordVal = $(this).val();
	let passwordAlert = $("#passwordAlert")
	let submitBtn = $("#submitRegister")


	if (passwordVal.length < passwordRules.minLength || passwordVal.length > passwordRules.maxLength)
	{
		passwordAlert.text(messages.passwordIncorrectLength);
		passwordAlert.fadeIn();
		submitBtn.css("opacity", "0.5");
	}
	else if (passwordRules.mustIncludeLowercase && !containsLowercase(passwordVal))
	{
		passwordAlert.text(messages.mustIncludeLowercase);
		passwordAlert.fadeIn();
		submitBtn.css("opacity", "0.5");
	}
	else if (passwordRules.mustIncludeUppercase && !containsUppercase(passwordVal))
	{
		passwordAlert.text(messages.mustIncludeUppercase);
		passwordAlert.fadeIn();
		submitBtn.css("opacity", "0.5");
	}
	else
	{
		passwordAlert.hide();
		submitBtn.css("opacity", "1.0");
	}
})

$("#passwordValidation").keyup(function(){
	let passValidationVal = $(this).val();
	let passwordVal = $("#password").val();
	let submitBtn = $("#submitRegister")
	let alert = $("#passwordMatchAlert");

	if (passValidationVal !== passwordVal)
	{
		alert.fadeIn();
		submitBtn.css("opacity", 0.5);
	}
	else 
	{
		alert.fadeOut();
		submitBtn.css("opacity", 1.0);
	}

})

$("#showPassword").click(function(){
	if ($(this).hasClass("fa-eye"))
	{
		$(this).removeClass("fa-eye");
		$(this).addClass("fa-eye-slash");
		$("#password").attr("type", "text");
		$("#passwordValidation").attr("type", "text");
	}	
	else if ($(this).hasClass("fa-eye-slash"))
	{
		$(this).removeClass("fa-eye-slash");
		$(this).addClass("fa-eye");
		$("#password").attr("type", "password");
		$("#passwordValidation").attr("type", "password");
	}
})

