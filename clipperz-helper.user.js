// ==UserScript==
// @name           clipperz Helper
// @namespace      http://othrayte.net
// @description    helps clipperz login to some websites that use session ids
// @include        https://www.google.com/*
// ==/UserScript==

function setPassphrase() {
	if (responce = prompt("Please choose a new passphrase:", "")) GM_setValue("passphrase", responce);
}

function enableDebugMode() {
	if (!GM_getValue("debug")) {
		GM_setValue("debug", true);
	}
}

function disableDebugMode() {
	if (GM_getValue("debug")) {
		GM_setValue("debug", false);
	}
}

GM_registerMenuCommand("Set Passphrase", setPassphrase);

if (GM_getValue("debug")) {
	GM_registerMenuCommand("Disable debug mode", disableDebugMode);
} else {
	GM_registerMenuCommand("Enable debug mode", enableDebugMode);
}

function getArgs() {
	var args = new Object();
	var query = location.search.substring(1);
	var pairs = query.split("&");
	for(var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf('=');
		if (pos == -1) continue;
		var argname = pairs[i].substring(0,pos);
		var value = pairs[i].substring(pos+1);
		args[argname] = unescape(value);
	}
	return args;
}

var args = getArgs();
if (GM_getValue("passphrase")&&args['passphrase']) {
	if (args['passphrase']==GM_getValue("passphrase")) {
		for (arg in args) {
			if (arg!='submit' && arg!='passphrase') {
				if (document.getElementById(arg)) {
					document.getElementById(arg).value=unescape(args[arg]);
				} else if (document.getElementsByName(arg)[0]) {
					document.getElementsByName(arg)[0].value=unescape(args[arg]);
				}
			}
		}
		if (args['submit']) {
			var place = null;
			if (document.getElementById(unescape(args['submit']))) {
				place = document.getElementById(unescape(args['submit']));
			} else if (document.getElementsByName(unescape(args['submit']))[0]) {
				place = document.getElementsByName(unescape(args['submit']))[0];
			}
			if (place) {
				if (place.tagName=='BUTTON') {
					place.click();
				} else {
					while (place.tagName!='FORM') place = place.parentNode;
					if (GM_getValue("debug")) alert(place.tagName);
					place.submit();
				}
			}
		}
	} else {
		alert("clipperz Helper: Invalid passphrase");
	}
}

