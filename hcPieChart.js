"use strict";

var hcPieChart = function (Highcharts) {
 // Directive for pie charts, pass in title and data only
                return {
                    restrict: 'E',
                    template: '<div></div>',
                    scope: {
                        title: '@',
                        data: '='
                    },
                    link: function (scope, element) {
                        Highcharts.chart(element[0], {
                            chart: {
                                type: 'pie'
                            },
                            title: {
                                text: scope.title
                            },
                            subtitle: {
        text: 'Days in field per fieldwork/cruise. See: <a href="http://data.npolar.no/expedition">expedition database</a>.'
    },
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    dataLabels: {
                                        enabled: true,
                                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                                    }
                                }
                            },
                            series: [{
                                data: scope.data
                            }]
                        });
                    }
                };
};

module.exports = hcPieChart;