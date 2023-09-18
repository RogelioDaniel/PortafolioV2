
//========================
//PRELOADER
//========================
setTimeout(function(){
  $('.loader-bg').fadeToggle();

}, 1500);

//========================
//CUSTOM SCROLLBAR
//========================
/* $("html").niceScroll({
    mousescrollstep: 70,
    cursorcolor: "#ea9312",
    cursorwidth: "5px",
    cursorborderradius: "10px",
    cursorborder: "none",
}); */
// JavaScript Document
// Claudio Gomboli . the EGGS LAB
// 2012 / 8 / 29
// Responsive animated gallery

$('.portfolio').each(function(index)
{
    $(this).attr('id', 'img' + (index + 1));
});
    
$('.portfolio').each(function(){
  $('#navi').append('<div class="circle"></div>');
});
  
$('.circle').each(function(index)
{
    $(this).attr('id', 'circle' + (index + 1));
});   
   
$('.portfolio').click(function(){
if($(this).hasClass('opened')){
    $(this).removeClass('opened');
    $(".portfolio").fadeIn("fast");
    $(this).find('.ombra').fadeOut();
    $("#navi div").removeClass("activenav");
}
else{
	var indexi = $("#maincontent .portfolio").index(this) + 1;
    $(this).addClass('opened'); 
    $(".portfolio").not(this).fadeOut("fast");
    $(this).find('.ombra').fadeIn();
    $("#circle" + indexi).addClass('activenav'); 
}
});	

//navi buttons
$("#navi div").click(function() {
if($(this).hasClass("activenav")){
	return false;
}
		
	$("#navi div").removeClass("activenav");
	$(".portfolio").removeClass('opened');
	$(".portfolio").show();
        $('.ombra').hide();
		
	var index = $("#navi div").index(this) + 1;
	$("#img" + index).addClass('opened'); 
    $(".portfolio").not("#img" + index).fadeOut("fast");
    $("#img" + index).find('.ombra').fadeIn();
        
    $(this).addClass("activenav");
});

//========================
//SMOOTHSCROLL
//========================
$(function () {
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(2) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});


//========================
//NAVBAR
//========================
(function ($) {
    $(document).ready(function () {

        // hide .navbar first
        $(".navbar").hide();

        // fade in .navbar
        $(function () {
            $(window).scroll(function () {

                // set distance user needs to scroll before we start fadeIn
                if ($(this).scrollTop() > 40) {
                    $('.navbar')
                        .removeClass('animated fadeOutUp')
                        .addClass('animated fadeInDown')
                        .fadeIn();

                } else {
                    $('.navbar')
                        .removeClass('animated fadeInDown')
                        .addClass('animated fadeOutUp')
                        .fadeOut();
                }
            });
        });

    });
}(jQuery));


//========================
//icon hover effect
//========================
$('#services img').hover(
    function () {
        $(this).addClass('animated pulse')
    },
    function () {
        $(this).removeClass('animated pulse')
    })

    /*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/////////////////////////////////////////////
// button Up
/////////////////////////////////////////////
$(function () {  
  $(window).scroll(function () {  
  if ($(this).scrollTop() > 300) $('a#move_up').fadeIn(200);  
  else $('a#move_up').fadeOut(400);  
  });  
  $('a#move_up').click(function () {  
  $('body,html').animate({  
  scrollTop: 0  
  }, 800);  
  return false;  
  });  
});  