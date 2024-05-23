/**
* Displays the ok message then fades it
* Main Notification JS for twitter like messages/success fails
*/
FP.Notification = function () {
    // Delay setting
    FP.Notification.delay = 8000;


    jQuery(window).load( function(){
        // Close click events
        jQuery( "#alert-success" ).find('.close').bind('click', function() {
            jQuery( "#alert-success" ).delay(FP.Notification.delay).fadeOut()
        });
        jQuery( "#alert-error" ).find('.close').bind('click', function() {
            jQuery( "#alert-error" ).delay(FP.Notification.delay).fadeOut()
        });

        if(jQuery("#okMessage").length > 0) {

            if(jQuery("#okStatic").length > 0 && jQuery("#okStatic").val() == '1') {
                FP.Notification.displayStaticOkMessage(jQuery("#okMessage").val());
            } else {
                FP.Notification.displayOkMessage(jQuery("#okMessage").val());
            }
        }

        if(jQuery("#errorMessage").length > 0) {
            if(jQuery("#errorStatic").length > 0 && jQuery("#errorStatic").val() == '1') {
                FP.Notification.displayStaticErrorMessage(jQuery("#errorMessage").val());
            } else {
                FP.Notification.displayErrorMessage(jQuery("#errorMessage").val());
            }
        }


        FP.Notification.initializeTips();


        // ui blocker
        jQuery('<div id="loading-indicator" class="loading-indicator"><label id="loading-label">Loading ...</label></div> \
          <div id="loading-overlay" style="position:absolute;top:0;left:0;display:none" class="ui-widget-overlay"></div>')
        .appendTo(document.body);

    });
};


/**
 * Assumes this is called by alert.twig
 */
FP.Notification.displayConfirmMessage = function(title, message) {

    if(message != null && message.length > 0) {
        jQuery( "#confirm-message" ).html(message);
    }

    if(typeof FP.Notification.confirmLightbox == 'undefined') {

        FP.Notification.confirmLightbox = jQuery('#confirm-lbox').dialog({
            width: 370,
            autoOpen: false,
            modal: true,
            resizable: false,
            draggable: true,
            dialogClass: 'alert',
            title: title
        });

        jQuery("#confirm-cancel-button").bind("click", function() {
            FP.Notification.confirmLightbox.dialog('close');
        });
    }

    FP.Notification.confirmLightbox.dialog('open');

};


/**
 * Assumes this is called by alert.twig
 */
FP.Notification.displayAlertMessage = function(title, message) {
    if(message != null && message.length > 0) {
        jQuery( "#alert-message" ).html(message);
    }

    if(typeof FP.Notification.alertLightbox == 'undefined') {
        FP.Notification.alertLightbox = jQuery('#alert-lbox').dialog({
            width: 370,
            autoOpen: false,
            modal: true,
            resizable: false,
            draggable: true,
            dialogClass: 'alert',
            title: title
        });
    }

    FP.Notification.alertLightbox.dialog('open');

    jQuery("#alert-ok-button").on("click", function() {
        FP.Notification.alertLightbox.dialog('close');
    });
};


/**
 * Does not fade the message
 */
FP.Notification.displayStaticOkMessage = function(message) {
    if(message != null && message.length > 0) {
        jQuery( "#msg.ok" ).html(message);
        jQuery( "#alert-success" ).show();
    }
};

FP.Notification.displayOkMessage = function(message) {
    if(message != null && message.length > 0) {
        jQuery( "#msg.ok" ).html(message);
        jQuery( "#alert-success" ).show();
        jQuery( "#alert-success" ).delay(FP.Notification.delay).fadeOut('slow');
    }
};

FP.Notification.displayErrorMessage = function(message) {

    if(message != null && message.length > 0) {
        jQuery( "#msg1.error" ).html(message);
        jQuery( "#alert-error" ).show();
        jQuery( "#alert-error" ).delay(FP.Notification.delay).fadeOut('slow');
    }

};

FP.Notification.displayTargetedErrorMessage = function(message, target) {

    if(message != null && message.length > 0) {
        jQuery( "#msg-error-" + target).html(message);
        jQuery( "#alert-error-" + target ).show();
        jQuery( "#alert-error-" + target ).delay(8000).fadeOut('slow');
    }
};

FP.Notification.displayTargetedOkMessage = function(message, target) {
    if(message != null && message.length > 0) {
        jQuery( "#msg-success-" + target).html(message);
        jQuery( "#alert-success-" + target ).show();
        jQuery( "#alert-success-" + target ).delay(FP.Notification.delay).fadeOut('slow');
    }
};

FP.Notification.displayStaticErrorMessage = function(message) {
    if(message != null && message.length > 0) {
        jQuery( "#msg1.error" ).html(message);
        jQuery( "#alert-error" ).show();
    }
};

FP.Notification.hideMessage = function() {
    jQuery( "#alert-success, #alert-error" ).delay(FP.Notification.delay).fadeOut('slow');
};

/*
 * Displays a Processing Spinner and message
 */
FP.Notification.displayMessageSpinner = function(message) {
    // Displays a Spinner and message
    if(jQuery("#processing-indicator") == null || jQuery("#loading-indicator").length == 0) {
        var processingIndicator = jQuery("<span id='processing-indicator' class='loading-indicator'><label>" + message + "</label></span>").appendTo(document.body);
        processingIndicator
        .css("position", "absolute")
        .css("top", ((jQuery(document).height() / 2) - 200) + "px")
        .css("left", ((jQuery(document).width() / 2) - 100) + "px");
    } else {
        jQuery("#processing-indicator").show();
    }
};

/**
 * Standardized Json Response Handling
 **/
FP.Notification.analyzeAndDisplayJsonResponse = function(jsonResponse) {
    if(jsonResponse == null) {
        return;
    } else if (jsonResponse.status == null) {
        return;
    } else if (jsonResponse.status == 'ERROR' && jsonResponse.message != null && jsonResponse.message != "") {
        // If there was an error push the error message
        FP.Notification.displayStaticErrorMessage(jsonResponse.message);
    } else if (jsonResponse.status == 'OK' && jsonResponse.message != null && jsonResponse.message != "") {
        // If there was an ok push the message
        FP.Notification.displayOkMessage(jsonResponse.message);
    }
};

FP.Notification.analyzeAndDisplayTargetedResponse = function(jsonResponse, target) {
    if(jsonResponse == null) {
        return;
    } else if (jsonResponse.status == null) {
        return;
    } else if (jsonResponse.status == 'ERROR' && jsonResponse.message != null && jsonResponse.message != "") {
        // If there was an error push the error message
        FP.Notification.displayTargetedErrorMessage(jsonResponse.message, target);
    } else if (jsonResponse.status == 'OK' && jsonResponse.message != null && jsonResponse.message != "") {
        // If there was an ok push the message
        FP.Notification.displayTargetedOkMessage(jsonResponse.message, target);
    }
};
/*
 * Hides a Processing Spinner and message
 */
FP.Notification.hideMessageSpinner = function() {
    // Hide spinner
    jQuery("#processing-indicator").hide();
};

/**
* Initialize bind for inputField
*/
FP.Notification.initializeTips = function() {
    // bubble
    jQuery('.bubbleInfo').each(function () {
        var trigger = jQuery('.trigger', this);
        var info = jQuery('.popup', this);

        jQuery([trigger.get(0), info.get(0)]).mouseover(function () {
            info.css('display', 'block');
        }).mouseout(function () {
            info.css('display', 'none');
        });
    });

    jQuery("input").bind('focus mouseenter mouseover', function(evt) {
        jQuery("input").parents('dd').removeClass('focus');
        jQuery(evt.target).parents('dd').addClass('focus');
    });
};

/* it just block ui from interact anything */
FP.Notification.blockUI = function(message) {

    if(message != null && message != "" && message != true) {
        jQuery("#loading-label").text(message);
    }

    jQuery("#loading-indicator")
    .show()
    .position({
        my: "center center",
        of: window,
        at: "center center",
        offset:"0 -50"
    });

    jQuery("#loading-overlay")
    .css({
        'width': jQuery(document).width(),
        'height': jQuery(document).height()
    })
    .show();
};

/* unblock ui, so allowing interacting with page */
FP.Notification.unblockUI = function() {
    jQuery("#loading-indicator, #loading-overlay").hide();
};


//Fire things up
jQuery( function() {
    new FP.Notification();
    // any click will hide the message
    jQuery('body').click(FP.Notification.hideMessage);
});

