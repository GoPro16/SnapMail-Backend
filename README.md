# SnapMail-Backend
SnapMail is a simple tool for taking pictures and emailing it to yourself in PDF format. The intended use is for school/homework to study for exams. It makes it simple to take a few pictures of notes and the app will convert the images to a PDF document and email it to whatever email is specified. This project contains the backend server side of the app.
For frontend view 
https://github.com/jdanek4/SnapMail-Frontend
## Installation
```bash
$ npm install
```
Open the server.js file and if the app doesn't work on the default port 3000, then change the code like so:
```js
models.sequelize.sync({force: false}).then(function () {
  var server = app.listen(process.env.PORT,process.env.IP, function() {
    console.log('Express server listening');
  });
});
```

## Usage
Run the App:
```bash
$ npm start
```
Go To local address for control panel
```html
localhost:3000/
```
