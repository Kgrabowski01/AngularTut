(function(){
	'use strict';

	angular.module('myApp')
	.factory('fileProcFactory', fileProcFactory);
	fileProcFactory.$inject = [];
	function fileProcFactory () {

		return {
			loadImages: loadImages
		};

		function loadImages (event, callback, config) {
			var files = event;
			var options = config;
			var reader = new FileReader ();
			for ( var i = 0, img ; img = files[i]; i++ ) {
				if ( isCanvasSupported (options) && isImage (img, options) ) {
					var item = URL.createObjectURL(files[i]);
					callback(item, options);
				};
			};
		};

		function isCanvasSupported (options) {
			var elem = document.createElement ("canvas");
			var message = (options.canvasNotSupp);
			if (!elem.getContext) {
				alert (message);
				return  false;
			};
			return true;
		};

		function isImage (test, options) {
			var file = test;
			if ( file.type.match ( "image.*" )) {
				return true;
			} else {
				alert (options.message);
				return false;
			};
		};
	};
})();
