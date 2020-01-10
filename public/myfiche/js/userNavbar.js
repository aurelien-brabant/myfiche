function toggleUserNav()
{
	$('#sidebar').toggleClass('active');
}

let itemContent = undefined;
alert("test");

$('.vertical-nav .nav-item.link').hover(

	function(){
		itemContent = $(this).html
		$(this).html += "Is this working?"
	},

	function(){
		$(this).html = itemContent;
	}
)