 "use strict";

 var myController = function ($scope, $controller, dbSearch) {

              var id = "a9fb0ae5ad56720b48766d8db219217e";
              //var id = "d9f287b7b7fd667d175b5a60280023e7";

              //Set link for now - demo purposes
              var link = "http://api-test.data.npolar.no/statistic/" + id;

              //Configuration object
              var conf = new Object();

              //Fetch search result
              dbSearch.getValues(link).then(
                    function(results) {
                        // on success
                        conf = results.data;


                        //Return title and subtitle
                        $scope.main_title = conf.main_title;
                        $scope.main_subtitle = conf.main_subtitle;
              }); //end getValues


              $scope.submit = function() {

                     console.log(conf);

                    ////Get the search bases, one by one
                    for (var k = 0; k < (conf.component).length; k++) {

                       //The search string
                      var search = conf.component[k].search_uri;

                       //If limited by start_date and end_date -add it to search
                       if ($scope.unit && $scope.unit.start_date && $scope.unit.end_date) {
                          var link2 = '&filter-start_date=' + $scope.unit.start_date + '..' + $scope.unit.end_date;
                          var link3 = '&filter-end_date=' + $scope.unit.start_date + '..' + $scope.unit.end_date;
                          search = search + link2 + link3;
                       }



                    //Fetch search result
                    dbSearch.getValues(search).then(
                          function(results) {
                            // on success

                            console.log(results.data);
                            var search = results.data;

                            //do something to pick up right k!


                            //Get all config visuals out
                            console.log((conf.component[0].visuals).length);
                            for (var p = 0; p < (conf.component[0].visuals).length; p++) {
                                 console.log(p);

                            } //p loop - visuals


                                    //Push conf to html -for now
                                    $scope.conf = conf;

                                     //Create piechart array
                                     var piechart = new Array((conf.component).length);
                                     for (var j = 0; j < piechart.length; j++) {
                                          piechart[j] = new Array((conf.component[j].visuals).length);
                                     }

                                     //Create barchart array
                                     var barchart = new Array((conf.component).length);
                                     for (var i = 0; i < barchart.length; i++) {
                                          barchart[i] = new Array((conf.component[i].visuals).length);
                                     }

                                        $scope.barchart = barchart;
                                        $scope.piechart = piechart;


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
                  }

                };




};

module.exports = myController;