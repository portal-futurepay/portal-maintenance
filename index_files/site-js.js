jQuery(document).ready(function($) {
	var session_id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});

	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://h.online-metrix.net/fp/tags.js?org_id=9h85ghvg&session_id=' + session_id;
	$("head").append(script);

	$('form#headerloginform input#headerTmSessionId').val(session_id);

	let functionMenu = function(e){
		e.preventDefault();

		// overlay-menu
		$('.nav-overlay-container').toggleClass('open');
		// end overlay-menu
		$('html, body').css({
			overflow: 'hidden'
		});
	}

	$("#trigger-overlay").click(functionMenu);
	$("#trigger-overlay-responsible").click(functionMenu);

	$('.close-overlay').click(function(e){
		e.preventDefault();
		$('.nav-overlay-container').toggleClass('open');
		$('html, body').css({
			overflow: 'auto'
		});
	});

	let hasClassGradient = $('#masthead').hasClass("background-gradient-solid");

	if (hasClassGradient) {

		$('.site-header').addClass('dark');
		mainColor = 'white';
		secondaryColor = '#224f99';
		selectedTab = 'selected-tab-blue';
		unHoverTab = 'selected-tab-white';

		$("#link-logo-dark").css('display', 'block');
		$("#link-logo").css('display', 'none');

		$('#trigger-overlay-responsible').css('color', mainColor);
		$('#main-nav a').css('color', mainColor);

		$("li.current-menu-item").removeClass(unHoverTab);
		$("li.current-menu-item").addClass(selectedTab);
		$("li.current-menu-item a").css('color', secondaryColor);


		$("#masthead .main-banner-title").css('display', 'block');

	}

	function getCurrentScroll() {
		return window.pageYOffset || document.documentElement.scrollTop;
	}

	//Smooth Scrolling
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			var headerOffset = $('.site-header').outerHeight();
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
			var scrollTo = target.offset().top - headerOffset;
			$('html,body').animate({
				scrollTop: scrollTo
			}, 1000);
			return false;
			}
		}
	});

});

//Login Form Functions
jQuery(document).ready(function($) {
	var loginClicked = false;
	var readyToSubmit = false;
	var loginFormDiv = $('#login-form');
	/* 3 seconds */
	setTimeout( function () {
		if (loginClicked) {
			FP.ajaxSubmitForm("#headerloginform", function(){
				$('#login-form').unmask();
			});
		}
		readyToSubmit = true;
	}, 3000);

	// handle loging submit
	$("#header-login-button").bind('click', function() {
		loginFormDiv.mask('loading...');
		if (readyToSubmit)
			FP.ajaxSubmitForm("#headerloginform", function(){
				$('#login-form').unmask();
			});
		loginClicked = true;
		return false;
	});

	$('#username, #password-password').on('keypress', function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);

		if (code === 13) {
			e.preventDefault();
			e.stopPropagation();
			loginFormDiv.mask('loading...');
			if (readyToSubmit)
				FP.ajaxSubmitForm("#headerloginform", function(){
					$('#login-form').unmask();
				});
			loginClicked = true;
			return false;
		}
	});

	$('#openPassReset').bind('click', function(e) {
		e.preventDefault();
		$('#headerloginform').toggle(0, function() {
			$('#passReset').css('display', 'block');
			$('#headerloginform').css('display', 'none');
		});
	});

	$('#openPasswordReturn').bind('click', function(e) {
		e.preventDefault();
		$('#passReset').toggle(0, function() {
			$('#passReset').css('display', 'none');
			$('#headerloginform').css('display', 'block');
		});
	});

	$('#resetPasswordBtn').on('click', function(e) {
		e.preventDefault();
		$.ajax({
			crossDomain: true,
			url: 'https://portal.futurepay.com/default/login/json-forgot-password',
			data: $('#passReset').serializeArray(),
			dataType: 'jsonp',
			contentType: 'application/json',
			success: function(json) {
				if (json.error > 0) {
					//code here...
					alert('There was an issue sending your password reset email.')
				} else {
					alert('Your password email has been sent')
				}
			},
			error: function() {
				alert('There was an issue sending your password reset email.')
			},
			complete: function(jqXHR, status) {
				$('#headerloginform a.close-reveal-modal').click();
			}
		});
	});
});

// FP-1362 - Functionalities to support cookie banner behavior on snall screens


jQuery(document).ready(function($){
	//get viewport size
	let windowWidth = window.matchMedia("(max-width:46em)").matches; //media-query from Termly styling
	if(windowWidth){
		$("#signup-wistia-video iframe").width($('#signup-wistia-video').width());
		// Add div banner actor
		setTimeout(function(){
			if($('#termly-code-snippet-support>div:first-child>:first-child').length > 0){
				var termlyElCSS=$('#termly-code-snippet-support>div:first-child>:first-child').attr('style');
				$('#termly-code-snippet-support').append('<div class="fp-termly-hlpr">We use cookies to improve user experience, and analyze website traffic. For these reasons, we may share your site usage data with our analytics partners.<br> <button class="fp-termly-hlpr-button">Know more</button></div>');
				$('#termly-code-snippet-support>div:first-child>:first-child').attr('style', termlyElCSS + ' bottom: '+ String($('#termly-code-snippet-support>div>div:first-child').height() * -1) + "px !important" );
				$('#termly-code-snippet-support .fp-termly-hlpr-button').click(function(){
					$('#termly-code-snippet-support .fp-termly-hlpr').remove(); //Delete mini-banner
					$('#termly-code-snippet-support>div:first-child>:first-child').attr('style', termlyElCSS + ' bottom: 0px !important' );
				});
			}
		}, 3600);
	}
});
