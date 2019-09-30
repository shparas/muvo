var mainFunctions = {
	setDisplayToNone : function(elem){ 
		elem.style.display = "none";
	},
	stopEvent : function(e){
		e.stopPropagation();
	},
	// for cross and cancel elements, useful for cards
	activateCross : function(){
		var crossElements = document.getElementsByClassName("cross");
		for (var i = 0; i <  crossElements.length; i++){
			crossElements[i].addEventListener("click", function(e){ mainFunctions.setDisplayToNone(this.parentElement.parentElement.parentElement);});
			crossElements[i].parentElement.addEventListener("click", function(e){ mainFunctions.stopEvent(e);});
		}
	},
	activateCancelBg : function(){
		var cancelElements = document.getElementsByClassName("full-dark-bg");
		for (var i = 0; i <  cancelElements.length; i++)
			cancelElements[i].addEventListener("click", function(e){ mainFunctions.setDisplayToNone(this);});
	}
}
mainFunctions.activateCross();
mainFunctions.activateCancelBg();


