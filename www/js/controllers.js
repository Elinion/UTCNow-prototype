angular.module('app.controllers', [])
  
.controller('toutLUTCCtrl', function($scope, $http) {
    $scope.events = {};

    // Request all events
    $http({
        method: 'GET',
        url: 'http://localhost:8080/api/events?start=2016-05-28'
    }).then(function successCallback(data) {
        $scope.events = data;
    }, function errorCallback(response) {
        console.log('Error: ' + response);
    });
})
   
.controller('monAgendaCtrl', function($scope, $ionicPopup) {
    $scope.date = new Date();

    $scope.showDatePopup = function() {
        $ionicPopup.show({
            template: '<input type="date" ng-model="date">',
            title: 'Aller à la date :',
            subTitle: 'Choisissez la date à afficher',
            scope: $scope,
            buttons: [
                {text: 'Annuler'},
                {
                    text: '<b>Go</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        if (!date) {
                            //Ne pas laisser entrer une date vide
                            e.preventDefault();
                        } else {

                            return date;
                            Console.log(date);
                        }
                    }
                }
            ]
        });
    };


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
 