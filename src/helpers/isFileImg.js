const path = require('path');

function isFileImg(fileName) {
	const VALID_EXT = ['.jpg', '.jpeg', '.png'];
	const extension = path.extname(fileName);

	if (VALID_EXT.includes(extension)) {
		return true;
	}

	return false;
}

module.exports = isFileImg;
