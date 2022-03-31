'use strict';

const isURL = (url) => /^(http|https):\/\/(www.)?/.test(url);

module.exports = {
	isURL,
};
