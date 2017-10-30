$(document).ready(function() {
function randomFromTo(from, to){
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function shuffle() {
	var children = $("#container").children();
	var child = $("#container div:first-child");	
	var array_img = new Array();

	for (i=0; i<children.length; i++) {		
		array_img[i] = $("#"+child.attr("id")+" img").attr("src");
		child = child.next();
	}
	
	var child = $("#container div:first-child");
	
	for (z=0; z<children.length; z++) {
		randIndex = randomFromTo(0, array_img.length - 1);
		
		$("#"+child.attr("id")+" img").attr("src", array_img[randIndex]);
		array_img.splice(randIndex, 1);
		
		child = child.next();
	}
}
setInterval(shuffle, 3000);
});
