$(window).resize(function(){
	$container = $('.container');
	$window = $(window);

	if( $window.width() > 767) {
		$container.css({
			position:'absolute',
			left: ($window.width() - $container.outerWidth() + 10)/2,
			top: ($window.height() - $container.outerHeight())/4
		});
	} else {
		$container.css({position:'static'});
	}


});

function detailDesktop ( thisObj ) {
	var $this = $(thisObj),
		selector = $this.data('target'),
		$previous,
		$target,
		$checkpointContainer = $this.parents(".stats");

	if (!selector) {
		selector = $this.attr('href');
		selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
	}

	$previous = $(".details .active");
	$target = $("." + selector + "-detail");


	if($previous.length && $previous[0] !== $target[0]) {
		$previous.removeClass("active").slideToggle("1500", function() {
			$target.addClass("active").slideToggle();
			$checkpointContainer.find(".active").removeClass("active");
			$this.addClass("active");
		});
	}
	else if($previous.length && $previous[0] === $target[0]){
		$target.slideToggle("1500", function() {
			$(this).removeClass("active");
			$this.removeClass("active");
		});
	}
	else {
		$target.slideToggle("1500", function() {
			$(this).addClass("active");
			$this.addClass("active");
		});
	}
}

function detailPhone ( thisObj ) {
	var $this = $(thisObj),
		width = $this.width();
		$swoosh = $this.parents('.swoosh');

		if( $swoosh.hasClass('opened') ) {
			$swoosh.animate({'left' : 0}, 200,function(){
				$swoosh.removeClass('opened');
			});
		}
		else {
			$swoosh.animate({'left' : -width}, 200,function(){
				$swoosh.addClass('opened');
			});
		}


}

$(function() {
	// To initially run the function:
	$(window).resize();

	var unlocked = true;

	$('.click-company').click(function (e) {
		e.preventDefault();

		if( $window.width() > 767) {
			detailDesktop(this);
		}
		else {
			detailPhone(this);
		}


	});

	$('.envelope').on("click", function() {
		var mail_p = 'luc+perso',
			mail_d = 'tribolet',
			mail_tl = "fr",
			uri = '';

		uri = 'mailto:' + mail_p + '@' + mail_d + '.' + mail_tl;

		window.location = uri;

	});
});
