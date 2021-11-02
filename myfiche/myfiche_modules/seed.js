var myficheDB = require('./myfiche-db'),
    passport = require('passport'),
    User = require('../models/user'),
    Category = require('../models/category'),
    FicheComment = require('../models/ficheComment')


let categorySeeds = [

	{
		title: 'Général',
		description: 'Les fiches n\'appartenant à aucune catégorie particulière',
		fiches: []
	},
	{
		title: 'Français',
		fiches: []
	},
	{
		title: 'S.E.S',
		fiches: []
	},
	{
		title: 'Mathématiques',
		fiches: []
	},
	{
		title: 'Histoire',
		fiches: []
	},
	{
		title: 'Géographie',
		fiches: []
	},
	{
		title: 'Sciences',
		fiches: []
	},
	{
		title: 'Philosophie',
		fiches: []
	},
	{
		title: 'Sciences Politiques',
		fiches: []
	},

]

let ficheSeeds = [

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

let ficheCommentsSeeds = [
	{
		title: 'Cette fiche est super !',
		content: 'Le contenu est propre, et on sent que l\'auteur sait de quoi il parle.'
	},
	{
		title: 'Je m\'attendais a davantage de détails',
		content: 'La fiche est sympathique, mais je m\'attendais a plus de détails surtout en ce qui concerne la dernière partie.',
	},
	{
		title: 'C nule',
		content: 'Je fé mieux eZ alors dislaike'
	}
]


async function seedDB(){
	myficheDB.deleteAllFiches();

	await Category.remove();

	await User.remove();

	await User.register(new User({email: "root@myfiche.fr", username: "myfiche-root", privilege: 10}), "rootAd0118/");

	await User.register(new User({email: "brabantaurelien@icloud.com", username: "Aurelle", privilege: 0}), "rere");


	await ficheSeeds.forEach(async function(seed, i){
		try
		{
			var fiche = await myficheDB.fiche.createNew(seed);

			if (i >= 3) {
				author = await myficheDB.findUser("email", "brabantaurelien@icloud.com", function(){});
			}
			else 
			{
				author = await myficheDB.findUser("email", "root@myfiche.fr", function(){});
			}
			fiche.author = author[0]._id;


			await ficheCommentsSeeds.forEach(async function(commentSeed)
			{
				let comment = await FicheComment.create(commentSeed);
				comment.author = author[0]._id;
				let savedComment = await comment.save();
				await fiche.comments.push(savedComment._id);
			});


			let catG = await Category.findOne({title: "Général"});
			fiche.category = catG._id;
			catG.fiches.push(fiche._id);
			await catG.save();
			savedFiche = await fiche.save();
		}
		catch(err) {
			console.log(err);
		}
	})
}

async function seedCategories() {
	for(const categorySeed of categorySeeds) {
		await Category.create(categorySeed);
	}
}

module.exports = {
	seedCategories
}
