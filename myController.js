 "use strict";

 var myController = function ($scope, $controller, dbSearch, getSearch) {

              //var id = "a9fb0ae5ad56720b48766d8db219217e";
              var id = "d9f287b7b7fd667d175b5a60280023e7";

              //Set link for now - demo purposes
              var link = "http://api-test.data.npolar.no/statistic/" + id;

              //Configuration object
              var config = {};

              //Fetch result which is the config
              dbSearch.getValues(link).then(
                    function(results) {
                        // on success
                        config = results.data;

                        //Return title and subtitle
                        $scope.main_title = config.main_title;
                        $scope.main_subtitle = config.main_subtitle;
              }); //end getValues


              //When submit button is pressed
              $scope.submit = function() {

                    var search = [];

                    ////Get the search bases, one by one
                    for (var k = 0; k < (config.component).length; k++) {

                      //The search string
                      search[k] = config.component[k].search_uri;

                       //If limited by start_date and end_date -add it to search
                       if ($scope.unit && $scope.unit.start_date && $scope.unit.end_date) {
                          var link2 = '&filter-start_date=' + $scope.unit.start_date + '..' + $scope.unit.end_date;
                          var link3 = '&filter-end_date=' + $scope.unit.start_date + '..' + $scope.unit.end_date;
                          search[k] = search[k] + link2 + link3;
                       }
                    }

                    //Get all search GET request asynchronously
                    getSearch(search).then(function(data){

                          var search = data;
                          console.log(search);

                           //Push conf to html -for now
                          $scope.config = config;

                          //Create piechart array
                          var piechart = new Array((config.component).length);
                          for (var j = 0; j < piechart.length; j++) {
                              piechart[j] = new Array((config.component[j].visuals).length);
                          }

                          //Create barchart array
                          var barchart = new Array((config.component).length);
                          for (var i = 0; i < barchart.length; i++) {
                              barchart[i] = new Array((config.component[i].visuals).length);
                          }

                          $scope.barchart = barchart;
                          $scope.piechart = piechart;

                          //Go though each visual in config
                          for (var a = 0; a < (config.component).length; a++) {
                            for (var b = 0; b < (config.component[a].visuals).length; b++) {
                               //How should things be presented
                               var presentation = config.component[a].visuals[b].presentation;
                               var res = getStats(config,search,a,b);
                               switch(presentation) {
                                   case 'barchart':
                                         $scope.barchart[a][b] = res;
                                         break;
                                   case 'piechart':
                                         $scope.piechart[a][b] = res;
                                         break;
                                   case 'graph':
                                         // not implemented
                                         break;
                               }

                            }
                          }

                });
};

//compute statistics
function getStats(config,search,a,b) {

       //Create an array of objects to return
       var arr = [];

       //Two set of dates that need comparison
       if (config.component[a].visuals[b].db_field_dates)  {
          console.log("both2");
       //Two dates that need comparison
       } else if ((config.component[a].visuals[b].operational_field).indexOf('-')>-1) {
          console.log("dates");
       //A value field only
       } else {
          console.log("value");
   };
   return arr;
}

//Compare two dates and get the difference of days
function diffDates(op_dates) {
     return Math.floor(((Date.parse(op_dates[1])) - (Date.parse(op_dates[0]))) / 86400000)
}

//input - two sets of start and stop dates
//return the number of days overlapping
function getDateOverlap(op_dates,db_dates) {

    //if there are not four dates, return with no overlapping = 0
    if ((db_dates.length<2)&&(op_dates.length<2)) {
      return 0
    }

    //If end_date before the other start_date, no overlapping = 0
    if ((db_dates[1] < op_dates[0]) || (op_dates[1] < db_dates[0])) {
       return 0
    } else { //Sort
      var diff1 = Math.floor(((Date.parse(op_dates[1])) - (Date.parse(db_dates[0]))) / 86400000);
      var diff2 = Math.floor(((Date.parse(db_dates[1])) - (Date.parse(op_dates[0]))) / 86400000);
      //Return the smallest of diff1 or diff2
      if (diff1 < diff2) { return diff1 } else {return diff2 } end
    }
}


};



module.exports = myController;