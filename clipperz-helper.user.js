// ==UserScript==
// @name           clipperz Helper
// @namespace      othrayte
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

// Example google script

/*
{"page": {"title": "Google"},
"form": {"attributes": {"action": "https://www.google.com/accounts/ServiceLoginAuth",
"method": "get"},
"inputs": [{"type": "hidden",
"name": "timeStmp",
"value": ""},
{"type": "hidden",
"name": "secTok",
"value": ""},
{"type": "password",
"name": "passphrase",
"value": ""},
{"type": "text",
"name": "Email",
"value": ""},
{"type": "password",
"name": "Passwd",
"value": ""},
{"type": "checkbox",
"name": "PersistentCookie",
"value": "yes"},
{"type": "submit",
"name": "submit",
"value": "signIn"},
{"type": "hidden",
"name": "asts",
"value": ""}]},
"version": "0.2.3"}
*/


/*
{"page": {"title": "Gmail"},
"form": {"attributes": {"action": "https://www.google.com/accounts/ServiceLoginAuth",
"method": "get"},
"inputs": [{"type": "hidden",
"name": "continue",
"value": "https://mail.google.com/mail/?"},
{"type": "hidden",
"name": "service",
"value": "mail"},
{"type": "hidden",
"name": "timeStmp",
"value": ""},
{"type": "hidden",
"name": "secTok",
"value": ""},
{"type": "password",
"name": "passphrase",
"value": ""},
{"type": "text",
"name": "Email",
"value": ""},
{"type": "password",
"name": "Passwd",
"value": ""},
{"type": "checkbox",
"name": "PersistentCookie",
"value": "yes"},
{"type": "submit",
"name": "submit",
"value": "signIn"},
{"type": "hidden",
"name": "asts",
"value": ""}]},
"version": "0.2.3"}
*/

/*
{"page": {"title": "Google Groups"},
"form": {"attributes": {"action": "https://www.google.com/accounts/ServiceLoginAuth",
"method": "get"},
"inputs": [{"type": "hidden",
"name": "continue",
"value": "http://groups.google.com/"},
{"type": "hidden",
"name": "service",
"value": "groups2"},
{"type": "hidden",
"name": "timeStmp",
"value": ""},
{"type": "hidden",
"name": "secTok",
"value": ""},
{"type": "password",
"name": "passphrase",
"value": ""},
{"type": "text",
"name": "Email",
"value": ""},
{"type": "password",
"name": "Passwd",
"value": ""},
{"type": "checkbox",
"name": "PersistentCookie",
"value": "yes"},
{"type": "submit",
"name": "submit",
"value": "signIn"},
{"type": "hidden",
"name": "asts",
"value": ""}]},
"version": "0.2.3"}
*/

/*
{"page": {"title": "Google Reader"},
"form": {"attributes": {"action": "https://www.google.com/accounts/ServiceLoginAuth",
"method": "get"},
"inputs": [{"type": "hidden",
"name": "continue",
"value": "http://www.google.com/reader"},
{"type": "hidden",
"name": "followup",
"value": "http://www.google.com/reader"},
{"type": "hidden",
"name": "service",
"value": "reader"},
{"type": "hidden",
"name": "timeStmp",
"value": ""},
{"type": "hidden",
"name": "secTok",
"value": ""},
{"type": "password",
"name": "passphrase",
"value": ""},
{"type": "text",
"name": "Email",
"value": ""},
{"type": "password",
"name": "Passwd",
"value": ""},
{"type": "checkbox",
"name": "PersistentCookie",
"value": "yes"},
{"type": "submit",
"name": "submit",
"value": "signIn"},
{"type": "hidden",
"name": "asts",
"value": ""}]},
"version": "0.2.3"}
*/

/*
{"page": {"title": "Digg"},
"form": {"attributes": {"action": "http://m.digg.com/login",
"method": "get"},
"inputs": [{"type": "password",
"name": "passphrase",
"value": ""},
{"type": "text",
"name": "ident",
"value": ""},
{"type": "password",
"name": "password",
"value": ""},
{"type": "submit",
"name": "submit",
"value": "login-button"},]},
"version": "0.2.3"}
*/

/*
{"page": {"title": "Launchpad"},
"form": {"attributes": {"action": "https://login.launchpad.net/",
"method": "get"},
"inputs": [{"type": "password",
"name": "passphrase",
"value": ""},
{"type": "text",
"name": "id_email",
"value": ""},
{"type": "password",
"name": "id_password",
"value": ""},
{"type": "submit",
"name": "submit",
"value": "login-form"}]},
"version": "0.2.3"}
*/

/*
{"page": {"title": "MySpace"},
"form": {"attributes": {"action": "https://www.myspace.com/",
"method": "get"},
"inputs": [{"type": "password",
"name": "passphrase",
"value": ""},
{"type": "hidden",
"name": "NextPage",
"value": ""},
{"type": "text",
"name": "emailSplash",
"value": ""},
{"type": "password",
"name": "passwordSplash",
"value": ""},
{"type": "checkbox",
"name": "rememberSplash",
"value": "on"},
{"type": "submit",
"name": "submit",
"value": "emailSplash"}]},
"version": "0.2.3"}
*/

/*
{"page": {"title": "GitHub"},
"form": {"attributes": {"action": "https://github.com/login",
"method": "get"},
"inputs": [{"type": "password",
"name": "passphrase",
"value": ""},
{"type": "text",
"name": "login_field",
"value": ""},
{"type": "password",
"name": "password",
"value": ""},
{"type": "submit",
"name": "submit",
"value": "login_field"}]},
"version": "0.2.3"}
*/

/*
{"page": {"title": "MochiGames"},
"form": {"attributes": {"action": "https://www.mochigames.com/accounts/login/",
"method": "GET"},
"inputs": [{"type": "password",
"name": "passphrase",
"value": ""},
{"type": "hidden",
"name": "action_kind",
"value": "login"},
{"type": "text",
"name": "id_username",
"value": ""},
{"type": "password",
"name": "id_password",
"value": ""},
{"type": "hidden",
"name": "next",
"value": "/my/dashboard/"},
{"type": "hidden",
"name": "utm_source",
"value": ""},
{"type": "hidden",
"name": "utm_medium",
"value": ""},
{"type": "hidden",
"name": "utm_term",
"value": ""},
{"type": "hidden",
"name": "utm_content",
"value": ""},
{"type": "hidden",
"name": "utm_campaign",
"value": ""},
{"type": "hidden",
"name": "affiliate_id",
"value": ""},
{"type": "submit",
"name": "submit",
"value": "id_username"}]},
"version": "0.2.3"}
*/

/*
{"page": {"title": "Linux Forums"},
"form": {"attributes": {"action": "https://www.linuxforums.org/",
"method": "get"},
"inputs": [{"type": "password",
"name": "passphrase",
"value": ""},
{"type": "text",
"name": "vb_login_username",
"value": ""},
{"type": "password",
"name": "vb_login_password",
"value": ""},
{"type": "submit",
"name": "submit",
"value": "vb_login_username"}]},
"version": "0.2.3"}
*/

/*
{"page": {"title": "Adobe"},
"form": {"attributes": {"action": "https://www.adobe.com/cfusion/membership/index.cfm?nf=1&nl=1",
"method": "POST"},
"inputs": [{"type": "hidden",
"name": "up_login",
"value": "yes"},
{"type": "hidden",
"name": "ignore_email_validation",
"value": "yes"},
{"type": "text",
"name": "up_username",
"value": ""},
{"type": "hidden",
"name": "has_pwd",
"value": "true"},
{"type": "password",
"name": "up_password",
"value": ""},
{"type": "checkbox",
"name": "rememberMe",
"value": "true"}]},
"version": "0.2.3"}
*/

/*
{"page": {"title": "BlueWireLan"},
"form": {"attributes": {"action": "http://www.bluewirelan.com/forums/index.php?act=Login&CODE=01",
"method": "post"},
"inputs": [{"type": "hidden",
"name": "referer",
"value": "http://www.bluewirelan.com/forums/index.php"},
{"type": "text",
"name": "UserName",
"value": ""},
{"type": "password",
"name": "PassWord",
"value": ""},
{"type": "checkbox",
"name": "CookieDate",
"value": "1"},
{"type": "submit",
"name": "submit",
"value": "Log me in"}]},
"version": "0.2.3"}
*/

/*
{"page": {"title": "trakt"},
"form": {"attributes": {"action": "http://trakt.tv/",
"method": "get"},
"inputs": [{"type": "password",
"name": "passphrase",
"value": ""},
{"type": "text",
"name": "username",
"value": ""},
{"type": "password",
"name": "password",
"value": ""},
{"type": "submit",
"name": "submit",
"value": "signin-form"}]},
"version": "0.2.3"}
*/

/*
{"page": {"title": "StumbleUpon"},
"form": {"attributes": {"action": "http://www.stumbleupon.com/login.php",
"method": "post"},
"inputs": [{"type": "text",
"name": "username",
"value": "Email or username"},
{"type": "password",
"name": "password",
"value": ""},
{"type": "submit",
"name": "login",
"value": "Login"},
{"type": "hidden",
"name": "rememberme",
"value": "1"}]},
"version": "0.2.3"}
*/

//iJobI77<e1$oBQR./p]

// Message

/*

Subject: Possible temporery hack to allow direct logins to google etc.

Hi all,

First a warning,
ANY CODE I POST IS ONLY IN THE DEVELOPMENT PHASE AND AS SUCH SHOULD NOT BE RELIED UPON, THE SECURITY OF THE HACK, AND I DO MEAN HACK, IS NOT IN ANY WAY GUARANTEED. IT IS PROBABLE THAT THERE ARE MANY SECURITY FLAWS IN IT. YOU TEST THIS CODE AT YOUR OWN RISK. (ALSO READ IT FIRST, AND DON'T USE IT UNLESS YOU UNDERSTAND FULLY WHAT IS GOING ON)

Ok, sorry for all of the shouting, had to make this clear. What I have hacked together over the last day or so circumvents the problems that arise with relation to direct logins and session ids. I used a simple method of modifying the direct login script and creating a short Grease Monkey script. The direct login script is modified such that the credentials are sent using 'get' as opposed to 'post', this allows them to be collected by the Grease Monkey script (which is really, an all powerful js script runner). This method has a couple of caveats, one being that the direct login scripts need to be manually edited, two that the Grease Monkey script needs to be 'added' to each page and three that there is a very simple way for the login page in question to block this method. Also at this point i would also like to note that many direct logins, whether using my hack or not, send credentials across unencrypted sessions, my hack does nothing to prevent this, this is the fault of the login page.

All code presented I release under the AGPLv3.

Also if you could check for and report any security flaws and/or possible solutions to said flaws, that would be most helpful.

Ok, now the code:


*/
