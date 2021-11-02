let Category =	require('../models/category'),
	User =		require('../models/user'),
	Fiche =		require('../models/fiche'),
	Avatar =	require('../models/avatar'),
	path =		require("path"),
	fs =		require("fs")



let myfiche =
{

	/* 
	 * Below function will generate at each restart the list of available avatars
	*/
	generateAvatars: async function()
	{
		let dirPath = path.join(__dirname, "../public/myfiche_assets/img/user")
		
		/* 
		 * Read all the files that are in the directory dedicated to avatars 
		 * Each file in dirPath will create an associated Avatar DB object.
		*/
		fs.readdir(dirPath, async function(err, avatars){
			if (err)
			{
				return console.log("AVATAR GENERATION FAILED : \n" +err);
			}

			try 
			{
				await Avatar.remove()

				for (avatar of avatars)
				{
					await Avatar.create({
						path: "/myfiche_assets/img/user/" +avatar,
					})	
				}
			}
			catch (err)
			{
				console.log(err)
			}

			return console.log("AVATARS GENERATED.");
		})	
	},

	/* Only for local dev purpose - DO NOT USE on live server!!!! */
	seedUsers: async function()
	{
		try 
		{
			let defaultAvatar = await Avatar.findOne({path: "/myfiche_assets/img/user/default.png"})
			await User.remove();
			let user = await User.register(
			new User({email: "myfiche@root.fr", username: "myfiche-root", privilege: 10, avatar: defaultAvatar})
				,"root",)
			console.log(user);

		}
		catch(err)
		{
			console.log("ERROR WHILE REGISTERING ROOT : \n" +err)
		}	
	},	

	updateAvatars: async function()
	{
		let users = await User.find({})
		let defaultAvatar = await Avatar.findOne({path: "/myfiche_assets/img/user/default.png"})
		for (user of users)
		{
			if (!user.avatar)
			{
				console.log("default avatar added for" +user.username)
				console.log(defaultAvatar);
				user.avatar = defaultAvatar._id
				await user.save()
				
			}
		}
	}

	}


module.exports = myfiche;
