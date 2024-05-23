/**
 * This will add validators common to RevenueWire for use with the
 * jQuery.validate plugin.
 *
 */

/**
 * pwd-required, will make a password field required
 */
(function($) {
    
    $.validator.addMethod("pwd-required",
            function(value)
            {
                var pwdSet = ($('#password-password').val() != '' && $('#password-password').attr('placeholder') != $('#password-password').val());
                if(!pwdSet) {
                    $("#password-password").toggleClass('error');
                }
                return pwdSet;
            },
            "This field is required.");
    /**
     * phoneUS, this will check us phone number format
     */
    $.validator.addMethod( "phoneUS",
        function( value, element ) {
            if ( this.optional( element ) ) {
                return true;
            }
            var phoneNumber = $.trim( value );

            // Only allow digits or dash or spaces
            var codeRegEx = /^[\d\-\s]+$/;

            if ( codeRegEx.test( phoneNumber ) ) {
                // New Allow 1-800 numbers
                // Passed so strip all - and spaces and must be at least 10
                phoneNumber = phoneNumber.replace('-','').replace('-','');
                var phoneLength = phoneNumber.length;
                if(phoneLength >= 10 && phoneLength <= 12) {
                    return true;
                } else {
                    return false;
                }
            }

            return false;

        },
        "Please enter a valid phone number."
        );

    $.validator.addMethod('password8',
        function(value, expect) {
            value = $.trim(value);
            if ( /[A-Z]/.test(value) && /\d/.test(value) && /.{8,}/.test(value) ) {
                return true;
            }
            return false;
        },
        "Please enter at least 8 characters including one capital, 1 digit."
        );


    $.validator.addMethod('ipV4',
        function( value, element ) {
            var REGEX = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            value = $.trim(value);
            if ( REGEX.test(value) ) {
                return true;
            }
            return false;
        },
        "Please enter a valid IP Version 4 Address."
        );
    /**
     * Validates the existance of the zip code
     */
    $.validator.addMethod('zipCodeExists',
        function(value, element) {
            FP.Notification.blockUI('Validating Zip Code...');

            if(typeof FP.zipValid != 'undefined' && FP.zipValid == value) {
                return true;
            }

            var zipCodeExists = true;
            FP.zipValid = value;
            
            FP.Notification.unblockUI();
            return zipCodeExists;
        }, "The Zip Code could not be validated."
        );


    /**
     * phoneUS, this will check us phone number format
     */
    $.validator.addMethod( "multipleEmails",
        function( value, element ) {
            if ( this.optional( element ) ) {
                return true;
            }
            var emailVal = $.trim( value );
            var codeRegEx = /^[A-Z0-9\._%-]+@[A-Z0-9\.-]+\.[A-Z]{2,4}(?:[,;][A-Z0-9\._%-]+@[A-Z0-9\.-]+\.[A-Z]{2,4})*$/i;

            if ( codeRegEx.test( emailVal ) ) {
                return true;
            }

            return false;

        },
        "Please enter valid emails seperated by , or ;"
        );

    /**
     * Must not be equal to
     */
    $.validator.addMethod("notEqualTo", function(value, element, param) {
        return this.optional(element) || value != $(param).val();
    }, "This has to be different...");



    /**
     * The User Must be at least 18
     */
    $.validator.addMethod( "min18",
        function( value, element ) {
            if ( this.optional( element ) ) {
                return true;
            }


            var today = new Date(), // today date object
            birthDate = new Date(value);

            // calculate age
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
            {
                age--;
            }
            

            if(age >= 18) {
                return true;
            }

            return false;
        },
        "You Must be at least 18 years of age."
        );

    /**
     * zip, this will check against commonly known zip codes
     * Zip Code Types:
     * Numeric     : 3 to 10 digit
     *
     * Spaces and - characters are allowed.
     */
    $.validator.addMethod( "zipcode",
        function( value, element ) {
            if ( this.optional( element ) ) {
                return true;
            }

            var zipCode = $.trim( value );

            codeRegEx = /^\d{5}(-\d{4})?$/;


            if ( codeRegEx.test( zipCode ) ) {
                return true;
            }

            return false;
        },
        "Please enter a valid Zip Code"
        );

    /**
     * This is a special check for required elements only if they are not
     * hidden.
     */
    $.validator.addMethod( "required_if_visible",
        function( value, element ) {
            if ( $(element).is(":visible" ) ) {
                if ( value != "" ) {
                    return true;
                }
            } else {
                return true;
            }

            return false;
        },
        "This field is required."
        );

    /**
     * This is a special check for required elements only if they are not
     * hidden.
     */
    $.validator.addMethod( "requiredPlaceholder",
        function( value, element ) {
            if (value == $(element).attr('placeholder'))  {
                return false;
            } else if ($.trim( value ) == "") {
                return false;
            } else {
                return true;
            }
        },
        "This field is required."
        );



    /**
     * Validator for matching sku values
     */
    $.validator.addMethod( "sku",
        function( value, element ) {
            if ( this.optional( element ) ) {
                return true;
            }

            if ( /^[A-Za-z0-9\/\-_]+$/.test( value ) ) {
                return true;
            }

            return false;
        },
        "Invalid sku, valid characters: 'A-Z0-9/-_'."
        );


    /**
     * currency, this will check that curency matches USD
     * must match ####.## to TWO decimal places does not accomodate Yen
     *
     */
    $.validator.addMethod( "currency",
        function( value, element ) {

            if ( this.optional( element ) ) {
                return true;
            }

            var moneyInputStr = $.trim( value );
            var codeRegEx = new RegExp("^\\s*((\\d+(\\.\\d{0,2})?)|((\\d*(\\.\\d{1,2}))))\\s*$");

            if ( codeRegEx.test( moneyInputStr ) ) {
                return true;
            }

            return false;
        },
        "Please enter an amount with the following format ###.##"
        );

    $.validator.addMethod("percent", function(value) {

        var precentString = $.trim( value );
        if(precentString == "") {
            return true;
        }

        if ( /(^100([.]0{1,2})?)$|(^\d{1,2}([.]\d{1,2})?)$/.test( precentString ) ) {
            return true;
        }

        return false;

    }, "Please enter percentage from 0.00 to 100.00");



    $.validator.addMethod("integerGreaterThanZero", function(value, element) {
        var intString = $.trim( value );

        if ( /^[0-9]{0,12}$/.test( intString ) && parseFloat(value) > 0) {
            return true;
        }
        return false;
    }, "This integer must be greater than zero");


    $.validator.addMethod("nonSpecialChars", function(value, element) {

        if(/^[a-zA-Z- ]*$/.test(value) == true) {
            return true;
        }
        return false;
    }, "Please enter a valid name");



    $.validator.addMethod("greaterThanZero", function(value, element) {
        return this.optional(element) || (parseFloat(value) > 0);
    }, "This field must be greater than zero");

});