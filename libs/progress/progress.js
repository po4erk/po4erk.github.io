window.onload = function(){
    moveProgressBar();
    moveProgressBarFirst();
    moveProgressBarSecond();
    moveProgressBarThird();
    // on browser resize...
    $(window).resize(function() {
        moveProgressBar();
        moveProgressBarFirst();
        moveProgressBarSecond();
        moveProgressBarThird();
    });

    // SIGNATURE PROGRESS
    function moveProgressBar() {
      console.log("moveProgressBar");
        var getPercent = ($('.progress-wrap').data('progress-percent') / 100);
        var getProgressWrapWidth = $('.progress-wrap').width();
        var progressTotal = getPercent * getProgressWrapWidth;
        var animationLength = 1500;
        
        // on page load, animate percentage bar to data percentage length
        // .stop() used to prevent animation queueing
        $('.progress-bar').stop().animate({
            left: progressTotal
        }, animationLength);
    }
    function moveProgressBarFirst() {
      console.log("moveProgressBarFirst");
        var getPercentFirst = ($('.progress-wrap-1').data('progress-percent') / 100);
        var getProgressWrapWidthFirst = $('.progress-wrap-1').width();
        var progressTotalFirst = getPercentFirst * getProgressWrapWidthFirst;
        var animationLengthFirst = 1500;
        
        // on page load, animate percentage bar to data percentage length
        // .stop() used to prevent animation queueing
        $('.progress-bar-1').stop().animate({
            left: progressTotalFirst
        }, animationLengthFirst);
    }
    function moveProgressBarSecond() {
      console.log("moveProgressBarSecond");
        var getPercentSecond = ($('.progress-wrap-2').data('progress-percent') / 100);
        var getProgressWrapWidthSecond = $('.progress-wrap-2').width();
        var progressTotalSecond = getPercentSecond * getProgressWrapWidthSecond;
        var animationLengthSecond = 1500;
        
        // on page load, animate percentage bar to data percentage length
        // .stop() used to prevent animation queueing
        $('.progress-bar-2').stop().animate({
            left: progressTotalSecond
        }, animationLengthSecond);
    }
    function moveProgressBarThird() {
      console.log("moveProgressBarThird");
        var getPercentThird = ($('.progress-wrap-3').data('progress-percent') / 100);
        var getProgressWrapWidthThird = $('.progress-wrap-3').width();
        var progressTotalThird = getPercentThird * getProgressWrapWidthThird;
        var animationLengthThird = 1500;
        
        // on page load, animate percentage bar to data percentage length
        // .stop() used to prevent animation queueing
        $('.progress-bar-3').stop().animate({
            left: progressTotalThird
        }, animationLengthThird);
    }
}