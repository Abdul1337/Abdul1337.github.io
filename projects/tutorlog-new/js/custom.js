    /*Sticky Header JS Starts*/
    $(window).scroll(function () {
        /* affix after scrolling 100px */
        if ($(document).scrollTop() > 100) {
            $('.mymenu').addClass('menu_scroll');
        }
        else {
            $('.mymenu').removeClass('menu_scroll');
        }
    });
    /*Sticky Header JS Ends*/
    $(document).ready(function () {
        /* ripple effect */
        $(function () {
            var ink, d, x, y;
            $(".ripplelink").mouseover(function (e) {
                if ($(this).find(".ink").length === 0) {
                    $(this).prepend("<span class='ink'></span>");
                }
                ink = $(this).find(".ink");
                ink.removeClass("animate");
                if (!ink.height() && !ink.width()) {
                    d = Math.max($(this).outerWidth(), $(this).outerHeight());
                    ink.css({
                        height: d
                        , width: d
                    });
                }
                x = e.pageX - $(this).offset().left - ink.width() / 2;
                y = e.pageY - $(this).offset().top - ink.height() / 2;
                ink.css({
                    top: y + 'px'
                    , left: x + 'px'
                }).addClass("animate");
            });
        });
    });
    $('.counter').counterUp({
        delay: 10
        , time: 1000
    });
    $('.counter').addClass('animated fadeInDownBig');
    $('h3').addClass('animated fadeIn');
    /*----carousel----*/
    $(document).ready(function () {
        var owl = $('.owl-carousel');
        owl.owlCarousel({
            margin: 5
            , nav: false
            , loop: true
            , responsive: {
                0: {
                    items: 1
                }
                , 600: {
                    items: 1.1
                }
                , 1000: {
                    items: 1.8
                }
                , 1280: {
                    items: 3
                }
            }
        })
    })