(function(){
  'use strict';
  angular.module('myApp')
  .factory('galleryConfig', galleryConfig);
  galleryConfig.$inject = [];

  function galleryConfig (options)
  {
    var options = options || {};
    var imgContainer = document.getElementById("imgOutput")
    var uploadField = document.getElementById("files");
    var thumbWidth = options.thumbWidth || 150;
    var thumbHeight= options.thumbHeight || 150;
    var thumbDimension= options.thumbDimension || 150;
    var message= options.message || "Wrong file, choose image";
    var canvasNotSupp= options.canvasNotSupp || "Canvas not supported!";
    
    return {
      thumbWidth: thumbWidth,
      thumbHeight: thumbHeight,
      thumbDimension: thumbDimension,
      imgContainer: imgContainer,
      uploadField: uploadField,
      message: message,
      canvasNotSupp: canvasNotSupp,
    };
  };
})();
