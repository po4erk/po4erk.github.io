$(function () {
    $('a[class^=link]').on('click', function () {
        function clear() {
            $('div[class^=element]').css({
                display: 'none'
            });
        }
        var $class = $(this).attr('class');
        if ($class == 'linkAbout') {
            clear();
            $('.elementAbout').fadeIn(1000);
        } else if ($class == 'linkProject') {
            clear();
            $('.elementProject').fadeIn(1000);
        } else if ($class == 'linkContacts') {
            clear();
            $('.elementContacts').fadeIn(1000);
        };
    });
    $('.btn-slide').on('click', function () {
        $('.slide').toggle('slide', 'left', 400);
        event.preventDefault();
        if ($(this).hasClass("isDown")) {
            $(".btn-slide").stop().animate({ 'left': "0" }, 400);
            $('.about-wrapper,.project-wrapper,.contacts-wrapper').animate({ 'left': "0" }, 600).css('width', '75%');
        } else {
            $(".btn-slide").stop().animate({ 'left': "-240px" }, 400);
            $('.about-wrapper').animate({ 'left': "-200px" }, 600).css('width', '90%');
            $('.project-wrapper').animate({ 'left': "-230px" }, 600).css('width', '95%');
            $('.contacts-wrapper').animate({ 'left': "-200px" }, 600).css('width', '95%');
        }
        $(this).toggleClass("isDown");
        return false;
    });
    $("img").lazyload({ effect: "fadeIn" });
    $("a[rel='colorbox']").colorbox({
        maxWidth: "100%",
        opacity: "0.9",
        current: "Site {current} for {total}"
    });
    $(window).load(function () {
        $(".loader").delay(2000).fadeOut(1200);
    });
});