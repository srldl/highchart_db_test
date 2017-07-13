'use strict';
//service

// @ngInject

var dbSearch = function($resource){
	//Server address hardcoded just for demo purposes..
    return $resource( 'http:db-test.data.npolar.no:5984/statistics/?q=:search2&limit=all&locales=utf-8:search' , { search:'@search', search2:'@search2'}, {
    query: {method: 'GET'}
    });
};

module.exports = dbSearch;