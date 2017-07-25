'use strict';
//service

// @ngInject

var getSearch = function($http,$q){

	return function(search){

    var promises = [];

    angular.forEach(search, function(srch){

      var deferred  = $q.defer();

      $http({
 		 method: 'GET',
  		 url: srch,
	  }).then(function successCallback(data) {
	  	  deferred.resolve(data);
         // this callback will be called asynchronously
         // when the response is available
  	  }, function errorCallback(data) {
  	  	  // called asynchronously if an error occurs
  	  	  deferred.reject();
     });


    /*  $http.get(srch).
      success(function(data){
        deferred.resolve(data);
      }).
      error(function(error){
          deferred.reject();
      }); */

      promises.push(deferred.promise);

    })

    return $q.all(promises);
  }
};

module.exports = getSearch;