'use strict';
var Movie = function(movieid,viewCount,likeCount,favoriteCount,dislikeCount,commentCount){
  this.MovieID = movieid;
  this.View = viewCount;
  this.Like = likeCount;
  this.Favorite = favoriteCount;
  this.Dislike = dislikeCount;
  this.Comment = commentCount;
  this.Url = "https://www.youtube.com/embed/"+movieid+"?rel=0&amp;showinfo=0";
}
angular.module('YoutubeLibary')
.controller('MainCtrl', ['$scope', '$localStorage', '$http', '$q', '$filter', 'ngTableParams' , function($scope, $localStorage, $http, $q, $filter, ngTableParams){
  if(!$localStorage.hasOwnProperty('newMovies')){
    $localStorage.newMovies = [];
  }
  $scope.data = $localStorage.newMovies;
  $scope.AddMovie = function () {
    $scope.GetVideoID($scope.newmovie).then(function(videoID){
      $scope.GetMovieInfo(videoID).then(function(s){
        $localStorage.newMovies.push(new Movie(videoID,s[0].statistics.viewCount,s[0].statistics.likeCount,s[0].statistics.favoriteCount,s[0].statistics.dislikeCount,s[0].statistics.commentCount));
        $scope.newmovie = "";
      },function(e){
        console.log(e);
      });

    },function(e){
      console.log(e);
    })
  };

  $scope.tableParams = new ngTableParams({
    page: 1,            // show first page
    count: 10,          // count per page
    sorting: {
      View: 'asc'     // initial sorting
    }
  }, {
    total: $scope.data.length, // length of data
    getData: function($defer, params) {
      // use build-in angular filter
      var orderedData = params.sorting() ?
      $filter('orderBy')($scope.data, params.orderBy()) :
      $scope.data;
      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    }
  });

  $scope.RemoveVideo = function(id,index){
    $scope.data.splice(index, 1);
    $localStorage.newMovies = $scope.data;
    console.log(id);
    console.log(index);
  }
  $scope.GetVideoID = function(param){
    var def = $q.defer();
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = param.match(regExp);
    if (match && match[2].length == 11) {
      def.resolve(match[2]);
    }else if(param.length == 11){
      def.resolve(param);
    } else {
      def.reject(false);
    }
    return def.promise;
  }

  $scope.GetMovieInfo = function(id){
    var def = $q.defer();
    $http.get("https://www.googleapis.com/youtube/v3/videos?id="+ id +"&key=AIzaSyDWzSHDPL1zB2OlOhjo327IybIwyj4_2u4%20&fields=items(statistics)&part=statistics")
    .success(function (response) {
      def.resolve(response.items);
    }).error(function(error) {
      def.reject(error);
    });;
    return def.promise;
  }

  $scope.onDropComplete = function (index, obj, evt) {
    var otherObj = $scope.data[index];
    var otherIndex = $scope.data.indexOf(obj);
    $scope.data[index] = obj;
    $scope.data[otherIndex] = otherObj;
  }

}]);
