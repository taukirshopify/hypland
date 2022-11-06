(function ($) {
  "use strict";
  /*=================================
      JS Index Here
  ==================================*/
  /*
    01. Mobile Menu Active
    02. Sticky fix
    03. Slider Activations
    04. OT Tab
    05. Slick Refresh
    06. Search Toogle
    07. Blog Favourite
    08. Quantity Plus Minus
  */

  /*---------- 01. Mobile Menu Active ----------*/
  $.fn.otmobilemenu = function (options) {
    var opt = $.extend({
      menuToggleBtn: '.ot-menu-toggle',
      bodyToggleClass: 'ot-body-visible',
      subMenuClass: 'ot-submenu',
      subMenuParent: 'ot-item-hot-children',
      subMenuParentToggle: 'ot-active',
      meanExpandClass: 'ot-mean-expand',
      appendElement: '<span class="ot-mean-expand"></span>',
      subMenuToggleClass: 'ot-open',
      toggleSpeed: 400,
    }, options);

    return this.each(function () {
      var menu = $(this); // Select menu

      // Menu Show & Hide
      function menuToggle() {
        menu.toggleClass(opt.bodyToggleClass);

        // collapse submenu on menu hide or show
        var subMenu = '.' + opt.subMenuClass;
        $(subMenu).each(function () {
          if ($(this).hasClass(opt.subMenuToggleClass)) {
            $(this).removeClass(opt.subMenuToggleClass);
            $(this).css('display', 'none')
            $(this).parent().removeClass(opt.subMenuParentToggle);
          };
        });
      };

      // Class Set Up for every submenu
      menu.find('li').each(function () {
        var submenu = $(this).find('ul');
        submenu.addClass(opt.subMenuClass);
        submenu.css('display', 'none');
        submenu.parent().addClass(opt.subMenuParent);
        submenu.prev('a').append(opt.appendElement);
        submenu.next('a').append(opt.appendElement);
      });

      // Toggle Submenu
      function toggleDropDown($element) {
        if ($($element).next('ul').length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).next('ul').slideToggle(opt.toggleSpeed);
          $($element).next('ul').toggleClass(opt.subMenuToggleClass);
        } else if ($($element).prev('ul').length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).prev('ul').slideToggle(opt.toggleSpeed);
          $($element).prev('ul').toggleClass(opt.subMenuToggleClass);
        };
      };

      // Submenu toggle Button
      var expandToggler = '.' + opt.meanExpandClass;
      $(expandToggler).each(function () {
        $(this).on('click', function (e) {
          e.preventDefault();
          toggleDropDown($(this).parent());
        });
      });

      // Menu Show & Hide On Toggle Btn click
      $(opt.menuToggleBtn).each(function () {
        $(this).on('click', function () {
          menuToggle();
        })
      })

      // Hide Menu On out side click
      menu.on('click', function (e) {
        e.stopPropagation();
        menuToggle()
      })

      // Stop Hide full menu on menu click
      menu.find('div').on('click', function (e) {
        e.stopPropagation();
      });

    });
  };

  $('.ot-menu-wrapper').otmobilemenu();


  /*---------- 02. Sticky fix ----------*/
  var lastScrollTop = '';
  var scrollToTopBtn = '.scrollToTop'

  function stickyMenu($targetMenu, $toggleClass, $parentClass) {
    var st = $(window).scrollTop();
    var height = $targetMenu.css('height');
    $targetMenu.parent().css('min-height', height);
    if ($(window).scrollTop() > 400) {
      $targetMenu.parent().addClass($parentClass);

      if (st > lastScrollTop) {
        $targetMenu.removeClass($toggleClass);
      } else {
        $targetMenu.addClass($toggleClass);
      };
    } else {
      $targetMenu.parent().css('min-height', '').removeClass($parentClass);
      $targetMenu.removeClass($toggleClass);
    };
    lastScrollTop = st;
  };
  $(window).on("scroll", function () {
    stickyMenu($('.sticky-active'), "active", "will-sticky");
    if ($(this).scrollTop() > 500) {
      $(scrollToTopBtn).addClass('show');
    } else {
      $(scrollToTopBtn).removeClass('show');
    }
  });

  //** scroll background color start **//
  $(window).on("scroll", function() {
    if ($(window).scrollTop() > 400) {
      $('.sticky-active').addClass('active');
    }
    else {
      $('.sticky-active').removeClass('active');
    }
  })
  //** scroll background color end 

  /*----------- 03. Slider Activations ----------*/

  // Function For Custom Arrow Btn 
  $('[data-slick-next]').each(function () {
    $(this).on('click', function (e) {
      e.preventDefault()
      $($(this).data('slick-next')).slick('slickNext');
    })
  })

  $('[data-slick-prev]').each(function () {
    $(this).on('click', function (e) {
      e.preventDefault()
      $($(this).data('slick-prev')).slick('slickPrev');
    })
  })

  $('#featuredSlide').slick({
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
    appendDots: $('.slider-nav-wrap').find('.custom-dots'),
  });

  $('#productSlide1').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  });

  $('#productSlide2').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  $('#productSlide3').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.filter-menu',
  });

  $('.filter-menu').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '#productSlide3',
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  $('#productSlide4').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  });

  $('#productSlide5').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  });

  $('#blogFeatured').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  $('#bloglide1').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  });

  	/*---------- 04. OT Tab ----------*/
  	$.fn.otTab = function (options) {
		var opt = $.extend(
			{
				sliderTab: false,
				tabButton: "button",
			},
			options
		);

		$(this).each(function () {
			var $menu = $(this);
			var $button = $menu.find(opt.tabButton);

			// On Click Button Class Remove and indecator postion set
			$button.on("click", function (e) {
				e.preventDefault();
				var cBtn = $(this);
				cBtn.addClass("active").siblings().removeClass("active");
				if (opt.sliderTab) {
					$(slider).slick("slickGoTo", cBtn.data("slide-go-to"));
				}
			});

			// Work With slider
			if (opt.sliderTab) {
				var slider = $menu.data("asnavfor"); // select slider

				// Select All button and set attribute
				var i = 0;
				$button.each(function () {
					var slideBtn = $(this);
					slideBtn.attr("data-slide-go-to", i);
					i++;

					// Active Slide On load > Actived Button
					if (slideBtn.hasClass("active")) {
						$(slider).slick(
							"slickGoTo",
							slideBtn.data("slide-go-to")
						);
					}

					// Change Indicator On slide Change
					$(slider).on(
						"beforeChange",
						function (event, slick, currentSlide, nextSlide) {
							$menu
							.find(
								opt.tabButton +
									'[data-slide-go-to="' +
									nextSlide +
									'"]'
							)
							.addClass("active")
							.siblings()
							.removeClass("active");
						}
					);
				});
			}
		});
	};

	// Call On Load
	if ($(".filter-tab").length) {
		$(".filter-tab").otTab({
			sliderTab: true,
			tabButton: ".tab-btn",
		});
	}
	// Call On Load
	if ($(".product-thumb-tab").length) {
		$(".product-thumb-tab").otTab({
			sliderTab: true,
			tabButton: ".tab-btn",
		});
	}

  /*----------- 05. Slick Refresh ----------*/
  $(window).on("resize", function () {
    $(".slick-slider").slick("refresh");
  });

  /*----------- 06. Search Toogle ----------*/
  $('.search-form button').on('click', function (e) {
      $('.search-form input').toggleClass('active');
  });

  /*----------- 07. Blog Favourite ----------*/
  $('.blog-favourite').on('click', function (e) {
      $(this).toggleClass('added');
  });

   /*----------- 08. Quantity Plus Minus ----------*/

  $(".quantity-plus").each(function () {
      $(this).on("click", function (e) {
    e.preventDefault();
    var $qty = $(this).siblings(".qty-input");
    var currentVal = parseInt($qty.val());
    if (!isNaN(currentVal)) {
      $qty.val(currentVal + 1);
    }
      });
  });

  $(".quantity-minus").each(function () {
      $(this).on("click", function (e) {
    e.preventDefault();
    var $qty = $(this).siblings(".qty-input");
    var currentVal = parseInt($qty.val());
    if (!isNaN(currentVal) && currentVal > 1) {
      $qty.val(currentVal - 1);
    }
      });
  });
 
})(jQuery);
