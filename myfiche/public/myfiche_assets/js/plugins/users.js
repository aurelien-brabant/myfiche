$("#avatarList").hide();

$("#changeAvatar").click(function(){
	if ($(this).text() === "Changer d'avatar")
	{
		$("#avatarList").fadeIn();
		$(this).text("Ne pas changer") 
	}
	else if ($(this).text() === "Ne pas changer")
	{
		$("#avatarList").fadeOut();
		$(this).text("Changer d'avatar")
	}
})

$("#avatarList img").click(function(){
	

	var path;
	// Getting data from form's fields
	path = window.location.pathname;


	let choosenAvatar = $(this)

	const data = {
		avatarId: $(this).attr("id")
	}
	// Posting it
	$.post(path+"/editAvatar", data, function(data, status){
		if (status) 
		{
			$.notify({
				// options
				message: "Avatar modifié !"
			},{
				// settings
				type: "success"
			});
		
		let temp = choosenAvatar.attr("src")
		choosenAvatar.attr("src", $("#currentUserAvatar").attr("src"))
		$("#currentUserAvatar").attr("src", temp)
			 
		}
	})
	
})
