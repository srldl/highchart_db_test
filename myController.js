 "use strict";

 var myController = function ($scope, $controller, dbSearch) {

                $scope.submit = function() {
                    //Get start end end dates if they exist
                    var limit_dates = $scope.unit;
                    console.log(limit_dates);

                    var id = "a9fb0ae5ad56720b48766d8db219217e";
                    //var id = "d9f287b7b7fd667d175b5a60280023e7";

                    //Set link for now - demo purposes
                    var link = "http://api-test.data.npolar.no/statistic/" + id;

                    //Fetch search result
                    dbSearch.getValues(link).then(
                          function(results) {
                               // on success
                               console.log(results.data);
                               $scope.all = results.data;

                               //Create piechart array
                               var piechart = new Array(($scope.all.component).length);
                               for (var j = 0; j < piechart.length; j++) {
                                    piechart[j] = new Array(($scope.all.component[j].visuals).length);
                               }

                               //Create barchart array
                               var barchart = new Array(($scope.all.component).length);
                               for (var i = 0; i < barchart.length; i++) {
                                    barchart[i] = new Array(($scope.all.component[i].visuals).length);
                               }

                                  $scope.barchart = barchart;
                                  $scope.piechart = piechart;
                                  console.log($scope.barchart);
                                  console.log($scope.piechart);

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

 module.exports = myController;