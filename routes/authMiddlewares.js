module.exports =
{
  isLoggedIn: function(req, res, next) {
    if (req.isAuthenticated())
    {
      return next();
    }
    res.redirect('/login');
  },

  isLoggedAsAdmin: function(req, res, next) {
    if (req.isAuthenticated() && req.user.privilege === 10)
    {
      return next();
    }

    res.redirect('/pannel');
  }
}




