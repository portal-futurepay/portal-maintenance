/*
 * Custom Core FuturPay JS Code
 */
(function(FP, $, undefined){


    FP.submitForm = function (formId) {
        var fpForm = $(formId).closest('form')[0];
        FP.addTokenToForm(fpForm);
        fpForm.submit();
    };

    FP.addTokenToForm = function (form) {
        var tokenHiddenField = document.createElement("input");
        tokenHiddenField.setAttribute("type", "hidden");
        tokenHiddenField.setAttribute("name", 'fpCsrfToken');
        tokenHiddenField.setAttribute("id", 'fpCsrfToken');
        tokenHiddenField.setAttribute("value", $('#ajaxFpCsrfToken').val());
        form.appendChild(tokenHiddenField);
    };

    /**
     * Submits an ecrypted Form
     * @param string formId
     * @param string action
     * @returns form data
     */
    FP.submitEncForm = function(formId, action) {
        // This is for dealing with special characters in passwords
        $('#password-password').val(encodeURIComponent($('#password-password').val()));
        var serialized = $(formId).serialize();
        var encSerialized = Aes.Ctr.encrypt(serialized, $('#fpCsrfToken').val().substr(17), 128);
        var form = document.createElement("form");
        form.setAttribute("method", 'post');
        form.setAttribute("action", action);
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", 'dtkn');
        hiddenField.setAttribute("value", encSerialized);
        var tokenField = document.createElement("input");
        tokenField.setAttribute("type", "hidden");
        tokenField.setAttribute("name", 'fpCsrfToken');
        tokenField.setAttribute("value", $('#fpCsrfToken').val());
        form.appendChild(hiddenField);
        form.appendChild(tokenField);
        document.body.appendChild(form);
        form.submit();
    }

    /**
     * Submits an ecrypted Form via AJAX
     * @param string formId
     * @param string action
     * @returns form data
     */
    FP.ajaxSubmitForm = function(formId, done){
        jQuery("#okMsg").hide();
        jQuery("#errorMsg").hide();
        //jQuery("#loadingImg").show();
        if(jQuery(formId).valid()){
            var postData = jQuery(formId).serializeObject();
            var serialized = jQuery(formId).serialize();
            postData['password'] = encodeURIComponent(postData['password']);
            var baseurl = "https://portal.futurepay.com";
            jQuery.ajax({
                method: 'POST',
                url: baseurl + "/login/ajax-process",
                data: postData,
                dataType: "jsonp",
                cache: false,
                success: function (oJson) {
                    jQuery("#loadingImg").hide();
                    if (oJson && oJson.errorMessages) {
                        jQuery("#errorMsg").html(oJson.errorMessages);
                        jQuery("#errorMsg").show();
                    } else if (oJson) {
                        jQuery("#okMsg").show();
                        window.location.replace(baseurl + "/" + oJson.action);
                    }
                },
                error: function (oJson) {
                    jQuery("#loadingImg").hide();
                    if (oJson && oJson.error) {
                        jQuery("#errorMsg").html(oJson.errorMessages);
                        jQuery("#errorMsg").show();
                    } else {
                        jQuery("#errorMsg").html("Login failed. Please try again or contact FuturePay customer support.");
                        jQuery("#errorMsg").show();
                    }
                }
            }).always(done);
        }
        else{
            done();
        }
    }


    FP.rowSubmitForm = function(rowId, action) {
        var form = document.createElement("form");
        form.setAttribute("method", 'post');
        form.setAttribute("action", action);
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", 'id');
        hiddenField.setAttribute("value", rowId);
        form.appendChild(hiddenField);
        document.body.appendChild(form);
        form.submit();
    };


    FP.base64 = {
        // private property
        _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        // public method for encoding
        encode : function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            input = FP.base64._utf8_encode(input);

            while (i < input.length) {

                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

            }
            return output;
        },

        // public method for decoding
        decode : function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1    = this._keyStr.indexOf(input.charAt(i++));
                enc2    = this._keyStr.indexOf(input.charAt(i++));
                enc3    = this._keyStr.indexOf(input.charAt(i++));
                enc4    = this._keyStr.indexOf(input.charAt(i++));
                chr1    = (enc1 << 2) | (enc2 >> 4);
                chr2    = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3    = ((enc3 & 3) << 6) | enc4;
                output  = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = FP.base64._utf8_decode(output);
            return output;
        },

        // private method for UTF-8 encoding
        _utf8_encode : function (string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        },

        // private method for UTF-8 decoding
        _utf8_decode : function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;

            while ( i < utftext.length ) {

                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i+1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i+1);
                    c3 = utftext.charCodeAt(i+2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }

    };
// JQUERY 1.10 no longer does browser detection - custom check
// Instead Modernizer should be used to see if the function request is available.
// JQuery used userAgent but had deprecated this
// Since Browsers altimately do behave differently the need is still present for these checks
// To use this FP.BrowserDetect.browser and FP.BrowserDetect.version
    FP.BrowserDetect =
    {
        init: function ()
        {
            this.browser = this.searchString(this.dataBrowser) || "Other";
            this.version = this.searchVersion(navigator.userAgent) ||       this.searchVersion(navigator.appVersion) || "Unknown";
        },

        searchString: function (data)
        {
            for (var i=0 ; i < data.length ; i++)
            {
                var dataString = data[i].string;
                this.versionSearchString = data[i].subString;

                if (dataString.indexOf(data[i].subString) != -1)
                {
                    return data[i].identity;
                }
            }
        },

        searchVersion: function (dataString)
        {
            var index = dataString.indexOf(this.versionSearchString);
            if (index == -1) return;
            return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
        },

        dataBrowser:
            [
                {
                    string: navigator.userAgent,
                    subString: "Chrome",
                    identity: "Chrome"
                },
                {
                    string: navigator.userAgent,
                    subString: "MSIE",
                    identity: "MSIE"
                },
                {
                    string: navigator.userAgent,
                    subString: "Firefox",
                    identity: "Firefox"
                },
                {
                    string: navigator.userAgent,
                    subString: "Safari",
                    identity: "Safari"
                },
                {
                    string: navigator.userAgent,
                    subString: "Opera",
                    identity: "Opera"
                },
            ]
    };
}(window.FP = window.FP || {}, jQuery));

jQuery(document).ready(function() {
    jQuery(function () {
        jQuery('[data-toggle="tooltip"]').tooltip()
    })
    // JQUERY 1.10 no longer does browser detection - custom check
    // Instead Modernizer should be used to see if the function request is available.
    // JQuery used userAgent but had deprecated this
    // Since Browsers altimately do behave differently the need is still present for these checks
    FP.BrowserDetect.init();
    var token = "";
    if (jQuery('#ajaxFpCsrfToken').length) {
        token = jQuery('#ajaxFpCsrfToken').val();
    }
    // All Ajax calls are routed here
    jQuery.ajaxSetup({
        statusCode: {
            401: function(xhr, textStatus){
                // this will catch any and all page not found issues
                var json = jQuery.parseJSON(xhr.responseText);
                jQuery(".ui-dialog-content").dialog("close");
                FP.Notification.analyzeAndDisplayJsonResponse(json);
            },
            403: function(xhr, textStatus) {
                // this will catch any and all access denied errors and send to login
                var json = jQuery.parseJSON(xhr.responseText);
                jQuery(".ui-dialog-content").dialog("close");
                FP.Notification.analyzeAndDisplayJsonResponse(json);
            }
        },
        complete: function(xhr, textStatus) { // will be raised whenever an AJAX request completes (success or failure)
            var json = jQuery.parseJSON(xhr.responseText);
            FP.Notification.analyzeAndDisplayJsonResponse(json);
            return true;
        }
    });
});

jQuery.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    jQuery.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};