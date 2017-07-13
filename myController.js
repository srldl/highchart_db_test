 "use strict";

 var myController = function ($scope, $controller) {

                $scope.submit = function() {
                     console.log($scope);
                };

                // Sample options for first chart
                $scope.chartOptions = {
                    title: {
                        text: 'Temperature data'
                    },
                    xAxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },
                    series: [{
                        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                    }]
                };


                $scope.barData =
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
                $scope.pieData = [{
                        name: "Fieldwork",
                        y: 56.33
                    }, {
                        name: "Cruise",
                        y: 24.03,
                        sliced: true,
                        selected: true
                }]


};

 module.exports = myController;