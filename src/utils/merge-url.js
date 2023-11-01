export function merge(baseURL, relativeURL) {
	if (baseURL instanceof URL) baseURL = baseURL.href;
	return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
}
