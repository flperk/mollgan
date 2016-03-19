$(document).ready(function(){
	$("[href]").each(function(){
		if(this.href == window.location.href){
			console.log('funka?')
			$(this).addClass("currentLink");
		}
	});
});
$("#heart").click(function() { 
       var _this = $(this);
       var current = _this.attr("src");
       var swap = _this.attr("data-swap");     
     _this.attr('src', swap).attr("data-swap",current);   
});  