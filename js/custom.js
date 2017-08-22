define([
	'domready',
	'jquery',
	'bootstrap',
	'scrollTo',
	'wow'
 
], function(domready, $){
	
	(function(){
		
		var mainMenu = {
			menuContainer: $('.menu-region').find('.main-menu'),
			maskOverlayContainer:$('.mask-overlay'),

			init: function(){	
				$('.menu-region').find('.nav li ul').each(function(){
					$(this).addClass('nav');
					$(this).parent('li').addClass('hasChild');	
				});
				this.bindEvents();
			},

			bindEvents: function(){
				$(document).on('click', '.show-menu', this.menuOpenHandler);
				$(document).on('click', '.hide-menu, .mask-overlay', this.menuCloseHandler);
				
				$('.menu-region').find('.nav li a').on('click', this.onClickHandler);			
				//$('.menu-region ').find('.nav li.hasChild > a').on('click', this.expandCollapseSubMenu);
			},

			menuOpenHandler: function(e){
				e.preventDefault();
				
				if(!mainMenu.menuContainer.hasClass('visible')) { 
					mainMenu.menuContainer.addClass('visible');
					mainMenu.maskOverlayContainer.addClass('visible');
					$('html').addClass('main-menu-visible');
				}else{
					mainMenu.menuContainer.removeClass('visible')
					mainMenu.maskOverlayContainer.removeClass('visible');
					$('html').removeClass('main-menu-visible');
				}
			},
			
			menuCloseHandler: function(){
				if(!mainMenu.menuContainer.hasClass('visible')) { 
					mainMenu.menuContainer.addClass('visible');
					mainMenu.maskOverlayContainer.addClass('visible');
					$('html').addClass('main-menu-visible');
				}else{
					mainMenu.menuContainer.removeClass('visible')
					mainMenu.maskOverlayContainer.removeClass('visible');
					$('html').removeClass('main-menu-visible');
				}
			},

			clickItemHandler: function(e,scriptURL,type){
				//e.preventDefault();

				//scriptURL = $(this).attr('href');
				//console.log(scriptURL);

				//$('.region-mainContent').load(scriptURL);

				//mainMenu.menuCloseHandler();

				/*$.ajax({
					url: scriptURL,
					dataType: type,
					async: false, 
					success: function () {
						console.log(scriptURL + ' included ... ');
						$('.region-mainContent').html().load(scriptURL);
					},
					error: function () {
						throw new Error("Could not load script " + script);
					}
				});*/
			},

			onClickHandler: function(e){
				//e.preventDefault();	
				var getUrl = $(this).attr('href');
				console.log(e.currentTarget);
				console.log(getUrl);

				if(getUrl !== '#'){
					return true;
				} else{
					e.preventDefault();	
					mainMenu.expandCollapseSubMenu(this);
				}

			},
		
		expandCollapseSubMenu: function(el){
				//$('.menu-region').find('.nav li.hasChild > ul').slideUp();
				//$('.menu-region').find('.nav li.hasChild').removeClass('expanded');
				console.log($(el).closest('li').attr('class'));
			
				if(!$(el).closest('li').hasClass('expanded')){	
					$('.menu-region').find('.nav li.hasChild > ul').slideUp();
					$('.menu-region').find('.nav li.hasChild').removeClass('expanded');
					$(el).closest('li').find('>ul').slideDown();
					$(el).closest('li').addClass('expanded');
										
				}else{
					//$(el).closest('li').find('>ul').slideUp();
					//$(el).closest('li').removeClass('expanded');
				};

			},

		};
		
		var sectionFullScreen ={
			
			init: function(){
				this.bindEvents();
				this.adjustSectionHeight();	
				new WOW().init();
			},
			
			bindEvents: function(){
				$(window).on('resize', this.adjustSectionHeight);
				$(document).on('click', 'a.page-scroll', this.eventScrollTo);
								
			},
			
			adjustSectionHeight: function(){
				var windowWidth = $(window).width();
				if(windowWidth > 992){
					var windowHeight = $(window).height();
					var containerHeight = windowHeight;
					//$('.section-1, .section-3, .section-4').css({'height':containerHeight});
				} else{
					//$('.section-1, .section-3, .section-4').css({'height':'auto'});
				}
			},
			
			eventScrollTo: function(event){
				console.log(event);
				var $anchor = $(this);
				console.log($anchor.attr('href'));
				$('html, body').stop().animate({
					scrollTop: $($anchor.attr('href')).offset().top
				}, 1000);
				event.preventDefault();		
			},
			
		};
		
		var stickyHeader = {
			headerContainer: $('#region-header'),

			init: function(){	
				$(document).on('scroll', this.bindStickyHeader);
				$(window).on('load', this.bindStickyHeader);
			},
			
			bindStickyHeader: function(){
				var getOffset = stickyHeader.headerContainer.offset();
				console.log(getOffset.top)

				if (getOffset.top > 40) {
					stickyHeader.headerContainer.addClass("sticky-header");
				} else {
					stickyHeader.headerContainer.removeClass("sticky-header");
				}
			}
			
			
		};
		
		mainMenu.init();
		stickyHeader.init();
		sectionFullScreen.init();
		
	})();
	
});