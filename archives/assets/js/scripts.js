$(window).load(function(){
  $('.loader-img').fadeOut("slow"), $('#loader').delay(1000).slideUp("slow");
});

$(function(){
  masonry();
  smoothScroll();
  lightCase();
  logoTilt();
  toggleNav();
});

$(window).scroll(function(){
  showNav();
  parallaxHeader();
});

function toggleNav(){
  $('.toggle-nav').click(function(){
    $('body').toggleClass('show-nav');
    $('.overlay').toggleClass('visible');
  });

  $('.overlay').click(function(){
    if($('body').hasClass('show-nav')){
      $('body').removeClass('show-nav');
      $('.overlay').removeClass('visible');
    } else {
      return false;
    }
  });
}

function logoTilt(){
  $('.header-wrapper2').tilt({
    reset: false,
    maxTilt: 10,
    perspective: 1000
  });
}

function lightCase() {
  $('a[data-rel^=gallery]').lightcase({
    swipe: true
  });
}

function showNav() {
  var wScroll = $(this).scrollTop();
  var target = $('.section-portfolio').offset().top;
  var targetNew = target - 100;

  if (wScroll >= targetNew){
    $('#top-bar').addClass('is-visible');
  } else {
    $('#top-bar').removeClass('is-visible');
  }
}

function smoothScroll(){
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1500);
        return false;
      }
    }
  });
}

function parallaxHeader() {

  var wScroll = $(this).scrollTop();

  if (wScroll >= $('.section-portfolio').offset().top){
    return false;
  } else {
    $('.header-wrapper').css({
      'transform' : 'translate3d(0px, '+ wScroll / 12 +'%, 0px)'
    });
  }
  // var wScroll = $(this).scrollTop();
  // var target = $('.section-portfolio').offset().top;
  //
  // if (wScroll >= target) {
  //   return false;
  // } else {
  //   $('.header-wrapper').css({
  //     'transform' : 'translate3d(0px,' + wScroll / 4  +'%, 0)'
  //   });
  //
  //   $('.header-layer-1').css({
  //     'transform' : 'translate3d(0px,-' + wScroll / 16 +'%, 0)'
  //   });
  //
  //   $('.header-layer-3').css({
  //     'transform' : 'translate3d(0px,-' + wScroll / 8 +'%, 0)'
  //   });
  // }
}

function masonry() {

  var $grid = $('.grid').imagesLoaded( function() {
    $grid.masonry({
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    });
  });
}
