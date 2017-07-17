'use strict';
//service

// @ngInject

var dbSearch = function($http){

  var getValues = function(Inputlink) {
    return $http.get(Inputlink);
  };

  return {
    getValues: getValues
  };
};

module.exports = dbSearch;