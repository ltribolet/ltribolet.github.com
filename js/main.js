$(function() {
	var meterSkills = $(".skills .meter");
	var lock = false;

	meterProgress();

	$(window).scroll(function () {
		meterProgress();
	});

	$(window).resize(function () {
		meterProgress();
	});

	$(".ribbon").on("click", function () {
		var $this = $(this);
		var $sibl = $this.siblings(".ribbon");
		var selector = $this.attr('data-target');
		var siblTarget = $sibl.attr('data-target');

		if($this.hasClass("notactive")){
			$("."+ siblTarget).slideToggle(function() {
				if($sibl.hasClass("notactive"))
					$sibl.removeClass("notactive");
				else {
					$sibl.addClass("notactive");
					$this.removeClass("notactive");
				}
				$("."+ selector).slideToggle();
			});
		} else {
			if($sibl.hasClass("notactive"))
				$sibl.removeClass("notactive");
			else {
				$sibl.addClass("notactive");
			}
			$("."+ selector).slideToggle();
		}

		
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

	$('.send').on('click', function () {
		if(!lock) {
			var form = $(".form-horizontal"),
				name = $(".name"),
				text = $(".texte"),
				mail = $(".mail");
			lock = true;
			if(checkForm(form, name, mail, text)) {
				sendForm(form, name.val(), mail.val(), text.val());
			}
		}
	});

	function checkForm( form, name, mail, text ) {
		var test = true,
			emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

		if ( name.val().length < 3 ) {
			test = false;
			name.parent().addClass("error");
		}
		else if(name.parent().hasClass("error")) {
				name.parent().removeClass("error");
		}

		if( !emailReg.test( mail.val() || mail.val() === "" ) ) {
			test = false;
			mail.parent().addClass("error");
		}
		else if(mail.parent().hasClass("error")) {
			mail.parent().removeClass("error");
		}

		if ( text.val().length < 3 ) {
			test = false;
			text.parent().addClass("error");
		}
		else if(text.parent().hasClass("error")) {
				text.parent().removeClass("error");
		}

		return test;
	}

	function sendForm ( form, name, mail, text ) {
		var $inputs = form.find("input, textarea");
		// let's disable the inputs for the duration of the ajax request
		$inputs.attr("disabled", "disabled");

		$.ajax({
			type : "POST",
			url: "mail.php",
			data: 'nameField='+name+'&mailField='+mail+'&textField='+text,
			success: function(data) {
				displayMessage(data);
			},
			error: function (data) {
				displayMessage(data);
			},
			complete: function(){
			// enable the inputs
				$inputs.removeAttr("disabled");
			}
		}).done(function() {
			$("ribbon-form").trigger("click");
			lock = false;
		});
	}

	function displayMessage ( data ) {
		$('#myModal p').html(data);
		$('#myModal').modal('show');
	}

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
