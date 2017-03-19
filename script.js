var app = angular.module('myApp', []);
app.controller('getData', function($scope, $http) {

  $http.get('https://randomuser.me/api/?results=15&nat=US&noinfo')
    .success(function(response) {
      $scope.persons = response.results;
      var male = 0;
      var female = 0;
      for (var gender in $scope.persons) {
        if ($scope.persons[gender].gender == 'male') male++;
        else female++;
        $scope.male = male;
        $scope.female = female;
      }
    });

  var trigger = {
    visible: false
  };

  $scope.formatDate = function(date) {
    var dateOut = new Date(date);
    return dateOut;
  };

});
//Chart------------------------------------------------------
google.charts.load('current', {
  'packages': ['corechart']
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var male = 0;
  var female = 0;
  male = +$("#datamale").html();
  female = +$("#datafemale").html();

  var data = google.visualization.arrayToDataTable([
    ['Gender', 'Percentage'],
    ['Male', male],
    ['Female', female]
  ]);

  var options = {
    slices: {
      0: {
        color: '#7cb5ec'
      },
      1: {
        color: '#434348'
      }
    }
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}
