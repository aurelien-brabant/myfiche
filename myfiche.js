let Category = require('./models/category'),
	User = require('./models/user'),
	Fiche = require('./models/fiche'),
	request = require('request-promise')



let myfiche =
{
	fetchContentFromV3: async function() 
	{

		async function requestV3AndPutToCurrent(fromOldMatiere, toNewMatiere)
		{
			var options = {
				uri: 'https://myfiche.fr/api/service.php?apikey=myfiche_apikey&bymatiere=' +fromOldMatiere,
			    qs: {
			        access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
			    },
			    headers: {
			        'User-Agent': 'Request-Promise'
			    },
			    json: true // Automatically parses the JSON string in the response
			};

			request(options)
				.then(async function(fiches){
					for (fiche of fiches)
					{
						saveToDB(fiche, toNewMatiere);
					}
				})
				.catch(function(err){
					console.log('Something went wrong while requesting myfiche.fr ' +err)
				});

		}

		async function saveToDB(ficheData, category) 
		{

			let compatibleObject = 
			{
				publishedContent: {
					title: ficheData.fiche_titre,
					description: ficheData.fiche_descr,
					content: ficheData.contenu,
					image: 'https://myfiche.fr/img_fiche/' + ficheData.img
				},
				currentSave: this.publishedContent,
			}

			try {
				if (ficheData.locked == 0)
				{
					let newFiche = await Fiche.create(compatibleObject);
					let defaultAuthor = await User.findOne({username: 'myfiche-root'});
					newFiche.author = defaultAuthor;

					let targetedCategory = await Category.findOne({title: category});

					newFiche.category = targetedCategory._id;

					targetedCategory.fiches.push(newFiche._id);

					let savedFiche = await newFiche.save(); 
					await targetedCategory.save();

					console.log('==============/ MYFICHE V3 FETCHER \\==============')
					console.log('[FETCHED] ' +savedFiche.publishedContent.title + '\n\n\n')
				}
			}

			catch(err) {
				console.log(err)
			}
		}

		let oldMatiere = [
			'S.E.S',
			'Français',
			'Mathématiques',
			'Histoire',
			'Géographie',
			'Sciences - ES et L',
			'Philosophie',
			'S.S.P'
		]

		let newCategories = [
			'S.E.S',
			'Français',
			'Mathématiques',
			'Histoire',
			'Géographie',
			'Sciences',
			'Philosophie',
			'Sciences Politiques'
		]

		for (var i = 0; i < newCategories.length ; i++)
		{
			requestV3AndPutToCurrent(oldMatiere[i], newCategories[i]);
		}

		



	}






}


module.exports = myfiche;
