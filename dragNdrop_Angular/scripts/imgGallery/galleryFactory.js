(function(){
	'use strict';

	angular.module('myApp')
	.factory('galleryFactory', galleryFactory);
	galleryFactory.$inject = [];

	function galleryFactory () {

		var imgBase64LocalStorageArray = [];

		return {
			displayImage: displayImage,
		};

		function addImage (imageObj, context, options, isLocalStorage, canvas) {
			imageObj.onload = function () {
				scaleImage (imageObj, options);
				context.drawImage (imageObj, canvas.width/2 - imageObj.width/2, canvas.height/2 - imageObj.height/2 , imageObj.width ,imageObj.height);
				if ( isLocalStorage != true ) { toDataUlrArray (imageObj); };
				imageObj.onload = null;
			};
		};

		function toDataUlrArray (dataUrl) {
			var tempUrl = dataUrl.src;
			imgBase64LocalStorageArray.push(tempUrl);
			localStorage.setItem("img", JSON.stringify(imgBase64LocalStorageArray));
		};

		function displayImage (file, options, isLocalStorage) {
			var defaults = options;
			var canvas = MakeCanvas (defaults);
			var context = canvas.getContext ("2d");
			var imageObj = new Image ();
			imageObj.src = file;
			addImage (imageObj, context, defaults, isLocalStorage, canvas);
			fullSizeClick (canvas, imageObj.src);
		};

		function MakeCanvas (options) {
			var newCanvas = document.createElement ("canvas");
			var dest = options.imgContainer;
			newCanvas.width = options.thumbWidth;
			newCanvas.height = options.thumbHeight;
			return dest.appendChild (newCanvas);
		};

		function scaleImage (imageObj, options) {
			var thumbDimension = options.thumbDimension;
			var tempObj = imageObj;
			if (tempObj.width > tempObj.height) {
				tempObj.height = (thumbDimension * tempObj.height) / tempObj.width;
				tempObj.width = thumbDimension;
			} else {
				tempObj.width = (thumbDimension * tempObj.width) / tempObj.height;
				tempObj.height = thumbDimension;
			};
			return tempObj;
		};

		function fullSizeClick (elem, target) {
			elem.onclick = function () {
				window.open("" + target + "", "_blank", "width:100%;height:100%");
			};
		};
	};
})();
