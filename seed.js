var myficheDB = require('./myfiche-db'),
    passport = require('passport'),
    User = require('./models/user')




let seeds = [

{
	publishedContent: {
		title: "Comment adorer un chat",
		description: "Adorer un chat, c'est vraiment pas simple. Du coup, voici quelques astuces !",
		content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
		image: "https://www.itl.cat/pngfile/big/2-21112_cute-cat-wallpaper-cat.jpg"
	},
	rating: {
		up: 54,
		down:10
	}

},
{
	publishedContent:{
		title: "Comment manger un oeuf",
		description: "Le plus dur enfin expliqué",
		content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
		image: "http://footage.framepool.com/shotimg/qf/958761367-boite-a-oeufs-carton-exploitation-horticole-plein-bonde.jpg",
	},
	rating: {
		up: 100,
		down:23
	}

},
{
	publishedContent:{
		title: "Aristote et le bonheur",
		description: "Mais oui, qu'en pensait-il celui là ?",
		content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
		image: "https://ak8.picdn.net/shutterstock/videos/1007220868/thumb/9.jpg",
	},
	rating: {
		up: 43,
		down:5
	}

},
{
	publishedContent: {
		title: "Le feu ça brûle",
		description: "frouiiii frouiii fait le feu",
		content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
		image: "https://ak6.picdn.net/shutterstock/videos/1267066/thumb/10.jpg",
	},
	rating: {
		up: 5,
		down:65
	}

},
{
	publishedContent: {
		title: "Fiche par défaut",
		content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
	},
	rating: {
		up: 4,
		down:1
	}
}
]

async function seedDB(){
	await myficheDB.deleteAllFiches();

	await User.remove();

	await User.register(new User({email: "root@myfiche.fr", username: "myfiche-root", privilege: 10}), "mfRoot");

	await User.register(new User({email: "brabantaurelien@icloud.com", username: "Aurelle", privilege: 0}), "rere");

	seeds.forEach(async function(seed, i){
		var fiche = await myficheDB.fiche.createNew(seed);
		if (i >= 3) {
			author = await myficheDB.findUser("email", "brabantaurelien@icloud.com", function(){});
		}
		else 
		{
			author = await myficheDB.findUser("email", "root@myfiche.fr", function(){});
		}
		fiche.author = author[0]._id;
		savedFiche = await fiche.save();
	})





}

module.exports = seedDB;
