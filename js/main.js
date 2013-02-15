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

$(function() {
	// To initially run the function:
	$(window).resize();

	var unlocked = true;

	$('a.img').click(function (e) {
		e.preventDefault();

		var $this = $(this),
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
	});
});
