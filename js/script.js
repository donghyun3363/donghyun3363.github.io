(function($) {
	
	'use strict';
	
	var $window	= $(window);
	var $body	= $('body');
	
	var Unicom = {
		
		// Initialization the functions
		init: function() {
			
			Unicom.Menu();
			Unicom.Scroll();
			Unicom.Form();
			Unicom.Button();
			Unicom.Placeholder();
			Unicom.Video();
			Unicom.Background();
			Unicom.Carousel();
			Unicom.Lightbox();
			Unicom.Tooltip();
			Unicom.Isotope();
			Unicom.Counter();
			Unicom.Tweets();
			
			$window.on('load', function() {
				Unicom.Animation();
			});
			
		},
		
		// Menu functions & settings
		Menu: function() {
			
			var $headerNavWrap	= $('#header.header-nav-bottom .navigation-wrap');
			var $navigation		= $('#navigation');
			
			// Navigation menu affix
			if ($body.hasClass('body-header-nav-bottom')) {
				$headerNavWrap.waypoint(function() {
					$navigation.removeClass('affix');
				}, {
					offset: 1
				});
				
				$headerNavWrap.waypoint(function() {
					$navigation.addClass('affix');
				});
			} else {
				if ($body.hasClass('body-header-2') || $body.hasClass('body-header-4') || $body.hasClass('body-header-5') || $body.hasClass('body-header-transparent')) {
					$body.waypoint(function() {
						$navigation.removeClass('affix');
					}, {
						offset: -1
					});
					
					$body.waypoint(function() {
						$navigation.addClass('affix');
					}, {
						offset: -2
					});
				} else if ($body.hasClass('body-header-3')) {
					$body.waypoint(function() {
						$navigation.removeClass('affix');
					}, {
						offset: -140
					});
					
					$body.waypoint(function() {
						$navigation.addClass('affix');
					}, {
						offset: -141
					});
				} else {
					$body.waypoint(function() {
						$navigation.removeClass('affix');
					}, {
						offset: -40
					});
					
					$body.waypoint(function() {
						$navigation.addClass('affix');
					}, {
						offset: -41
					});
				}
			}
			
			var timeout;
			
			$('#navigation .navbar-menu .nav li').on('mouseover', function() {
				var $elem = $('.sub-menu', $(this)).first();
				
				if ($elem.length > 0) {
					if ($elem.offset().left + $elem.outerWidth() > $window.width()) {
						$elem.addClass('sub-menu-left');
					}
				}
				
				clearTimeout(timeout);
			});
			
			$('#navigation .navbar-menu .nav').on('mouseleave', function() {
				timeout = setTimeout(function(elem) {
					$('.sub-menu.sub-menu-left', elem).removeClass('sub-menu-left');
				}, 200);
			});
			
			$('#nav-mobile .scrollbar-inner, #nav-shop-filter .scrollbar-inner').scrollbar();
			
		},
		
		// Scroll functions & settings
		Scroll: function() {
			
			// Navigation menu scrollspy to anchor section
			setTimeout(function() {
				$body.scrollspy({
					target: '#navigation .navbar.scrollspy',
					offset: 71
				});
			}, 100);
			
			// Smooth scrolling to anchor section
			$('a.smooth-scroll').on('click', function(e) {
				var $anchor	  = $(this);
				var offsetTop = '';
				
				if (window.Response.band(992)) {
					offsetTop = parseInt($($anchor.attr('href')).offset().top - 70, 0);
				} else {
					offsetTop = parseInt($($anchor.attr('href')).offset().top, 0);
				}
				
				$('html, body').stop().animate({
					scrollTop: offsetTop
				}, 2000,'easeOutExpo');
				
				e.preventDefault();
			});
			
		},
		
		// Form functions & settings
		Form: function() {
			
			var pattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
			
			// Checking subcribe form input when focus & keypress event
			$('.affa-form-subscribe input[type="text"], .affa-form-subscribe input[type="email"]').on('focus keypress', function() {
				var $input = $(this);
				
				if ($input.hasClass('error')) {
					$input.val('').removeClass('error');
				}
				
				if ($input.hasClass('success')) {
					$input.val('').removeClass('success');
				}
			});
			
			// Checking form input when focus and keypress event
			$('.affa-form-contact input[type="text"], .affa-form-contact input[type="email"], .affa-form-contact textarea, .affa-form-signup input[type="text"], .affa-form-signup input[type="email"], .affa-form-signup input[type="password"], .affa-form-signup textarea, .affa-form-signup select, .affa-form-signup2 input[type="text"], .affa-form-signup2 input[type="email"], .affa-form-signup2 input[type="password"], .affa-form-signup2 textarea, .affa-form-signup2 select, .affa-form-signup3 input[type="text"], .affa-form-signup3 input[type="email"], .affa-form-signup3 input[type="password"], .affa-form-signup3 textarea, .affa-form-signup3 select').on('focus keypress', function() {
				var $input = $(this);
				
				if ($input.hasClass('error')) {
					$input.removeClass('error');
				}
			});
			
			// Subscribe form when submit button clicked
			$('.affa-form-subscribe').submit(function() {
				var $email	= $(this).find('input[name="email"]');
				var $submit	= $(this).find('input[name="submit"]');
				
				if (pattern.test($email.val()) === false) {
					$email.val('Please enter a valid email address!').addClass('error');
				} else {
					var submitData = $(this).serialize();
					$email.attr('disabled', 'disabled');
					$submit.attr('disabled', 'disabled');
					$.ajax({
						type: 'POST',
						url: 'includes/mailchimp/process-subscribe.php',
						data: submitData + '&action=add',
						dataType: 'html',
						success: function(msg) {
							if (parseInt(msg, 0) !== 0) {
								var msg_split = msg.split('|');
								
								if (msg_split[0] === 'success') {
									$submit.removeAttr('disabled');
									$email.removeAttr('disabled').val(msg_split[1]).addClass('success');
								} else {
									$submit.removeAttr('disabled');
									$email.removeAttr('disabled').val(msg_split[1]).addClass('error');
								}
							}
						}
					});
				}
				
				return false;
			});
			
			// Contact form when submit button clicked
			$('.affa-form-contact').submit(function() {
				var $form		= $(this);
				var submitData	= $form.serialize();
				var $name		= $form.find('input[name="name"]');
				var $email		= $form.find('input[name="email"]');
				var $subject	= $form.find('input[name="subject"]');
				var $message	= $form.find('textarea[name="message"]');
				var $submit		= $form.find('input[name="submit"]');
				var status		= true;
				
				if ($email.val() === '' || pattern.test($email.val()) === false) {
					$email.addClass('error');
					status = false;
				}
				
				if ($message.val() === '') {
					$message.addClass('error');
					status = false;
				}
				
				if (status) {
					$name.attr('disabled', 'disabled');
					$email.attr('disabled', 'disabled');
					$subject.attr('disabled', 'disabled');
					$message.attr('disabled', 'disabled');
					$submit.attr('disabled', 'disabled');
					$.ajax({
						type: 'POST',
						url: 'includes/process-contact.php',
						data: submitData + '&action=add',
						dataType: 'html',
						success: function(msg) {
							if (parseInt(msg, 0) !== 0) {
								var msg_split = msg.split('|');
								
								if (msg_split[0] === 'success') {
									$name.val('').removeAttr('disabled').removeClass('error');
									$email.val('').removeAttr('disabled').removeClass('error');
									$subject.val('').removeAttr('disabled').removeClass('error');
									$message.val('').removeAttr('disabled').removeClass('error');
									$submit.removeAttr('disabled');
									$form.find('.submit-status').html('<div class="submit-status-text"><span class="success"><i class="ion ion-ios-checkmark-outline"></i> ' + msg_split[1] + '</span></div>').fadeIn(300).delay(3000).fadeOut(300);
								} else {
									$name.removeAttr('disabled').removeClass('error');
									$email.removeAttr('disabled').removeClass('error');
									$subject.removeAttr('disabled').removeClass('error');
									$message.removeAttr('disabled').removeClass('error');
									$submit.removeAttr('disabled').removeClass('error');
									$form.find('.submit-status').html('<div class="submit-status-text"><span class="error"><i class="ion ion-ios-close-outline"></i> ' + msg_split[1] + '</span></div>').fadeIn(300).delay(3000).fadeOut(300);
								}
							}
						}
					});
				}
				
				status = true;
				
				return false;
			});
			
			// Signup form when submit button clicked
			$('.affa-form-signup').submit(function() {
				var $form		= $(this);
				var submitData	= $form.serialize();
				var $name		= $form.find('input[name="name"]');
				var $email		= $form.find('input[name="email"]');
				var $submit		= $form.find('input[name="submit"]');
				var status		= true;
				
				if ($email.val() === '' || pattern.test($email.val()) === false) {
					$email.addClass('error');
					status = false;
				}
				
				if (status) {
					$name.attr('disabled', 'disabled');
					$email.attr('disabled', 'disabled');
					$submit.attr('disabled', 'disabled');
					$.ajax({
						type: 'POST',
						url: 'includes/process-signup.php',
						data: submitData + '&action=add',
						dataType: 'html',
						success: function(msg) {
							if (parseInt(msg, 0) !== 0) {
								var msg_split = msg.split('|');
								
								if (msg_split[0] === 'success') {
									$name.val('').removeAttr('disabled');
									$email.val('').removeAttr('disabled');
									$submit.removeAttr('disabled');
									$form.parents('.header-content-form').find('.submit-status').html('<span class="success"><i class="ion ion-ios-checkmark-outline"></i> ' + msg_split[1] + '</span>').fadeIn(300).delay(3000).fadeOut(300);
								} else {
									$name.removeAttr('disabled');
									$email.removeAttr('disabled');
									$submit.removeAttr('disabled');
									$form.parents('.header-content-form').find('.submit-status').html('<span class="error"><i class="ion ion-ios-close-outline"></i> ' + msg_split[1] + '</span>').fadeIn(300).delay(3000).fadeOut(300);
								}
							}
						}
					});
				}
				
				status = true;
				
				return false;
			});
			
			// Signup form when submit button clicked
			$('.affa-form-signup2').submit(function() {
				var $form		= $(this);
				var submitData	= $form.serialize();
				var $name		= $form.find('input[name="name"]');
				var $email		= $form.find('input[name="email"]');
				var $phone		= $form.find('input[name="phone"]');
				var $message	= $form.find('textarea[name="message"]');
				var $agree		= $form.find('input[name="agree"]');
				var $submit		= $form.find('input[name="submit"]');
				var status		= true;
				
				if ($email.val() === '' || pattern.test($email.val()) === false) {
					$email.addClass('error');
					status = false;
				}
				
				if ($message.val() === '') {
					$message.addClass('error');
					status = false;
				}
				
				if (status) {
					$name.attr('disabled', 'disabled');
					$email.attr('disabled', 'disabled');
					$phone.attr('disabled', 'disabled');
					$message.attr('disabled', 'disabled');
					$agree.attr('disabled', 'disabled');
					$submit.attr('disabled', 'disabled');
					$.ajax({
						type: 'POST',
						url: 'includes/process-signup2.php',
						data: submitData + '&action=add',
						dataType: 'html',
						success: function(msg) {
							if (parseInt(msg, 0) !== 0) {
								var msg_split = msg.split('|');
								
								if (msg_split[0] === 'success') {
									$name.val('').removeAttr('disabled');
									$email.val('').removeAttr('disabled');
									$phone.val('').removeAttr('disabled');
									$message.val('').removeAttr('disabled');
									$agree.attr('checked', false).removeAttr('disabled');
									$submit.removeAttr('disabled');
									$form.siblings('.submit-status').html('<span class="success"><i class="ion ion-ios-checkmark-outline"></i> ' + msg_split[1] + '</span>').fadeIn(300).delay(3000).fadeOut(300);
								} else {
									$name.removeAttr('disabled');
									$email.removeAttr('disabled');
									$phone.removeAttr('disabled');
									$message.removeAttr('disabled');
									$agree.removeAttr('disabled');
									$submit.removeAttr('disabled');
									$form.siblings('.submit-status').html('<span class="error"><i class="ion ion-ios-close-outline"></i> ' + msg_split[1] + '</span>').fadeIn(300).delay(3000).fadeOut(300);
								}
							}
						}
					});
				}
				
				status = true;
				
				return false;
			});
			
			// Signup form when submit button clicked
			$('.affa-form-signup3').submit(function() {
				var $form		= $(this);
				var submitData	= $form.serialize();
				var $name		= $form.find('input[name="name"]');
				var $email		= $form.find('input[name="email"]');
				var $phone		= $form.find('input[name="phone"]');
				var $message	= $form.find('textarea[name="message"]');
				var $submit		= $form.find('input[name="submit"]');
				var status		= true;
				
				if ($email.val() === '' || pattern.test($email.val()) === false) {
					$email.addClass('error');
					status = false;
				}
				
				if ($message.val() === '') {
					$message.addClass('error');
					status = false;
				}
				
				if (status) {
					$name.attr('disabled', 'disabled');
					$email.attr('disabled', 'disabled');
					$phone.attr('disabled', 'disabled');
					$message.attr('disabled', 'disabled');
					$submit.attr('disabled', 'disabled');
					$.ajax({
						type: 'POST',
						url: 'includes/process-signup3.php',
						data: submitData + '&action=add',
						dataType: 'html',
						success: function(msg) {
							if (parseInt(msg, 0) !== 0) {
								var msg_split = msg.split('|');
								
								if (msg_split[0] === 'success') {
									$name.val('').removeAttr('disabled');
									$email.val('').removeAttr('disabled');
									$phone.val('').removeAttr('disabled');
									$message.val('').removeAttr('disabled');
									$submit.removeAttr('disabled');
									$form.siblings('.submit-status').html('<span class="success"><i class="ion ion-ios-checkmark-outline"></i> ' + msg_split[1] + '</span>').fadeIn(300).delay(3000).fadeOut(300);
								} else {
									$name.removeAttr('disabled');
									$email.removeAttr('disabled');
									$phone.removeAttr('disabled');
									$message.removeAttr('disabled');
									$submit.removeAttr('disabled');
									$form.siblings('.submit-status').html('<span class="error"><i class="ion ion-ios-close-outline"></i> ' + msg_split[1] + '</span>').fadeIn(300).delay(3000).fadeOut(300);
								}
							}
						}
					});
				}
				
				status = true;
				
				return false;
			});
			
		},
		
		// Button functions & settings
		Button: function() {
			
			var menuOpenProcess = false;
			
			$('#header .navbar-btn-toggle').on('click', function() {
				menuOpenProcess = true;
				
				if ($body.hasClass('nav-mobile-open')) {
					$body.removeClass('nav-mobile-open');
				} else {
					$body.addClass('nav-mobile-open');
				}
				
				setTimeout(function() {
					menuOpenProcess = false;
				}, 100);
			});
			
			$('#nav-mobile .navbar-btn-close').on('click', function() {
				$body.removeClass('nav-mobile-open');
			});
			
			$('#nav-mobile .nav li.menu-item-has-children > span').on('click', function() {
				menuOpenProcess = true;
				
				if ($(this).hasClass('in')) {
					$(this).siblings('ul').slideUp(200, function() {
						$(this).removeClass('in').siblings('span').removeClass('in').text('+');
						menuOpenProcess = false;
					});
				} else {
					$(this).addClass('in').text('-').siblings('ul').slideDown(200, function() {
						$(this).addClass('in');
						menuOpenProcess = false;
					});
				}
			});
			
			var filterOpenProcess = false;
			
			$('.products-nav .products-nav-filter').on('click', function(e) {
				filterOpenProcess = true;
				
				if ($body.hasClass('nav-shop-filter-open')) {
					$body.removeClass('nav-shop-filter-open');
				} else {
					$body.addClass('nav-shop-filter-open');
				}
				
				setTimeout(function() {
					filterOpenProcess = false;
				}, 100);
				
				e.preventDefault();
			});
			
			$('#nav-shop-filter .navbar-btn-close').on('click', function() {
				$body.removeClass('nav-shop-filter-open');
			});
			
			$('#body-wrap').on('click', function() {
				if ($body.hasClass('nav-mobile-open') && menuOpenProcess === false || $body.hasClass('nav-shop-filter-open') && filterOpenProcess === false) {
					$body.removeClass('nav-mobile-open').removeClass('nav-shop-filter-open');
				}
			});
			
			$('#navigation .navbar-secondary .btn-cart, #navigation .navbar-secondary .navbar-cart').on('mouseenter', function() {
				var $cart = $(this).parents('.navbar-secondary').find('.navbar-cart');
				
				if (!$cart.hasClass('in')) {
					$cart.addClass('in');
				}
			});
			
			$('#navigation .navbar-secondary .btn-cart, #navigation .navbar-secondary .navbar-cart').on('mouseleave', function() {
				$(this).parents('.navbar-secondary').find('.navbar-cart').removeClass('in');
			});
			
			$('#nav-mobile-top .navbar-secondary .btn-cart').on('click', function(e) {
				var $cart = $(this).parents('.navbar-secondary').find('.navbar-cart');
				
				if ($cart.hasClass('in')) {
					$cart.removeClass('in');
				} else {
					$cart.addClass('in');
				}
				
				e.preventDefault();
			});
			
			$('#navigation .navbar-secondary .btn-search, #nav-mobile-top .navbar-secondary .btn-search').on('click', function(e) {
				var $form = $(this).parents('.navbar-btn').next();
				
				$form.addClass('in');
				
				setTimeout(function() {
					$form.find('input[type="text"]').focus();
				}, 200);
				
				if ($(this).parents('#header.header-transparent').length > 0) {
					$(this).parents('.navbar').addClass('bg-white');
				}
				
				e.preventDefault();
			});
			
			$('#navigation .navbar-secondary .btn-close, #nav-mobile-top .navbar-secondary .btn-close').on('click', function() {
				$(this).parents('form').removeClass('in');
				
				if ($(this).parents('#header.header-transparent').length > 0) {
					$(this).parents('.navbar').removeClass('bg-white');
				}
			});
			
			$('.panel-group a[data-toggle="collapse"], .nav-tabs a').on('click', function() {
				setTimeout(function() {
					$window.trigger('resize.px.parallax');
				}, 400);
			});
			
			$('.panel-group-toggle .panel-heading a').each(function() {
				$(this).on('click', function() {
					var $elem	= $(this);
					var $tab_id	= $($elem.attr('href'));
					
					if ($tab_id.hasClass('in')) {
						$elem.addClass('collapsed');
						$tab_id.slideUp(300, function() {
							$(this).removeClass('in');
						});
					} else {
						$elem.removeClass('collapsed');
						$tab_id.slideDown(300, function() {
							$(this).addClass('in');
						});
					}
					
					return false;
				});
			});
			
			$('.products-nav .products-nav-options .option-selected').on('click', function() {
				if ($(this).hasClass('active')) {
					$(this).removeClass('active').siblings('.options-list').removeClass('in');
				} else {
					$(this).addClass('active').siblings('.options-list').addClass('in');
				}
			});
			
			$('.products-nav .products-nav-options .options-list li').on('click', function() {
				$(this).parents('.options-list').removeClass('in').find('li').removeClass('current');
				$(this).addClass('current');
				$(this).parents('.options-list').siblings('.option-selected').html($(this).html()).removeClass('active');
			});
			
			var $scrollUp = $('.scrollup');
			
			$body.waypoint(function() {
				$scrollUp.removeClass('visible');
			}, {
				offset: -130
			});
			
			$body.waypoint(function() {
				$scrollUp.addClass('visible');
			}, {
				offset: -131
			});
			
			$scrollUp.click(function() {
				$('html, body').stop().animate({
					scrollTop: 0
				}, 2000, 'easeOutExpo');
				
				return false;
			});
			
		},
		
		// Placeholder functions & settings
		Placeholder: function() {
			
			// Add placeholder text compatibility for IE8
			$('input, textarea').placeholder();
			
		},
		
		// Video functions & settings
		Video: function() {
			
			// Responsive video frame size
			$body.fitVids();
			
		},
		
		// Background functions & settings
		Background: function() {
			
			// Background with parallax scrolling effect
			$window.resize(function() {
				setTimeout(function() {
					$window.trigger('resize.px.parallax');
				}, 400);
			});
			
		},
		
		// Carousel functions & settings
		Carousel: function() {
			
			// Carousel arrows 2 columns
			$('.carousel-slider.carousel-arrows-2col').slick({
				speed: 400,
				slidesToShow: 2,
				slidesToScroll: 2,
				draggable: false,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							draggable: true
						}
					}
				]
			});
			
			// Carousel arrows 3 columns
			$('.carousel-slider.carousel-arrows-3col').slick({
				speed: 400,
				slidesToShow: 3,
				slidesToScroll: 3,
				draggable: false,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
							draggable: true
						}
					},
					{
						breakpoint: 481,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							draggable: true
						}
					}
				]
			});
			
			// Carousel arrows 4 columns
			$('.carousel-slider.carousel-arrows-4col').slick({
				speed: 400,
				slidesToShow: 4,
				slidesToScroll: 4,
				draggable: false,
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
							draggable: true
						}
					},
					{
						breakpoint: 481,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							draggable: true
						}
					}
				]
			});
			
			// Carousel arrows 5 columns
			$('.carousel-slider.carousel-arrows-5col').slick({
				speed: 400,
				slidesToShow: 5,
				slidesToScroll: 5,
				draggable: false,
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
							draggable: true
						}
					},
					{
						breakpoint: 481,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
							draggable: true
						}
					},
					{
						breakpoint: 301,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							draggable: true
						}
					}
				]
			});
			
			// Carousel arrows 6 columns
			$('.carousel-slider.carousel-arrows-6col').slick({
				speed: 400,
				slidesToShow: 6,
				slidesToScroll: 6,
				draggable: false,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 5,
							slidesToScroll: 5
						}
					},
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
							draggable: true
						}
					},
					{
						breakpoint: 481,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
							draggable: true
						}
					},
					{
						breakpoint: 301,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							draggable: true
						}
					}
				]
			});
			
			// Carousel dots 2 columns
			$('.carousel-slider.carousel-dots-2col').slick({
				arrows: false,
				dots: true,
				speed: 400,
				slidesToShow: 2,
				slidesToScroll: 2,
				draggable: false,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							draggable: true
						}
					}
				]
			});
			
			// Carousel dots 3 columns
			$('.carousel-slider.carousel-dots-3col').slick({
				arrows: false,
				dots: true,
				speed: 400,
				slidesToShow: 3,
				slidesToScroll: 3,
				draggable: false,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
							draggable: true
						}
					},
					{
						breakpoint: 481,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							draggable: true
						}
					}
				]
			});
			
			// Carousel dots 4 columns
			$('.carousel-slider.carousel-dots-4col').slick({
				arrows: false,
				dots: true,
				speed: 400,
				slidesToShow: 4,
				slidesToScroll: 4,
				draggable: false,
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
							draggable: true
						}
					},
					{
						breakpoint: 481,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							draggable: true
						}
					}
				]
			});
			
			// Carousel dots 5 columns
			$('.carousel-slider.carousel-dots-5col').slick({
				arrows: false,
				dots: true,
				speed: 400,
				slidesToShow: 5,
				slidesToScroll: 5,
				draggable: false,
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
							draggable: true
						}
					},
					{
						breakpoint: 481,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
							draggable: true
						}
					},
					{
						breakpoint: 301,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							draggable: true
						}
					}
				]
			});
			
			// Carousel dots 6 columns
			$('.carousel-slider.carousel-dots-6col').slick({
				arrows: false,
				dots: true,
				speed: 400,
				slidesToShow: 6,
				slidesToScroll: 6,
				draggable: false,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 5,
							slidesToScroll: 5
						}
					},
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
							draggable: true
						}
					},
					{
						breakpoint: 481,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
							draggable: true
						}
					},
					{
						breakpoint: 301,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							draggable: true
						}
					}
				]
			});
			
			// Carousel draggable 2 columns
			$('.carousel-slider.carousel-draggable-2col').slick({
				arrows: false,
				speed: 400,
				slidesToShow: 2,
				centerMode: false,
				swipeToSlide: true,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 1
						}
					}
				]
			});
			
			// Carousel draggable 3 columns
			$('.carousel-slider.carousel-draggable-3col').slick({
				arrows: false,
				speed: 400,
				slidesToShow: 3,
				centerMode: false,
				swipeToSlide: true,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2
						}
					},
					{
						breakpoint: 481,
						settings: {
							slidesToShow: 1
						}
					}
				]
			});
			
			// Carousel draggable 4 columns
			$('.carousel-slider.carousel-draggable-4col').slick({
				arrows: false,
				speed: 400,
				slidesToShow: 4,
				centerMode: false,
				swipeToSlide: true,
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 3
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2
						}
					},
					{
						breakpoint: 481,
						settings: {
							slidesToShow: 1
						}
					}
				]
			});
			
			// Carousel draggable 5 columns
			$('.carousel-slider.carousel-draggable-5col').slick({
				arrows: false,
				speed: 400,
				slidesToShow: 5,
				centerMode: false,
				swipeToSlide: true,
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 4
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 3
						}
					},
					{
						breakpoint: 481,
						settings: {
							slidesToShow: 2
						}
					},
					{
						breakpoint: 301,
						settings: {
							slidesToShow: 1
						}
					}
				]
			});
			
			// Carousel draggable 6 columns
			$('.carousel-slider.carousel-draggable-6col').slick({
				arrows: false,
				speed: 400,
				slidesToShow: 6,
				centerMode: false,
				swipeToSlide: true,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 5
						}
					},
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 4
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 3
						}
					},
					{
						breakpoint: 481,
						settings: {
							slidesToShow: 2
						}
					},
					{
						breakpoint: 301,
						settings: {
							slidesToShow: 1
						}
					}
				]
			});
			
			// Carousel nav
			$('.carousel-nav-btn a').on('click', function(e) {
				var $slider = $(this).parents('.carousel-nav-btn').siblings('.carousel-slider.carousel-nav-content');
				
				if ($(this).hasClass('nav-prev')) {
					$slider.slick('slickPrev');
				} else {
					$slider.slick('slickNext');
				}
				
				e.preventDefault();
			});
			
			$('.carousel-slider.carousel-nav-content').slick({
				arrows: false,
				speed: 300,
				slidesToShow: 4,
				draggable: false,
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 3
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2,
							draggable: true
						}
					},
					{
						breakpoint: 481,
						settings: {
							slidesToShow: 1,
							draggable: true
						}
					}
				]
			});
			
			// Testimonials
			$('.carousel-slider.carousel-testimonials').slick({
				speed: 400,
				fade: true,
				autoplay: true,
				autoplaySpeed: 5000,
				draggable: false,
				responsive: [{
					breakpoint: 768,
					settings: {
						draggable: true
					}
				}]
			});
			
			// Testimonials 2
			$('.carousel-slider.carousel-testimonials2').slick({
				speed: 300,
				autoplay: true,
				autoplaySpeed: 5000,
				draggable: false,
				responsive: [
					{
						breakpoint: 992,
						settings: {
							arrows: false,
							dots: true
						}
					},
					{
						breakpoint: 768,
						settings: {
							arrows: false,
							dots: true,
							draggable: true
						}
					}
				]
			});
			
			// Clients
			$('.carousel-slider.carousel-clients').slick({
				arrows: false,
				speed: 500,
				autoplay: true,
				autoplaySpeed: 5000,
				slidesToShow: 6,
				centerMode: false,
				swipeToSlide: true,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 3
						}
					},
					{
						breakpoint: 481,
						settings: {
							slidesToShow: 2
						}
					},
					{
						breakpoint: 301,
						settings: {
							slidesToShow: 1
						}
					}
				]
			});
			
			// Single product thumbnails
			$('.carousel-slider.carousel-product-thumbnails-nav').slick({
				arrows: false,
				speed: 300,
				infinite: false,
				slidesToShow: 5,
				vertical: true,
				focusOnSelect: true,
				verticalSwiping: true,
				swipeToSlide: true,
				asNavFor: '.carousel-slider.carousel-product-thumbnails',
				responsive: [
					{
						breakpoint: 1200
					}
				]
			});
			
			$('.carousel-slider.carousel-product-thumbnails-nav').on('breakpoint');
			
			$('.carousel-slider.carousel-product-thumbnails').slick({
				speed: 300,
				fade: true,
				infinite: false,
				swipe: false,
				asNavFor: '.carousel-slider.carousel-product-thumbnails-nav'
			});
			
			// General slider 2
			$('.carousel-slider.general-slider2').slick({
				arrows: false,
				dots: true,
				speed: 400,
				adaptiveHeight: true
			});
			
			// General slider 2 autoplay
			$('.carousel-slider.general-slider2-autoplay').slick({
				arrows: false,
				dots: true,
				speed: 400,
				adaptiveHeight: true,
				autoplay: true,
				autoplaySpeed: 5000
			});
			
			$('.carousel-slider.general-slider2, .carousel-slider.general-slider2-autoplay').on('beforeChange', function() {
				$('.slick-slide:not(.slick-current.slick-active) .slide-layer', this).each(function() {
					if ($(this).data('animation')) {
						$(this).removeClass('animated ' + $(this).data('animation'));
					}
				});
			});
			
			$('.carousel-slider.general-slider2, .carousel-slider.general-slider2-autoplay').on('afterChange', function() {
				$('.slick-slide .slide-layer', this).each(function() {
					if ($(this).data('animation')) {
						$(this).removeClass('animated ' + $(this).data('animation'));
					}
				});
				
				$('.slick-slide.slick-current.slick-active .slide-layer', this).each(function() {
					if ($(this).data('animation')) {
						$(this).addClass('animation animated ' + $(this).data('animation'));
					}
				});
			});
			
			// General slider
			$('.carousel-slider.general-slider').slick({
				dots: true,
				speed: 300,
				adaptiveHeight: true,
				draggable: false,
				responsive: [{
					breakpoint: 768,
					settings: {
						draggable: true
					}
				}]
			});
			
			// General slider autoplay
			$('.carousel-slider.general-slider-autoplay').slick({
				dots: true,
				speed: 300,
				adaptiveHeight: true,
				draggable: false,
				autoplay: true,
				autoplaySpeed: 5000,
				responsive: [{
					breakpoint: 768,
					settings: {
						draggable: true
					}
				}]
			});
			
		},
		
		// Lightbox functions & settings
		Lightbox: function() {
			
			// Preview images popup gallery with Fancybox
			$('.fancybox').fancybox({
				loop: false
			});
			
			$('.fancybox-media').attr('rel', 'media-gallery').fancybox({
				openEffect: 'none',
				closeEffect: 'none',
				prevEffect: 'none',
				nextEffect: 'none',
				arrows: false,
				helpers: {
					title: null,
					media: {},
					buttons : {}
				}
			});
			
		},
		
		// Tooltip functions & settings
		Tooltip: function() {
			
			// Tooltip element on hover
			$('.btn-tooltip').tooltip();
			
			// Popover element on click
			var $btnPopover = $('.btn-popover');
			$btnPopover.popover();
			$btnPopover.on('click', function(e) {
				e.preventDefault();
			});
			
		},
		
		// Isotope functions & settings
		Isotope: function() {
			
			// Filter elements with jQuery Isotope
			var $filter		= $('.isotope-menu');
			var $container	= $('.isotope-row, .isotope-row-noset');
			var $container2	= $('.isotope-row-masonry, .isotope-row-masonry-noset');
			
			// Initialize
			$window.load(function() {
				$container.isotope({
					filter			 : '*',
					layoutMode		 : 'fitRows',
					animationOptions : {
						duration : 400
					}
				}).on('arrangeComplete', function() {
					$window.trigger('resize.px.parallax');
				}).on('layoutComplete', function() {
					$window.trigger('resize.px.parallax');
				});
				
				$container2.isotope({
					filter			 : '*',
					animationOptions : {
						duration : 400
					},
					masonry : {
						columnWidth: 1
					}
				}).on('arrangeComplete', function() {
					$window.trigger('resize.px.parallax');
				}).on('layoutComplete', function() {
					$window.trigger('resize.px.parallax');
				});
			});
			
			// Trigger item lists filter when link clicked
			$filter.find('a').click(function() {
				var selector = $(this).attr('data-filter');
				
				$filter.find('a').removeClass('active');
				$(this).addClass('active');
				
				if ($container.length > 0) {
					$container.isotope({
						filter			 : selector,
						animationOptions : {
							animationDuration : 400,
							queue : false
						}
					});
				}
				
				if ($container2.length > 0) {
					$container2.isotope({
						filter			 : selector,
						animationOptions : {
							animationDuration : 400,
							queue : false
						}
					});
				}
				
				return false;
			});
			
		},
		
		// Counter functions & settings
		Counter: function() {
			
			// CounterUp element function
			$('.affa-counter > h4 > span, .affa-counter2 > h4 > span, .affa-progress-bar .progress-bar-line .bar-line-val > i').counterUp({
				delay: 10,
				time: 3000
			});
			
			// Progress Bar element function
			$('.affa-progress-bar .progress-bar-line .bar-line-overlay').each(function() {
				$(this).css('width', 0);
			});
			
			$('.affa-progress-bar .progress-bar-line .bar-line-val').each(function() {
				$(this).css('left', 0);
			});
			
			$('.affa-progress-bar').each(function() {
				$(this).waypoint(function() {
					var $elem = $(this).find('.progress-bar-line.in');
					
					$elem.find('.bar-line-overlay').animate({
						'width': $elem.find('.bar-line-overlay').html()
					}, 3000, 'easeOutExpo');
					
					$elem.find('.bar-line-val').animate({
						'left': $elem.find('.bar-line-overlay').html()
					}, 3000, 'easeOutExpo');
					
					$elem.removeClass('in');
				}, {
					offset: '95%'
				});
			});
			
			$('.affa-progress-bar2').each(function() {
				$(this).waypoint(function() {
					var $elem = $(this).find('.progress-bar-line.in');
					
					$elem.animate({
						'width': $elem.html()
					}, 3000, 'easeOutExpo');
					
					$elem.removeClass('in');
				}, {
					offset: '95%'
				});
			});
			
			if ($('.isotope-row, .isotope-row-noset').length > 0) {
				$window.on('resize', function() {
					setTimeout(function() {
						$('.affa-progress-bar').each(function() {
							$(this).waypoint(function() {
								var $elem = $(this).find('.progress-bar-line.in');
								
								$elem.find('.bar-line-overlay').animate({
									'width': $elem.find('.bar-line-overlay').html()
								}, 3000, 'easeOutExpo');
								
								$elem.find('.bar-line-val').animate({
									'left': $elem.find('.bar-line-overlay').html()
								}, 3000, 'easeOutExpo');
								
								$elem.removeClass('in');
							}, {
								offset: '95%'
							});
						});
					}, 500);
				});
			}
			
			// CounterDown element function
			$('.row-countdown').each(function() {
				$(this).countdown({
					until: new Date('01/01/2019'),
					layout: $(this).html()
				});
			});
			
		},
		
		// Twitter feeds functions & settings
		Tweets: function() {
			
			var $element  = $('.carousel-slider.carousel-tweets');
			var $element2 = $('.carousel-slider.carousel-tweets2');
			
			if ($element.length > 0 || $element2.length > 0) {
				$.ajax({
					url: 'includes/tweets/get-tweets.php',
					dataType: 'html',
					success: function(content) {
						var status = content.substr(0,5);
						
						if (status === 'error') {
							var output = content.split('|');
							
							if ($element.length > 0) {
								$element.html(output[1]).hide().fadeIn(1000);
							}
							
							if ($element2.length > 0) {
								$element2.html(output[1]).hide().fadeIn(1000);
							}
						} else {
							if ($element.length > 0) {
								$element.removeClass('no-content').html(content).hide().fadeIn(1000);
								$element.slick({
									speed: 400,
									fade: true,
									autoplay: true,
									autoplaySpeed: 5000,
									draggable: false,
									responsive: [{
										breakpoint: 768,
										settings: {
											draggable: true
										}
									}]
								});
							}
							
							if ($element2.length > 0) {
								$element2.removeClass('no-content').html(content).hide().fadeIn(1000);
								$element2.slick({
									arrows: false,
									dots: true,
									speed: 300,
									autoplay: true,
									autoplaySpeed: 5000,
									draggable: false,
									responsive: [{
										breakpoint: 768,
										settings: {
											draggable: true
										}
									}]
								});
							}
						}
					}
				});
			}
			
		},
		
		// Animation functions & settings
		Animation: function() {
			
			// Embed animation effects to HTML elements with CSS3
			$('.animation, .animation-visible').each(function() {
				var $element = $(this);
				
				$element.waypoint(function() {
					var delay = 0;
					
					if ($element.data('delay')) {
						delay = parseInt($element.data('delay'), 0);
					}
					
					if (!$element.hasClass('animated')) {
						setTimeout(function() {
							$element.addClass('animated ' + $element.data('animation'));
						}, delay);
					}
					
					delay = 0;
				}, {
					offset: '80%'
				});
			});
			
		}
		
	};
	
	// Run the main function
	$(function() {
		Unicom.init();
	});
	
})(window.jQuery);
