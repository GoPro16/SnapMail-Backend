var express = require('express');
var router = express.Router();

//PDF Converter
var PDFDocument = require ('pdfkit');
var doc = new PDFDocument();

//For File Upload
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: 'uploads' });

//Mailgun
var api_key = 'key-005e37e7577f2227e52d0aebba3ea38f';
var domain = 'sandbox885cb44b0b644cdf96921e60fe2c43cf.mailgun.org';
var Mailgun = require('mailgun-js');
var mailgun = new Mailgun({apiKey: api_key, domain: domain});

/* ==================== API ENDPOINTS ====================== */
//Login doesn't require validation
router.get("/",function(request,response){
	response.send('Home');
});

router.get("/email",function(req,res){
	//Mail Gun
	var data = {
 	 from: req.headers.from,
 	 to: req.headers.to,
 	 subject: req.headers.subject,
 	 text: req.headers.text,
 	 attachment:'uploads/'+req.headers.filename+'.pdf'
	};
 
	mailgun.messages().send(data, function (error, body) {
		if(error){
			console.log(error);
		}
	  	res.send(body);		
	});

});

router.post('/upload', function(req, res){
  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
  	 res.send('success');
  });
  // parse the incoming request containing the form data
  form.parse(req);
 convert(req.headers.filename);
});

var convert = function(filename){
	doc.pipe(fs.createWriteStream('uploads/'+filename+'.pdf'));
	doc.image('uploads/'+filename+'.jpg',0,0,{fit:[612,792]});
	doc.end();
};

/* ============= AUTH ================== */





module.exports = router;

