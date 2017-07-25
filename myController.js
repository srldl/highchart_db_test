 "use strict";

 var myController = function ($scope, $controller, dbSearch) {

              //var id = "a9fb0ae5ad56720b48766d8db219217e";
              var id = "d9f287b7b7fd667d175b5a60280023e7";

              //Set link for now - demo purposes
              var link = "http://api-test.data.npolar.no/statistic/" + id;

              //Configuration object
              var config = {};

              //Fetch search result
              dbSearch.getValues(link).then(
                    function(results) {
                        // on success
                        config = results.data;
                        console.log(config);
                        console.log("---------");

                        //Return title and subtitle
                        $scope.main_title = config.main_title;
                        $scope.main_subtitle = config.main_subtitle;
              }); //end getValues


              $scope.submit = function() {

                    var search = [];

                    ////Get the search bases, one by one
                    for (var k = 0; k < (config.component).length; k++) {

                      //The search string
                      search = config.component[k].search_uri;
                      console.log(search);

                       //If limited by start_date and end_date -add it to search
                       if ($scope.unit && $scope.unit.start_date && $scope.unit.end_date) {
                          var link2 = '&filter-start_date=' + $scope.unit.start_date + '..' + $scope.unit.end_date;
                          var link3 = '&filter-end_date=' + $scope.unit.start_date + '..' + $scope.unit.end_date;
                          search = search + link2 + link3;
                       }
                    }


                    var m=0;
                    //Fetch search result-all og them
                    dbSearch.getValues(search).then(
                        function(results) {
                        // on success

                          console.log(results.data);
                          var search = results.data;

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

                          var res = getStats(config,search);

                          //Get all config visuals out
                          for (var p = 0; p < (config.component[m].visuals).length; p++) {

                              switch(config.component[m].visuals[p].presentation) {
                                      case 'barchart':
                                         $scope.barchart[m][p] = res;
                                         break;
                                      case 'piechart':
                                        $scope.piechart[m][p] = res;
                                         break;
                                      case 'graph':
                                         // not implemented
                              }

                          } //p loop - visuals


                                          $scope.barchart[0][1] =
                                            [{
                                              name: 'research[0][0]',
                                              y: 56.33
                                          }, {
                                              name: 'topographical mapping',
                                              y: 24.03
                                          }, {
                                              name: 'outreach VIP',
                                              y: 10.38
                                          }, {
                                              name: 'logistic operations',
                                              y: 4.77
                                          }, {
                                              name: 'other',
                                              y: 0.91
                                          }];

                                          $scope.barchart[0][2] =
                                            [{
                                              name: 'research[1][0]',
                                              y: 56.33
                                          }, {
                                              name: 'topographical mapping',
                                              y: 24.03
                                          }, {
                                              name: 'outreach VIP',
                                              y: 10.38
                                          }, {
                                              name: 'logistic operations',
                                              y: 4.77
                                          }, {
                                              name: 'other',
                                              y: 0.91
                                          }];


                                          $scope.barchart[0][4] =
                                            [{
                                              name: 'research[1][1]',
                                              y: 56.33
                                          }, {
                                              name: 'topographical mapping',
                                              y: 24.03
                                          }, {
                                              name: 'other',
                                              y: 0.91
                                          }];

                                           //Sample data for pie chart
                                           $scope.piechart[0][0] = [{
                                                      name: "Fieldwork0",
                                                      y: 56.33
                                                  }, {
                                                      name: "Cruise0",
                                                      y: 24.03,
                                                      sliced: true,
                                                      selected: true
                                           }]

                                           // Sample data for pie chart
                                           $scope.piechart[0][3] = [{
                                                      name: "Fieldwork3",
                                                      y: 56.33
                                                  }, {
                                                      name: "Cruise3",
                                                      y: 24.03,
                                                      sliced: true,
                                                      selected: true
                                           }]

                                          console.log($scope.barchart);


                    }); //end getValues


                };
};

//compute statistics
function getStats(config,search) {
   return [];
}

module.exports = myController;