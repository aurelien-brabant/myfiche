let commentFormFields = 
[
	{
		fieldSelector: '#commentTitle',
		minCC: 10,
		maxCC: 50
	},

	{
		fieldSelector: '#commentContent',
		minCC: 30,
		maxCC: 300
	},
]

initializeCheckLengthListeners(commentFormFields);
initializeFormSubmitVerification('#addCommentForm', '#commentAgreeChart', commentFormFields);

function addCheckLength(selector, minAmount, maxAmount)
{
	$(selector).keydown(function(event){

		if (event.which == 13)
		{
			event.preventDefault();
		}
		if (!maxAmount) { maxAmount = 0; }

		let currValLength = $(this).val().length;

		if (currValLength < minAmount || currValLength > maxAmount)
		{
			$(this).css('color', 'red');
		}
		else 
		{
			$(this).css('color', 'green');
		}
	})
}

function initializeCheckLengthListeners(formFieldsObjectArray)
{
	for (field of formFieldsObjectArray)
	{
		addCheckLength(field.fieldSelector, field.minCC, field.maxCC);
	}
}

function initializeFormSubmitVerification(formId, agreeChartCheckboxId, fields){

	$(formId).submit(function(ev){
		for (field of fields)
		{
			fieldVal = $(field.fieldSelector).val().length

			if (fieldVal < field.minCC || fieldVal > field.maxCC || !$(agreeChartCheckboxId).prop("checked"))
			{	
				ev.preventDefault();
				$.notify({
		            message: 'Erreur : Vérifiez que les champs remplis sont corrects et que la case "J\'adhère à la charte myfiche" est cochée.'
		              
		        },{
		            // settings
		            type: 'danger'
		        });
				return false;
			}

		}
	})
}
