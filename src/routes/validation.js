module.exports = {
  validateUsers(req, res, next){
    if(req.method === "POST"){
      req.checkBody("name", "must not be empty").not().isEmpty()
      req.checkBody("email", "must be valid").isEmail();
      req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6});
      req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
    }

    const errors = req.validationErrors();

    if (errors) {
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    } else {
      return next();
    }
  },
  validateSignIn(req, res, next){
    if(req.method === "POST"){
      req.checkBody("email", "must be valid").isEmail();
      req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6});
    }

    const errors = req.validationErrors();

    if (errors) {
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    } else {
      return next();
    }
  },

  validateWikis(req, res, next){
    if(req.method === "POST") {
      req.checkBody("title", "must be at least 5 characters in length").isLength({min: 5});
      req.checkBody("body", "must be at least 15 characters in length").isLength({min: 15});
    }
    const errors = req.validationErrors();
    if(errors){
      req.flash("error", errors);
      return res.redirect(303, req.headers.referer)
    } else {
      return next();
    }
  },

  validateCollaborators(req, res, next){
    if(req.method === "POST") {
      req.checkBody("email", "must be valid").isEmail();
    }
    const errors = req.validationErrors();
    if(errors){
      req.flash("error", errors);
      return res.redirect(303, req.headers.referer)
    } else {
      return next();
    }
  },
}
