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

	$('a.check-activator').click(function (e) {
		e.preventDefault();

		var $this = $(this),
		selector = $this.attr('data-target'),
		$previous,
		$target,
		$checkpointContainer = $this.parents(".checkpoint-container");

		if (!selector) {
			selector = $this.attr('href');
			selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
		}

		$previous = $("#experiences .active");
		$target = $(selector);


		if($previous.length && $previous[0] !== $target[0]) {
			$previous.removeClass("active").slideToggle("1500", function() {
				$target.addClass("active").slideToggle();
				$checkpointContainer.find(".active").removeClass("active").html("+");
				$this.addClass("active").html("&ndash;");
			});
		}
		else if($previous.length && $previous[0] === $target[0]){
			$target.slideToggle("1500", function() {
				$(this).removeClass("active");
				$this.removeClass("active").html("+");
			});
		}
		else {
			$target.slideToggle("1500", function() {
				$(this).addClass("active");
				$this.addClass("active").html("&ndash;");
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
