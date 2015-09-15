(function(){
	'use strict';

	angular.module('myApp')
	.directive('initGallery', function (fileProcFactory, galleryFactory, galleryConfig) {
		return {
			restrict: 'A',
			//template: '<input class="dropper invis" type="file" id="files" name="files[]" multiple ></br><output id="imgOutput"></output>',
			link: function(scope, element)
					{
						function galleryInitModule () {
							var config = galleryConfig;
							console.log(config.uploadField);
							config.uploadField.addEventListener("change", function(e) {
								fileProcFactory.loadImages(e.target.files, galleryFactory.displayImage, config);
							});
							window.addEventListener('storage', storageEventHandler, false);
							function storageEventHandler(){
								window.location.reload();
							};
							if (localStorage.img) {
								var isLocalStorage = true;
								var storageGallery = function () {
									var filesDataUrl = localStorage.getItem("img");
									var imagesJson = JSON.parse(filesDataUrl);
									var length = imagesJson.length;
									for ( var i = 0 ; i <= length -1 ; i++ ) {
										galleryFactory.displayImage(imagesJson[i], config, isLocalStorage);
									};
								};
								storageGallery();
							};
						};
						galleryInitModule ();
					},
				};
			});
})();
