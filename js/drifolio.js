
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

//  Robert Bridson, called Fast Poisson Disk Sampling in Arbitrary Dimensions
// https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph07-poissondisk.pdf
// https://unsplash.com/photos/S89gVhM67lU

const randomArrayValue = arr => arr[Math.floor(Math.random() * arr.length)];
const randomBetween = (min, max) => Math.random() * (max - min) + min;
const distanceBetween = (vec1, vec2) => Math.hypot(vec2.x - vec1.x, vec2.y - vec1.y);
const getPixelIndex = ({ x, y }, imageWidth) => (~~x + ~~y * imageWidth) * 4;

const PI2 = Math.PI * 2;

const ctx = document.querySelector('#canvas').getContext('2d');
class Poisson {
  constructor(r, k = 30) {
    this.r = r;
    this.k  = k;
    this.cellSize = Math.floor(this.r / Math.sqrt(2));

    this.grid = [];
    this.activeList = [];

    this.width = 0;
    this.height = 0;

    this.cols = 0;
    this.rows = 0;
  }

  init(width, height) {
    this.width = width;
    this.height = height;

    this.cols = Math.ceil(width / this.cellSize) + 1;
    this.rows = Math.ceil(height / this.cellSize) + 1;

    this.grid = new Array(this.cols).fill(-1).map(() => new Array(this.rows).fill(-1));
  }

  isPointFarEnough = (point) => {
    const { col, row } = this.getGridPosition(point);

    const xmin = Math.max(col - 1, 0);
    const xmax = Math.min(col + 1, this.cols - 1);
    const ymin = Math.max(row - 1, 0);
    const ymax = Math.min(row + 1, this.rows - 1);

    for (let x = xmin; x <= xmax; x++ ) {
      for (let y = ymin; y <= ymax; y++ ) {
        const cell = this.grid[x][y];

        if (cell !== -1) {
          const distance = distanceBetween(cell, point);

          if (distance < this.r) {
            return false;
          }
        }
      }
    }

    return true;
  };

  isPointValid(point) {
    if (point.x < 0 || point.x > this.width || point.y < 0 || point.y > this.height) {
      return false;
    }

    if (!this.isPointFarEnough(point)) {
      return false;
    }

    return true;
  }

  getGridPosition = (point) => ({
    col: Math.floor(point.x / this.cellSize),
    row: Math.floor(point.y / this.cellSize),
  });

  addPointToGrid(point) {
    const { col, row } = this.getGridPosition(point);

    this.grid[col][row] = point;

    this.activeList.push(point);
  };

  tryAdd() {
    const point = randomArrayValue(this.activeList);
    const validPoints = [];

    if (!point) {
      return false;
    }

    for (let i = 0; i < this.k; i++) {
      const angle = Math.random() * PI2;
      const length = randomBetween(this.r, this.r * 2);

      const point2 = {
        x: point.x + (Math.cos(angle) * length),
        y: point.y + (Math.sin(angle) * length),
      };

      if (this.isPointValid(point2)) {
        this.addPointToGrid(point2);

        validPoints.push(point2);
      }
    }

    if (!validPoints.length) {
      this.activeList = this.activeList.filter(p => p !== point);

      return false;
    }

    return validPoints;
  }
}

class Visual {
  constructor(ctx) {
    this.ctx = ctx;

    this.width = 0
    this.height = 0;
    this.imageData = [];
  }

  async init(imageUrl) {
    const image = await Visual.loadImage(imageUrl);

    this.width = image.width;
    this.height = image.height;

    // resize
    this.ctx.canvas.width = this.width;
    this.ctx.canvas.height= this.height;

    // paint image, get image data and clear canvas again
    this.ctx.drawImage(image, 0, 0);
    this.imageData = this.ctx.getImageData(0, 0, this.width, this.height).data;

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  getPixelIndex({ x, y }) {
    return  (~~x + ~~y * this.width) * 4;
  };

  drawPoint(position, radius = 2) {
    const pixelIndex = this.getPixelIndex(position);

    const rgb = [
      this.imageData[pixelIndex],
      this.imageData[pixelIndex + 1],
      this.imageData[pixelIndex + 2],
    ];

    const lightness = rgb[0] + rgb[1] + rgb[2];
    const lightnessMax = 255 * 3;
    const lightnessFraction = 1 - (lightness / lightnessMax);

    const radiusLightness = 0.25 + (3 * lightnessFraction);

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = `rgba(${rgb.join(', ')})`;
    this.ctx.arc((position.x), (position.y), radiusLightness, 0, PI2);

    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }

  static loadImage(imageUrl) {
    const img = new Image();

    img.crossOrigin = '';

    return new Promise(function(resolve, reject) {
      img.addEventListener('load', () => {
        resolve(img);
      });

      img.src = imageUrl;
    });
  }
}

let rafId = null;

const start = async () => {
  cancelAnimationFrame(rafId);

  const visual = new Visual(ctx);
  await visual.init('https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2020/01/hipertextual-es-figura-baby-yoda-mas-real-que-podras-comprar-2020062519.jpeg?w=1920&quality=50&strip=all&ssl=1');

  const { width, height } = visual;

  const poisson = new Poisson(4);
  poisson.init(width, height);

  const pointsStart = [
    { x: 50, y: 50 },
    { x: width - 50, y: 50 },
    { x: width - 50, y: height - 50 },
    { x: 50, y: height - 50 },
    { x: width * 0.5, y: height * 0.5 },
  ];

  pointsStart.forEach((p) =>  {
    poisson.addPointToGrid(p);
    visual.drawPoint(p);
  })

  const loop = () => {
    for (let i = 0; i < 50; i++) {
      const points = poisson.tryAdd();

      if (points) {
        points.forEach(p => visual.drawPoint(p, 2));
      }
    }

    if (poisson.activeList.length) {
      rafId = requestAnimationFrame(loop);
    }
  };

  loop();
};

start();

ctx.canvas.addEventListener('click', start);
