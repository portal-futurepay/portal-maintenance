jQuery(document).ready(function () {
  jQuery('.testimonials-slider').owlCarousel({
    items:2,
    dots: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    loop: true,
    responsive:{
      0:{
        items:1,
        dots:true,
        margin:0,
      },
      991:{
        margin:20,
        items:2,
      }
    }
});
jQuery('#reponsive_menu_btn').click(function(e) {    
  e.preventDefault();
  if (jQuery('#reponsive_menu_btn').hasClass('replace')) {
    jQuery(this).removeClass('replace');
    jQuery('header .menu-wrapper').removeClass('in');
    jQuery('#overview').removeClass('in');
  } else {
    jQuery(this).addClass('replace');
    jQuery('header .menu-wrapper').addClass('in');
    jQuery('#overview').addClass('in');
  };	
});

jQuery('#overview').click(function() {
  jQuery('#overview').removeClass('in');
  jQuery('header .menu-wrapper').removeClass('in');
  jQuery('#reponsive_menu_btn').removeClass('replace');
});

jQuery(window).scroll(function() {
  var scroll = jQuery(window).scrollTop();
  if (scroll >= 100) {
    jQuery(".main-header").addClass("show_header");
    jQuery(".blue_logo_header").removeClass('blue_logo_header').addClass('_blue_logo_header_');
  } else {
    jQuery(".main-header").removeClass("show_header");
    jQuery('._blue_logo_header_').removeClass('_blue_logo_header_').addClass('blue_logo_header');
  }
});

}); 




jQuery(document).ready(function () {


  let url = window.location.origin,
      AjaxUrl = url+'/wp-admin/admin-ajax.php';


//Ajax Blog Category query
jQuery('#news-wrapper').on('click', '.page-number', function (e) {
  e.preventDefault();

  var targetName = jQuery(this),
      paged = targetName.attr('data-paged'),
      newsPress = targetName.attr('data-newspress');
  
  targetName.addClass('current');

 
  jQuery.ajax({
    type: 'POST',
    url: AjaxUrl,
    dataType: 'html',
    data: {
      action: 'news_pagination_ajax',
      paged: paged,
      newsPress: newsPress
    },
    beforeSend : function () {
      jQuery("html, body").animate({ scrollTop: 0 }, "slow");
      jQuery('.news-body').addClass('loading');
    },
    success: function (data) {		
      if(newsPress === 'news')			 {
        jQuery('#news-inner').html(data);
        jQuery('#news-inner .page-number').attr('data-newspress', newsPress);
      } else if(newsPress === 'press_release') {
        jQuery('#press_release-inner').html(data);
        jQuery('#press_release-inner .page-number').attr('data-newspress', newsPress);	
      }      
    },
    complete: function() {
      jQuery('.news-body').removeClass('loading');
      return;
    },
  });
});
});



function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
} 


let url = window.location.href,
    hash = url.split('#').pop();
  
    if(hash === 'news_tab') {
      document.getElementById("news_tab").click();
    } else {
      if(document.getElementById("defaultOpen")) {
        document.getElementById("defaultOpen").click();
      }      
    }      






