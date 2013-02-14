$(window).resize(function(){
	$container = $('.container');
	$window = $(window);
	$container.css({
		position:'absolute',
		left: ($window.width() - $container.outerWidth() + 10)/2,
		top: ($window.height() - $container.outerHeight())/2
	});

});

$(function() {
	// To initially run the function:
	$(window).resize();
});
