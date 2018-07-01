/*
* @Author: Raf Van Suetendael
* @Date:   30-06-2018 23:22:53
* @Last Modified by:   Raf Van Suetendael
* @Last Modified time: 01-07-2018 23:48:36
*/

$('img[src$=".svg"]').each(function(){
    var $img = $(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');
        
        // Check if the viewport is set, else we gonna set it if we can.
        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }

        // Replace image with new SVG
        $img.replaceWith($svg);

    }, 'xml');

});

$(document).ready(function() {
	$('.js-sidebar__toggle, .js-content-overlay').on('click', function() {
		$('body').toggleClass('no-scroll');
		$('.js-content-overlay').fadeToggle();
		$('.js-sidebar__toggle').add('.js-sidebar').toggleClass('is-active');
    });

    var $slider = $('.js-slider');

    $slider.slick({
    	infinite: false,
    	dots: true,
    	fade: true,
    	speed: 1000,
    	prevArrow: $('.js-slider__prev'),
		nextArrow: $('.js-slider__next'),
		customPaging: function(slider, i) {
	      return '<span class="dot">0' + (i + 1) + '</span>';
	    }
    });

    $(document).on('keyup', function(e) {
        if(e.keyCode == 37 || e.keyCode == 38) {
            $slider.slick('slickPrev');
        }
        if(e.keyCode == 39 || e.keyCode == 40) {
            $slider.slick('slickNext');
        }
    });

    if ($('.slick-slide').eq(-1).hasClass('slick-active')) {
		$('body').addClass('is-slider-end');
	}

    $slider.on('wheel', (function(e) {
		if (e.originalEvent.deltaY > 0 && !$('.slick-slide').eq(-1).hasClass('slick-active')) {
	    	$(this).slick('slickNext');
	    	$('body').removeClass('is-slider-end');
	  	} else if (e.originalEvent.deltaY < 0) {
	    	$(this).slick('slickPrev');
	    	$('body').removeClass('is-slider-end');
	  	} else if ($('.slick-slide').eq(-1).hasClass('slick-active')) {
			$('body').addClass('is-slider-end');
	  	}
	}));
});