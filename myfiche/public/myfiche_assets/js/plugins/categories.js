/* Every JS stuff which belongs to the categories page  */

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
		window.location.href = 'categories/' +$(this).parent().parent().parent().parent().parent().attr('id')+ '/fiches/'+$(this).attr('id');
		e.stopPropagation();
});

