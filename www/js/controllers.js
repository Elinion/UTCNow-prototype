angular.module('app.controllers', [])
    .factory('utilities', function () {
        return {
            // Used to compare only, day/month/year part of Date objects
            dateWithoutTime: function (date) {
                var d = new Date(date);
                d.setHours(0, 0, 0, 0);
                return d;
            },
            // Used to set the event's background color according to their type
            colorFromEventType: function (target, type) {
                // Asso UTC
                if (type == '1')
                    return target + '-balanced';

                // Perm PIC
                if (type == '2')
                    return target + '-energized';

                // Examen
                if (type == '3')
                    return target + '-assertive';

                return '';
            }
        };
    })

    .controller('toutLUTCCtrl', function ($scope, $http, utilities) {
        // An array of all events (of all times)
        $scope.events = {};

        // An array of all events matching the search field
        $scope.matchingEvents = [];

        // Request all events
        $http({
            method: 'GET',
            //url: 'http://utcnow.herokuapp.com/api/events'
            url: 'http://localhost:8080/api/events'
        }).then(function successCallback(data) {
            $scope.events = data.data;
        }, function errorCallback(response) {
            console.log('Error: ' + response);
        });

        // Update the events showed when the users modifies the search field
        $scope.updateMatchingEvents = function (newValue) {
            $scope.matchingEvents = [];

            // If no text was entered in the search field, show all events in chronological order
            if (newValue == 0) {
                $scope.matchingEvents = $scope.events;
            }
            // Otherwise show the events that match the text entered
            // To do so, we check if that text is present in the event name, description or location
            else {
                angular.forEach($scope.events, function (value, key) {
                    if (value.name.search(new RegExp(newValue, "i")) > -1 || value.description.search(new RegExp(newValue, "i")) > -1) {
                        $scope.matchingEvents.push(value);
                    }
                });
            }
        };

        $scope.colorFromEventType = utilities.colorFromEventType;
    })

    .controller('monAgendaCtrl', function ($scope, $http, $ionicPopup, utilities) {
        // Date selected by the user (show today's events by default)
        $scope.date = new Date();

        // An array of all events (of all times)
        $scope.events = {};

        // An array of all events scheduled for the selected date only
        $scope.selectedDateEvents = {};

        // Automatically update selectedDateEvents whenever a new date is selected
        $scope.$watch('date', function (newValue, oldValue) {
            $scope.selectedDateEvents = [];
            angular.forEach($scope.events, function (value, key) {
                if (utilities.dateWithoutTime(newValue).getTime() == utilities.dateWithoutTime(value.start).getTime()) {
                    $scope.selectedDateEvents.push(value);
                }
            });
        }, true);

        // Request all events
        $http({
            method: 'GET',
            url: 'http://utcnow.herokuapp.com/api/events'
        }).then(function successCallback(data) {
            $scope.events = data.data;
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


        $scope.delete = function () {

            //headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
            $http.defaults.headers.delete = {"Content-Type": "application/json;charset=utf-8"}
            $http({
                method: 'DELETE',
                url: 'https://utcnow.herokuapp.com/api/events?id=' + $scope.idevent,
                header: {"Content-Type": "text/plain"}
            }).then(function successCallback(data) {
                alert("it works !!!");
            }, function errorCallback(data) {
                alert("buuuug !!!");
                console.log('Error: ' + data.toString());
            });
        }


    })


    .controller('editerUnVNementCtrl', function ($scope, $http, $stateParams) {
        $scope.idevent = $stateParams.idevent;
        $scope.eventCard = {};

        if ($scope.idevent != '') {
            $scope.pageedit_title = "Editer l'évènement";
            // Request the event
            $http({
                method: 'GET',
                url: 'http://utcnow.herokuapp.com/api/events/?id=' + $scope.idevent
            }).then(function successCallback(data) {
                $scope.eventCard = data.data[0];

                $scope.eventname = $scope.eventCard.name;
                $scope.eventdate = new Date($scope.eventCard.start);
                $scope.eventtimed = new Date($scope.eventCard.start);
                $scope.eventtimef = new Date($scope.eventCard.end);
                $scope.eventdesc = $scope.eventCard.description;
                $scope.eventlieu = $scope.eventCard.location;

            }, function errorCallback(response) {
                console.log('Error: ' + response);
            });
        } else {
            $scope.pageedit_title = "Créer un évènement";
            var d = new Date();
            d.setMinutes(0);
            d.setSeconds(0);
            d.setMilliseconds(0);
            $scope.eventdate = $scope.eventtimed = $scope.eventtimef = d;

        }


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

            if ($scope.idevent != '') {
                //Mise à jour
                $http({
                    method: 'PUT',
                    url: 'http://utcnow.herokuapp.com/api/events?id=' + $scope.idevent + '&name=' + eventname + '&start=' + sDateDebut + '&end=' + sDateFin + '&desc=' + eventdesc
                }).then(function successCallback(data) {

                }, function errorCallback(data) {
                    console.log('Error: ' + data.toString());
                });
            } else {
                //Création d'un nouvel event
                $http({
                    method: 'POST',
                    url: 'http://utcnow.herokuapp.com/api/events?name=' + eventname + '&start=' + sDateDebut + '&end=' + sDateFin + '&desc=' + eventdesc
                }).then(function successCallback(data) {

                }, function errorCallback(data) {
                    console.log('Error: ' + data.toString());
                });
            }
        }


    })
