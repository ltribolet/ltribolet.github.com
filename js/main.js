$(function() {
	var meterSkills = $(".skills .meter");

	meterProgress();

	$(window).scroll(function () {
		meterProgress();
	});

	$(".ribbon-form").on("click", function () {
		if($(this).hasClass("notactive"))
			$(this).removeClass("notactive");
		else $(this).addClass("notactive");
		$(".contact").slideToggle();
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
