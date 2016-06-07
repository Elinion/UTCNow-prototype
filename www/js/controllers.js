angular.module('app.controllers', [])
  
.controller('toutLUTCCtrl', function($scope, $http) {

})

.controller('monAgendaCtrl', function($scope, $http, $ionicPopup) {
    $scope.date = new Date();
    $scope.events = {};

    // Request all events
    $http({
        method: 'GET',
        url: 'http://utcnow.herokuapp.com/api/events'
    }).then(function successCallback(data) {
        $scope.events = data;
    }, function errorCallback(response) {
        console.log('Error: ' + response);
    });

    $scope.showDatePopup = function() {
        $scope.data = {};
        $scope.data.date = $scope.date;
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
            $scope.date = res;
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
   
.controller('carteVNementCtrl', function($scope, $http, $stateParams, $http) {
    var idevent = $stateParams.idevent;
    $scope.eventCard = {};

    // Request the event
    $http({
        method: 'GET',
        url: 'http://utcnow.herokuapp.com/api/events/?id='+idevent
    }).then(function successCallback(data) {
        $scope.eventCard = data;
        console.log(data);
    }, function errorCallback(response) {
        console.log('Error: ' + response);
    });


})
   
.controller('editerUnVNementCtrl', function($scope) {

        $scope.submit = function(eventname) {

            alert("Thanks to " + eventname);

    }

})
