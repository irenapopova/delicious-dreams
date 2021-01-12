// req -is the data that comes in (user signs in with <form>  and POSTs to /login)
// res is the data that comes out and in between the req & res a bunch of work must happen
/* export.myMiddleware = (req, res, next) => {
  req.name = 'irena';

  next(); // 
}; */

exports.homePage = (req, res) => {
  console.log(req.name);
  res.render('index');
};

exports.addStore = (req, res) => {
  res.render('editStore', { title: ' 😧 Add Store' });
};
//middleWare allows to run code after the request but before response