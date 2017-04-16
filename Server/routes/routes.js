var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var PDFDocument = require ('pdfkit');
var pdf = new PDFDocument();


var upload = multer({ dest: 'images' });

/* ==================== API ENDPOINTS ====================== */
//Login doesn't require validation
router.get("/",function(request,response){
	response.send('Home');
});

router.post("/send",function(payload,response){
	res.send('sending');
});

router.post("/test2",upload.single('file'),function(req,res,next){
	console.log(req.file);
	res.send('done');
	/*
	fs.readFile(payload.body.image.path, function (err, data) {
  		// ...
  		var newPath = "/images";
  		fs.writeFile(newPath, data, function (err) {
  		  res.send(data);
 		 });
	});


	// Write stuff into PDF
	pdf.image('images/image1.jpg', 0, 0, {width: 595}) 
	// Stream contents to a file
	pdf.pipe(
	  fs.createWriteStream('file.pdf')
	)
 	 .on('finish', function () {
 	   console.log('PDF closed');
 	 });

	// Close PDF and write file.
	pdf.end();

	response.send('finished');*/
});


module.exports = router;
