const multer = require('multer');
const path = require('path');
const isFileImg = require('../helpers/isFileImg');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		let folder = path.join(__dirname, '../../public/img');

		cb(null, folder);
	},
	filename: (req, file, cb) => {
		let imageName = Date.now() + path.extname(file.originalname);

		cb(null, imageName);
	},
});

const fileFilter = (req, file, cb) => {
	if (!file) {
		cb(null, false);

		return;
	}
	if (!isFileImg(file.originalname)) {
		req.file = file;

		cb(null, false);

		return;
	}

	cb(null, true);
};

const fileUpload = multer({ storage, fileFilter });

module.exports = fileUpload;
