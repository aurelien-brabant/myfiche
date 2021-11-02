$("#toggleInfolist").click(function(){
	if ($("#navbar").hasClass("d-none"))
	{
		$("#navbar").removeClass("d-none");
		$("#navbar").addClass("d-block");
	}
	else 
	{
		$("#navbar").addClass("d-none");
		$("#navbar").removeClass("d-block");
	}
})
