 "use strict";

 var myController = function ($scope, $controller, dbSearch) {

    //Set link for now - demo purposes
    var link = "http://api-test.data.npolar.no/statistic/a9fb0ae5ad56720b48766d8db219217e";

                $scope.submit = function() {
                    //Get dates
                    console.log($scope);

                  //  var link = "http://db-test.data.npolar.no:5984/statistics/" +
                    //Fetch search result
                    dbSearch.getValues(link).then(
                          function(results) {
                               // on success
                              console.log(results.data);
                              $scope.all = results.data;
                             // $scope.all = EstStats(results.data);


                                        $scope.barchart =
                                      [{
                                        name: 'research',
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