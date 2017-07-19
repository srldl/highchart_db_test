 "use strict";

 var myController = function ($scope, $controller, dbSearch) {

                $scope.submit = function() {
                    //Get start end end dates if they exist
                    var limit_dates = $scope.unit;
                    console.log(limit_dates);

                    var id = "a9fb0ae5ad56720b48766d8db219217e";

                    //Set link for now - demo purposes
                    var link = "http://api-test.data.npolar.no/statistic/" + id;

                    //Fetch search result
                    dbSearch.getValues(link).then(
                          function(results) {
                              // on success
                              console.log(results.data);
                              $scope.all = results.data;

                               console.log(limit_dates);


                                        $scope.barchart =
                                      [{
                                        name: 'researchzzz',
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

                                     // Sample data for pie chart
                                        $scope.piechart = [{
                                                name: "Fieldwork",
                                                y: 56.33
                                            }, {
                                                name: "Cruise",
                                                y: 24.03,
                                                sliced: true,
                                                selected: true
                                        }]




                    }); //end getValues

                };




};

 module.exports = myController;