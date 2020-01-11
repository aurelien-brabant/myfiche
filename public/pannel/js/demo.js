


function showNotif(action, p1, p2)
{
    var message = undefined;
    var type = undefined;

    if (action === "toggleHide") 
    {
        if (p1)
        {
            if (p1 === "false")
            {
                message = "Fiche \"" +p2 + "\" désormais visible."
                type = "success";
            }
            else if (p1 === "true") {
                message = "Fiche \"" +p2 + "\" désormais invisible."
                type = "danger";
            }
        }
    }

    else if (action === "delete")
    {
        message = "La fiche a bien été supprimée.";
        type = "danger";
    }

    if (action && type)
    {

        $.notify({
            // options
            message: message
        },{
            // settings
            type: type
        });

    }

    


}



