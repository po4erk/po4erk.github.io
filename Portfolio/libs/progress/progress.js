window.onload = function(){
    moveProgressBar('.progress-wrap','progress-percent','.progress-bar');
    moveProgressBar('.progress-wrap-1','progress-percent','.progress-bar-1');
    moveProgressBar('.progress-wrap-2','progress-percent','.progress-bar-2');
    moveProgressBar('.progress-wrap-3','progress-percent','.progress-bar-3');
    $(window).resize(function() {
        moveProgressBar('.progress-wrap','progress-percent','.progress-bar');
        moveProgressBar('.progress-wrap-1','progress-percent','.progress-bar-1');
        moveProgressBar('.progress-wrap-2','progress-percent','.progress-bar-2');
        moveProgressBar('.progress-wrap-3','progress-percent','.progress-bar-3');
    });

    function moveProgressBar(x,y,z) {
        var getPercent = ($(x).data(y) / 100);
        var getProgressWrapWidth = $(x).width();
        var progressTotal = getPercent * getProgressWrapWidth;
        var animationLength = 2500;

        $(z).stop().delay(2000).animate({
            left: progressTotal
        }, animationLength);
    }
}
