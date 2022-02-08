exports.createPostValidator = (req, res, next) => {
  // title
  req.check("title", "Write a title").notEmpty();
  req.check("title", "Title must be between 4 to 150 characters").isLength({
    min: 4,
    max: 150,
  });
  // body
  req.check("body", "Write a body").notEmpty();
  req.check("body", "Body must be between 4 to 2000 characters").isLength({
    min: 4,
    max: 2000,
  });
  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};

exports.userSignupValidator = (req, res, next) => {
  //name is not null and between 4-10 characters
  req.check("name", "Name is required").notEmpty();

  //email is not null, valid and normalized
  req.check("email","Email is required").notEmpty();
  req.check("email")
  .isLength({min:3,max:32})
  .withMessage("Email must be between 3 to 32 characters")
  .matches(/.+\@..+/).withMessage("Email must contain @")
  
    
      
  //check for passwords
  req.check('password')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 chars long')
  .matches(/\d/)
  .withMessage('Password must contain a number');

  // check for errors
  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};
