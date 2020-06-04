export.myMiddleware = (req, res, next) => {
  req.name = 'irena';
  next();
};

exports.homePage = (req, res) => {
  console.log(req.name);
  res.render('index');
};