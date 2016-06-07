angular.module('app.controllers', [])

    .controller('toutLUTCCtrl', function ($scope, $http) {

    })

    .controller('monAgendaCtrl', function ($scope, $http, $ionicPopup) {
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

        $scope.showDatePopup = function () {
            $scope.data = {};
            $scope.data.date = $scope.date;
            var datePopup = $ionicPopup.show({
                template: '<input type="date" ng-model="data.date">',
                title: 'Aller à la date :',
                subTitle: 'Choisissez la date à afficher',
                scope: $scope,
                buttons: [
                    {
                        // Return the initial date if the player cancels the popup
                        text: 'Annuler',
                        onTap: function () {
                            return $scope.date;
                        }
                    },
                    {
                        text: '<b>Go</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!$scope.data.date) {
                                e.preventDefault();
                            } else {
                                return $scope.data.date;
                            }
                        }
                    }
                ]
            });

            datePopup.then(function (res) {
                $scope.date = res;
            });
        };


    })

    .controller('agendasFavorisCtrl', function ($scope) {

    })

    .controller('bienvenueCtrl', function ($scope) {

    })

    .controller('paramTresCtrl', function ($scope) {

    })

    .controller('ProposCtrl', function ($scope) {

    })

    .controller('defaultAgendaCtrl', function ($scope) {

    })

    .controller('carteVNementCtrl', function ($scope, $stateParams, $http) {
        $scope.idevent = $stateParams.idevent;
        $scope.eventCard = {};
        $scope.participantsEvent = {};

        // Request the event
        $http({
            method: 'GET',
            url: 'http://utcnow.herokuapp.com/api/events/?id=' + $scope.idevent
        }).then(function successCallback(data) {
            $scope.eventCard = data.data[0];
        }, function errorCallback(response) {
            console.log('Error: ' + response);
        });

        //Request participants de l'event
        $http({
            method: 'GET',
            url: 'http://utcnow.herokuapp.com/api/users/?id_event=' + $scope.idevent
        }).then(function successCallback(data) {
            $scope.participantsEvent = data;
        }, function errorCallback(response) {
            console.log('Error: ' + response);
        });


    })

    .controller('editerUnVNementCtrl', function ($scope, $http) {

        $scope.submit = function (eventname, eventlieu, eventdate, eventtimed, eventtimef, eventdesc, eventshow, eventag, eventshow) {

            //alert(eventdate);
            var dateDebut = new Date(eventdate.getFullYear(), eventdate.getMonth(), eventdate.getDate(), eventtimed.getHours() + 2, eventtimed.getMinutes());
            var dateFin = new Date(eventdate.getFullYear(), eventdate.getMonth(), eventdate.getDate(), eventtimef.getHours() + 2, eventtimef.getMinutes());
            var sDateDebut = dateDebut.toISOString();
            var sDateFin = dateFin.toISOString();
            sDateDebut = sDateDebut.replace("T", " ");
            sDateFin = sDateFin.replace("T", " ");
            sDateDebut = sDateDebut.replace(".000Z", "");
            sDateFin = sDateFin.replace(".000Z", "");

            $http({
                method: 'POST',
                url: 'http://utcnow.herokuapp.com/api/events?name=' + eventname + '&start=' + sDateDebut + '&end=' + sDateFin + '&desc=' + eventdesc
            }).then(function successCallback(data) {
                alert("it works !!!");
            }, function errorCallback(data) {
                alert("buuuug !!!");
                console.log('Error: ' + data.toString());
            });
        }


    })
