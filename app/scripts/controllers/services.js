'use strict';
var youtubeServices = angular.module('youtubeServices',[]);

/*youtubeServices.service ('Movie', function (movieid,viewCount,likeCount,favoriteCount,dislikeCount,commentCount) {
  var infoxx =  function ()
{  this.MovieID = movieid;
  this.View = viewCount;
  this.Like = likeCount;
  this.Favorite = favoriteCount;
  this.Dislike = dislikeCount;
  this.Comment = commentCount;
  this.Url = "https://www.youtube.com/embed/"+movieid+"?rel=0&amp;showinfo=0";
}

  return {infoxx
  }
});

youtubeServices.service ('GetMovieInfo',function(id){
  var def = $q.defer();
  $http.get("https://www.googleapis.com/youtube/v3/videos?id="+ id +"&key=AIzaSyDWzSHDPL1zB2OlOhjo327IybIwyj4_2u4%20&fields=items(statistics)&part=statistics")
  .success(function (response) {
    def.resolve(response.items);
  }).error(function(error) {
    def.reject(error);
  });;
  return def.promise;
})
*/
