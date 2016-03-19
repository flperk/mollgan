$(document).ready(function(){
	$("[href]").each(function(){
		if(this.href == window.location.href){
			console.log('funka?')
			$(this).addClass("currentLink");
		}
	});
});

