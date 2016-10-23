// Loosely based on the 59naga implementation.
// This one fixes some issues with substitutions from the original version.
// https://github.com/59naga/string-raw

function arrayFrom (arrayLike) {
	var arr = [];
	for (var i = 0; i < arrayLike.length; i++) arr.push(arrayLike[i]);
	return arr;
}

Object.defineProperty(String, "raw", {
	configurable: true,
	enumerable: false,
	writable: true,
	value: function raw (callSite, substitutions) {
		var template;
		callSite = callSite != null ? callSite : {};
		substitutions = arguments.length > 1 ? arrayFrom(arguments).slice(1) : [];
		try {
			template = arrayFrom(callSite.raw);
		} catch (e) {
			throw new TypeError('Cannot convert undefined or null to object');
		}

		return template.map(function (chunk, i) {
			if (callSite.raw.length <= i) {
				return chunk;
			}
			return substitutions[i - 1] != null ? substitutions[i - 1] + chunk : chunk;
		}).join("");
	}
});
