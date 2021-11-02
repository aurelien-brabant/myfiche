$("#categorySelect").change(function(){
	$("#submitNewForm").attr("action", "/categories/" + $(this).val() + "/fiches"); 
})