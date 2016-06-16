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
        $scope.loadEvents = function () {
            $http({
                method: 'GET',
                url: 'http://utcnow.herokuapp.com/api/events'
            }).then(function successCallback(data) {
                $scope.events = data.data;
                //Fire filtering once loaded
                $scope.updateMatchingEvents($scope.search);
            }, function errorCallback(response) {
                console.log('Error: ' + response);
            }).finally(function () {
                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        //Fire load at beginning
        $scope.loadEvents();

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
        $scope.colorFromEventType = utilities.colorFromEventType;

        // Date selected by the user (show today's events by default)
        $scope.date = new Date();

        // An array of all events (of all times)
        $scope.events = {};

        // An array of all events scheduled for the selected date only
        $scope.selectedDateEvents = {};

        var updateSelectedDayEvents = function (newValue, oldValue) {
            $scope.selectedDateEvents = [];
            angular.forEach($scope.events, function (value, key) {
                if (utilities.dateWithoutTime(newValue).getTime() == utilities.dateWithoutTime(value.start).getTime()) {
                    $scope.selectedDateEvents.push(value);
                }
            });
        };

        // Automatically update selectedDateEvents whenever a new date is selected
        $scope.$watch('date', updateSelectedDayEvents, true);

        // Request all events
        $scope.loadEvents = function () {
            $http({
                method: 'GET',
                url: 'http://utcnow.herokuapp.com/api/events'
            }).then(function successCallback(data) {
                $scope.events = data.data;
                //Fire filtering once loaded
                updateSelectedDayEvents($scope.date);
                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            }, function errorCallback(response) {
                console.log('Error: ' + response);
            }).finally(function () {
                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        //Fire load at beginning
        $scope.loadEvents();

        //Popup to choose the date with navigation bar
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

    .controller('authenticate', function ($location) {
        alert('banzai');
        var ticket = $location.search('ticket');
        alert('ticket');
    })

    .controller('homeCtrl', function ($scope, $http) {
        // Sign in to UTCNow's server
        // It the authentication is successful, the server will return a token that will be used within this application
        $scope.signIn = function () {
            // Send user credentials to UTCNow's server
            var url = 'http://localhost:8080/authenticate';
            var data = {
                username: $scope.username,
                password: $scope.password
            };
            $http({
                method: 'POST',
                url: url,
                data: data
            }).then(function successCallback(data) {
                console.log(data);
            }, function errorCallback(data) {
                console.log('Error: ' + data.toString());
            });
        };
    })

    .controller('paramTresCtrl', function ($scope) {
    })

    .controller('ProposCtrl', function ($scope) {

    })

    .controller('defaultAgendaCtrl', function ($scope) {


    })

    .controller('carteVNementCtrl', function ($scope, $stateParams, $http, $state, utilities) {
        $scope.event = {};
        $scope.event.id = $stateParams.eventId;
        $scope.eventCard = {};
        $scope.participantsEvent = {};

        $scope.loadEvents = function () {
            // Request the event
            $http({
                method: 'GET',
                url: 'http://utcnow.herokuapp.com/api/events/?id=' + $scope.event.id
            }).then(function successCallback(data) {
                $scope.eventCard = data.data[0];
            }, function errorCallback(response) {
                console.log('Error: ' + response);
            }).finally(function () {
                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });

            //Request participants de l'event
            $http({
                method: 'GET',
                url: 'http://utcnow.herokuapp.com/api/users/?id_event=' + $scope.event.id
            }).then(function successCallback(data) {
                $scope.participantsEvent = data;
            }, function errorCallback(response) {
                console.log('Error: ' + response);
            });
        }
        //Fire load at beginning
        $scope.loadEvents();

        $scope.delete = function () {

            //headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
            $http.defaults.headers.delete = {"Content-Type": "application/json;charset=utf-8"}
            $http({
                method: 'DELETE',
                url: 'https://utcnow.herokuapp.com/api/events?id=' + $scope.event.id,
                header: {"Content-Type": "text/plain"}
            }).then(function successCallback(data) {
                $state.go('tabsController.toutLUTC', {}, { reload: true });
            }, function errorCallback(data) {
                alert("buuuug !!!");
                console.log('Error: ' + data.toString());
            });
        }

        $scope.colorFromEventType = utilities.colorFromEventType;

    })

    .controller('editerUnVNementCtrl', function ($scope, $http, $stateParams, $state) {
        $scope.event = {};
        console.log($stateParams);
        $scope.event.id = $stateParams.eventId;
        $scope.eventCard = {};

        if ($scope.event.id != '') {
            $scope.pageedit_title = "Editer l'évènement";
            // Request the event
            $http({
                method: 'GET',
                url: 'http://utcnow.herokuapp.com/api/events/?id=' + $scope.event.id
            }).then(function successCallback(data) {
                $scope.eventCard = data.data[0];

                $scope.event.name = $scope.eventCard.name;
                $scope.event.date = new Date($scope.eventCard.start);
                $scope.event.startTime = new Date($scope.eventCard.start);
                $scope.event.endTime = new Date($scope.eventCard.end);
                $scope.event.description = $scope.eventCard.description;
                $scope.event.location = $scope.eventCard.location;

            }, function errorCallback(response) {
                console.log('Error: ' + response);
            });
        } else {
            $scope.pageedit_title = "Créer un évènement";
            var d = new Date();
            d.setMinutes(0);
            d.setSeconds(0);
            d.setMilliseconds(0);
            $scope.event.date = $scope.event.startTime = $scope.event.endTime = d;

        }

        $scope.editEvent = function () {
            // Retrieve date parameters
            var year = $scope.event.date.getFullYear();
            var month = $scope.event.date.getMonth();
            var date = $scope.event.date.getDate();
            var startHours = $scope.event.startTime.getHours();
            var startMinutes = $scope.event.startTime.getMinutes();
            var endHours = $scope.event.endTime.getHours();
            var endMinutes = $scope.event.endTime.getMinutes();

            // Format start date
            var startDate = new Date(year, month, date, startHours + 2, startMinutes).toISOString();
            startDate = startDate.replace("T", " ");
            startDate = startDate.replace(".000Z", "");

            // Format end date
            var endDate = new Date(year, month, date, endHours + 2, endMinutes).toISOString();
            endDate = endDate.replace("T", " ");
            endDate = endDate.replace(".000Z", "");

            // API parameters
            var host = 'http://utcnow.herokuapp.com/api/events?';
            var id = 'id=' + $scope.event.id;
            var name = 'name=' + $scope.event.name;
            var start = 'start=' + startDate;
            var end = 'end=' + endDate;
            var description = 'desc=' + $scope.event.description;

            // If the event does not exist yet, create a new one
            if ($scope.event.id == '') {
                var url = host + name + '&' + start + '&' + end + '&' + description;
                $http({
                    method: 'POST',
                    url: 'http://utcnow.herokuapp.com/api/events?name=' + eventname + '&start=' + sDateDebut + '&end=' + sDateFin + '&desc=' + eventdesc
                }).then(function successCallback(data) {
                    $state.go('tabsController.toutLUTC', {}, { reload: true });
                }, function errorCallback(data) {
                    console.log('Error: ' + data.toString());
                });
            }
            // Otherwise update that event
            else {
                var url = host + id + '&' + name + '&' + start + '&' + end + '&' + description;
                $http({
                    method: 'PUT',
                    url: url
                }).then(function successCallback(data) {
                    $state.go('tabsController.toutLUTC', {}, { reload: true });
                }, function errorCallback(data) {
                    console.log('Error: ' + data.toString());
                });
            }
        };

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

