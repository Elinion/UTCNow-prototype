angular.module('app.controllers', [])
  
.controller('toutLUTCCtrl', function($scope, $http) {
    $scope.events = {};

    // Request all events
    $http({
        method: 'GET',
        url: 'http://localhost:8080/api/events'
    }).then(function successCallback(data) {
        $scope.events = data;
    }, function errorCallback(response) {
        console.log('Error: ' + response);
    });
})
   
.controller('monAgendaCtrl', function($scope) {

})
   
.controller('agendasFavorisCtrl', function($scope) {

})
         
.controller('bienvenueCtrl', function($scope) {

})
   
.controller('paramTresCtrl', function($scope) {

})
   
.controller('ProposCtrl', function($scope) {

})
   
.controller('defaultAgendaCtrl', function($scope) {

})
   
.controller('carteVNementCtrl', function($scope) {

})
   
.controller('editerUnVNementCtrl', function($scope) {

})
 