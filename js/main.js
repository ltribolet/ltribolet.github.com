$(function() {
	var meterSkills = $(".skills .meter");

	meterProgress();

	$(window).scroll(function () {
		meterProgress();
	});

	$(".ribbon-form").on("click", function () {

		var $sibl = $(this).siblings();
		if($sibl.hasClass("notactive"))
			$sibl.removeClass("notactive");
		else $sibl.addClass("notactive");
		$(".contact .slide").slideToggle();
	});

	$('body').on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
		$this = $(this);

		if($this.hasClass("collapsed")) {
			$this.html("+");
		}
		else $this.html("&dash;");
	});

	$('a.checkpoint').click(function (e) {
		e.preventDefault();

		var $this = $(this),
		selector = $this.attr('data-target'),
		$previous,
		$target;

		if (!selector) {
			selector = $this.attr('href');
			selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
		}

		$previous = $("#experiences .active");
		$target = $(selector);

		if($previous.length && $previous[0] !== $target[0]) {
			$previous.removeClass("active").slideToggle("1500", function() {
				$target.addClass("active").slideToggle();
			});
		}
		else if($previous.length && $previous[0] === $target[0]){
			$target.slideToggle("1500", function() {
				$(this).removeClass("active");
			});
		}
		else {
			$target.slideToggle("1500", function() {
				$(this).addClass("active");
			});
		}

		

	});

	function meterProgress() {
		meterSkills.each(function ( index, elt) {
			$elt = $(elt);

			$progress = $($elt.children("span"));

			var eltPosition = $elt.offset();

			if ($(window).height() + $(window).scrollTop() >= eltPosition.top && $progress.data("size") !== 0) {
				$progress.animate({
					"width": $progress.data("size")+"%"
				},{duration: 1500,easing: "easeInOutQuart"});
				$progress.data("size", 0);
			}
		});
	}
});
