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
        $scope.data = {};

        var datePopup = $ionicPopup.show({
            template: '<input type="date" ng-model="data.date">',
            title: 'Aller à la date :',
            subTitle: 'Choisissez la date à afficher',
            scope: $scope,
            buttons: [
                {text: 'Annuler'},
                {
                    text: '<b>Go</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        if (!$scope.data.date) {
                            //Ne pas laisser entrer une date vide
                            e.preventDefault();
                        } else {
                            return $scope.data.date;
                        }
                    }
                }
            ]
        });

        datePopup.then(function(res) {
            console.log('New date:', res);
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
 