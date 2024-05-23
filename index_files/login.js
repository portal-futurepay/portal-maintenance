FP.Login = function() {
    jQuery('#openPasswordReset').bind('click',function(){
        if(jQuery('#header-login-form').is(":visible")) {
            jQuery('#openPasswordReset').text('Back to Login...');
            jQuery('#header-login-form').toggle(0, function(){
                jQuery('#passwordReset').css( "display", "inline-block" );
                jQuery('#header-login-form').css( "display", "none" );
            });
        } else {
            jQuery('#openPasswordReset').text('Forgot your password?');
            jQuery('#passReset').toggle(0, function(){
                jQuery('#header-login-form').css( "display", "inline-block" );
                jQuery('#passwordReset').css( "display", "none" );
            });
        }
    });

    jQuery('#resetPasswordBtn').bind('click',function(){
        if(jQuery('#passReset').valid()) {
            jQuery.ajax({
                url: "https://portal.futurepay.com/default/login/json-forgot-password",
                data: jQuery('#passReset').serializeArray(),
                success:function( json ){
                    console.log(json);
                    // Pulled back json data now load the grid
                    FP.Notification.unblockUI(); // still needed if nothing is returned
                },
                error: function( html ){
                    // Handle error
                    FP.Notification.displayErrorMessage('An Error Occured whilst filtering the results');
                    FP.Notification.unblockUI();
                }
            });
        }
    });


    jQuery("#header-login-button").bind('click', function(){

        if(FP.BrowserDetect.browser == 'MSIE' && FP.BrowserDetect.version <= 7) {
            alert("Please ensure that you are using the latest Internet Explorer version in order to ensure that FuturePay functions correctly.");
            FP.ajaxSubmitForm("#headerloginform");
        }
        if(jQuery("#header-login-form").valid()){
            FP.ajaxSubmitForm("#headerloginform");
        }
    });

    jQuery("#password-password").keyup( function(event) {
        if(event.which == 13){
            FP.ajaxSubmitForm("#headerloginform");
        }
    })
}

// Client side session expired set at 60 Minutes to match the session
// Scroll to top of page
// Close all dialogs
// Diaplay overlay except for the login
// Remove all side scrolling from the page
FP.Login.expired = function() {
    window.location.href = "/?expired=true";
}

// Display the Session Timeout warning - Close Dialogs rudely and scroll to the top of the page
FP.Login.setupSessionTimeOutWarning = function() {
    jQuery(".ui-dialog-content").dialog("close");
    window.scrollTo(0, 0);
    jQuery('#defaultCountdown').show();
}

// This is called from within the jquery.coutdown.min.js - customized onExpire
FP.Login.setupSessionTimeOut = function () {
    var now = new Date();
    var oneHourInMilliSeconds = 60 * 60000;
    var oneHourFromNow = new Date(now.getTime() + oneHourInMilliSeconds);
    var sessionTimout = oneHourFromNow;
    var displayWarningTimeout = 2500000; // 41 minutes

    // Corporate Users get longer timout
    if(jQuery('#userType').val() == 'corporate') {
         var eightHoursFromNowInMilliSeconds =  8 * 60 * 60000;
         var eightHoursFromNow = new Date(now.getTime() + eightHoursFromNowInMilliSeconds);
         sessionTimout = eightHoursFromNow;
         displayWarningTimeout = 2500000 * 8;
    } 

    FP.Login.expiredShown = false;

    jQuery('#defaultCountdown').countdown({
        until: sessionTimout,
        format: 'MS', // Display Minutes and seconds
        description: 'Session Expires In:'
    });

    jQuery('#defaultCountdown').hide();

    // Show the expiring counter 10 minutes before timeout
    setInterval(
        function() {
            FP.Login.setupSessionTimeOutWarning();
        },
        displayWarningTimeout);
};


//Fire things up
jQuery( function() {
    jQuery(window).load(function () {
        new FP.Login();
    });
});

