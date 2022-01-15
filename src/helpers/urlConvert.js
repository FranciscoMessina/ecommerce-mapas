const urlConvert = (url) => {
	let found = url.match(/d\/([A-Za-z0-9\-]+)/);

	if (found) {
		if (found[1].length) {
			let newUrl = 'https://drive.google.com/uc?export=view&id=' + found[1];

			return newUrl;
		}
	}

	url = '/img/' + url;

	return url;
};

module.exports = urlConvert;
