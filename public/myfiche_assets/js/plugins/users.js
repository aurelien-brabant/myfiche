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
