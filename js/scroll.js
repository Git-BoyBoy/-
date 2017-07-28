function getId( id ) { return document.getElementById( id ); }

function hide( obj ) { obj.style.display = "none"; }

function show( obj ) { obj.style.display = "block"; }

function scroll () {
	if( window.pageXOffset != null ){
		return {
			left : window.pageXOffset,
			top : window.pageYOffset
		}
	} else if ( document.compatMode == "CSS1Compat" ){
		return {
			left : document.documentElement.scrollLeft,
			top : document.documentElement.scrollTop
		}
	} else {
		return {
			left : document.body.scrollLeft,
			top : document.body.scrollTop
		}
	}
}




