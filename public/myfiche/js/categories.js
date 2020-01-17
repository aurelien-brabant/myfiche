$('.category').click(function(){
	window.location.href = '/categories/' + $(this).attr('id') + '/fiches';
})

$('.categoryDropdownIcon').click(function(e){

	let categoryID = $(this).parent().parent().parent().attr('id');

	if ($('#dd_' +categoryID).is(':hidden'))
	{
		$('#dd_' +categoryID).slideDown(300);
	}
	else 
	{
		$('#dd_' +categoryID).slideUp(300);
	}


	$('#tdd_'+categoryID).toggleClass('animated-to-down')
	$('#tdd_'+categoryID).toggleClass('animated-to-up')
	$('#tdd_' +categoryID).children().toggleClass('fa-chevron-down');
	$('#tdd_' +categoryID).children().toggleClass('fa-chevron-up');

	e.stopPropagation();

})

$('.best-rated-item').click(function(e){
	window.location.href = '/fiches/'+$(this).attr('id');
	e.stopPropagation();
});

$('#searchCategory').keyup(function(e){

	let inputVal = $(this).val().toLowerCase();

	$('.category .categoryTitle').each(function(){
		let title = $(this).text().toLowerCase();
		if (title.includes(inputVal))
		{
			$(this).parent().parent().parent().parent().show();
		}
		else
		{
			$(this).parent().parent().parent().parent().fadeOut(1000);
		}
	});
});