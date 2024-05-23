FP.External = function() {

    // Two Buttons on same page -- strange - but not duplicated
    jQuery("#get-started-btn").bind('click', function(){
        if(jQuery("#get-started-form").valid()){
            FP.submitForm("#get-started-form");
        }
    });
    
    // Two Buttons on same page -- strange - but not duplicated
    jQuery("#get-started-btn2").bind('click', function(){
        if(jQuery("#get-started-form2").valid()){
            FP.submitForm("#get-started-form2");
        }
    });

    jQuery(function() {
    // Invoke the plugin
    jQuery('input, textarea').placeholder();
    // That’s it, really.
    // Now display a message if the browser supports placeholder natively
   });

}




//Fire things up
jQuery( function() {
    jQuery(window).load(function () {
        new FP.External();
    });
});

