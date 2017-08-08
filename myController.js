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
                               var res = getStats(config,search,a);
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


//compute statistics, four cases:
//dates  - start and end dates
//values - either single parameter,enumerated values
//       - several values as boolean
function getStats(config,search,a) {

       //Create an array of objects to return
       var arr = [];

       //Get hold of target fields
       var operational_field_arr = (config.component[a].visuals[0].operational_field).split('.');
       var db_field = config.component[a].visuals[0].db_field;


       //Operational_field is either two dates..
       if ((config.component[a].visuals[0].operational_field).indexOf('-')>-1) {

            //If we have replacement_field dates. The replacement dates are just counted
            //once and used as a replacement value if operational field values
            //does not exist.
            if (config.component[a].visuals[0].replacement_field) {
               for (var j=0;j<(search[a].data.feed.entries).length;j++){
                   var replacement_diff = -1;
                   //Assume that replacement_dates are high in the json-hierarchy
                   console.log(search[a].data.feed.entries[j], "search");

                   var replacement_diff = diffDates(search[a].data.feed.entries[j].start_date, search[a].data.feed.entries[j].end_date);


                   //Get the dates
                   var obj = traverseDates(search[a].data.feed.entries[j], (replacement_diff > 0 ? replacement_diff:-1));

                   //add to arr
                   arr.push(obj);


               }
            }



            //If we have comparison dates
       /*     if (config.component[a].visuals[0].field_db_dates) {
                var field_db_dates_arr = (config.component[a].visuals[0].field_db_dates).split('-');
                var diff = diffDates(field_db_dates_arr);
                console.log(diff, "field_db_dates");
            } */


      //..or a value
      } else {

          //If db_field is one field array, chop it up directly
          if (db_field.length === 1) {
              arr = traverse(search[a].data.feed.entries, search[a].data.feed.entries,
                                config.component[a].visuals[0].db_field[0].split('.'),
                                config.component[a].visuals[0].operational_field.split('.'), []);


          //db_field is an array which contains booleans to be summed up
          } else {
                arr = traverse(search[a].data.feed.entries, search[a].data.feed.entries,
                                    config.component[a].visuals[0].db_field,
                                    config.component[a].visuals[0].operational_field.split('.'), []);
          }

      }
        //sum the different categories
        if (arr.length > 0){
          arr = sum(arr);
        }

 return arr;

 };



//Traverse tree depth first, fetch db_field and operational_field
//Create an object or array of objects to be returned with db_fields (enumerated values)
function traverseDates(search, replacement_diff) {
   var i;
   var obj = {};


    for (i in search) {

        //Find start and end replacement days
        if (!!search[i] && typeof(search[i])=="object") {

           //Needed to include people also - which is not generic..
           if ((search[i].start_date !== undefined)&&(search[i].end_date !== undefined)){

           }
           traverseDates(search[i], replacement_diff);

        } //Nothings happens with the nodes that are not objects.
    }
}


//Compare two dates and get the number of days difference
function diffDates(start_date, end_date) {
     return Math.floor(((Date.parse(end_date)) - (Date.parse(start_date))) / 86400000)
}

//We have an array to pass highchart. But some name categories could be duplicates. Thus, sum the values.
function sum(arr){
  var j,y;
  var result = [];
  var i = 0;

  while (i < arr.length) {

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
  }
  return result;
};


//Traverse tree depth first, fetch db_field and operational_field
//Create an object or array of objects to be returned with db_fields (enumerated values)
function traverse(control, search, db_field_arr, operational_field_arr, arr) {
   var i;
   var obj = {};

    for (i in search) {
        if (!!search[i] && typeof(search[i])=="object") {
            //if found, remove next interation from db_field and operational_field
            if (i === db_field_arr[0]){ db_field_arr.shift() };
            if (i === operational_field_arr[0]){ operational_field_arr.shift() };
            traverse(control,search[i],db_field_arr,operational_field_arr, arr);

        //case with array of values in db_field_arr
        } else if (operational_field_arr[0] === '') {
                //if we found a match with value
                obj = {};
                if ((db_field_arr.indexOf(i) > -1)&&(search[i] === true)) {
                      { obj.name = i; obj.y = 1 };
                      arr.push(obj);
                }


        } else {
           //Have we found our value? If so, get the value to be viewed as graphics.

           if (i === db_field_arr[0]){ obj.name = search[i]; };
           if (i === operational_field_arr[0]){ obj.y = parseInt(search[i]);}

           //If obj is no longer empty, push to array
           if ((obj.y !== undefined)&&(obj.name !== undefined)){ arr.push(obj);};

        }
    }


   if (search === control) { return arr };
}

module.exports = myController;
