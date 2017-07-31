 "use strict";

 var myController = function ($scope, $controller, dbSearch, getSearch) {

              //var id = "a9fb0ae5ad56720b48766d8db219217e";
              //var id = "d9f287b7b7fd667d175b5a60280023e7";
              var id = "d9f287b7b7fd667d175b5a6028026ce7";

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

                    var searchstr = [];

                    ////Get the search bases, one by one
                    for (var k = 0; k < (config.component).length; k++) {

                      //The search string
                      searchstr[k] = config.component[k].search_uri;

                       //If limited by start_date and end_date -add it to search
                       if ($scope.unit && $scope.unit.start_date && $scope.unit.end_date) {
                          var link2 = '&filter-start_date=' + $scope.unit.start_date + '..' + $scope.unit.end_date;
                          var link3 = '&filter-end_date=' + $scope.unit.start_date + '..' + $scope.unit.end_date;
                          searchstr[k] = searchstr[k] + link2 + link3;
                       }
                    }

                    //Get all search GET request asynchronously
                    getSearch(searchstr).then(function(data){

                          var search = data;

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
}
};

//compute statistics
function getStats(config,search,a,b) {

       //Create an array of objects to return
       var arr = [];

       //Get hold of target fields
       var operational_field_arr = (config.component[a].visuals[b].operational_field).split('.');
       var db_field = config.component[a].visuals[b].db_field;


       //Operational_field is either two dates..
      if ((config.component[a].visuals[b].operational_field).indexOf('-')>-1) {

            var replacement_field_arr = [];
            //if replacement_field exist
            if (config.component[a].visuals[b].replacement_field) {
                replacement_field_arr = (config.component[a].visuals[b].replacement_field).split('-');
            }
            if (config.component[a].visuals[b].field_db_dates) {
                var field_db_dates_arr = (config.component[a].visuals[b].field_db_dates).split('-');
            }


      //..or a value
      } else {
          // arr = traverse(db_field,operational_field_arr,search);
          //If db_field is a string, chop it up directly
          //if (typeof(db_field) === 'string')
          //   var  db_field_arr = db_field.split('.');
          //end

          var arr = traverse(search[0].data.feed.entries, search[0].data.feed.entries,
              config.component[0].visuals[0].db_field[0].split('.'),
              config.component[0].visuals[0].operational_field.split('.'), []);
      }
        //sum the different categories
        arr = sum(arr);

 return arr;

       };


//Merge the name categories to be unique. Sum the values.
function sum(arr){
  var i,j,y;
  var result = [];

  for (i = 0; i < arr.length; i++) {
      //remove all values from array one by one so the duplicates can be summed up.
      var fltr = arr.filter(function (entry) { return entry.name === arr[i].name; });

      y = 0;
      //filtr holds the duplicates, sum y values
      for (j = 0; j < fltr.length; j++) {
            y = fltr[j].y + y;
      }
      result.push({ name:arr[i].name, y: y });

      //Remove values from start array
      arr = arr.filter(function(entry2) { return entry2.name !== arr[i].name; });
      i=0;

  }
  return result;
};




//traverse tree depth first, fetch db_field and operational_field
//create an object or array of objects to be returned
function traverse(control, search,db_field_arr,operational_field_arr,arr) {
   var i;
   var obj = {};

    for (i in search) {
        if (!!search[i] && typeof(search[i])=="object") {
            //if found, remove next interation from db_field and operational_field
            if (i === db_field_arr[0]){ db_field_arr.shift() };
            if (i === operational_field_arr[0]){ operational_field_arr.shift() };
            traverse(control,search[i],db_field_arr,operational_field_arr, arr);
        } else {
           //Have we found our field? If so,get the value to be viewed as graphics.
           if (i === db_field_arr[0]){ obj.name = search[i]; };
           if (i === operational_field_arr[0]){ obj.y = parseInt(search[i]); };

           //If obj is no longer empty, push to array
           if ((obj.y !== undefined)&&(obj.name !== undefined)){ arr.push(obj);};

        }
    }
   // var last = Object.keys(search)[Object.keys(search).length-1];

   if (search === control) { return arr };
}

//Compare two dates and get the number of days difference
function diffDates(op_dates) {
     return Math.floor(((Date.parse(op_dates[1])) - (Date.parse(op_dates[0]))) / 86400000)
}

//input - two sets of start and stop dates
//return the number of days overlapping
function getDateOverlap(op_dates,db_dates) {

    //if there are not four dates, return with no overlapping => 0
    if ((db_dates.length<2)&&(op_dates.length<2)) {
      return 0
    }

    //If end_date comes before the other start_date, no overlapping => 0
    if ((db_dates[1] < op_dates[0]) || (op_dates[1] < db_dates[0])) {
       return 0
    } else { //Get the smallest difference
      var diff1 = Math.floor(((Date.parse(op_dates[1])) - (Date.parse(db_dates[0]))) / 86400000);
      var diff2 = Math.floor(((Date.parse(db_dates[1])) - (Date.parse(op_dates[0]))) / 86400000);
      //Return the smallest of diff1 or diff2
      if (diff1 < diff2) { return diff1 } else {return diff2 } end
    }
}






module.exports = myController;