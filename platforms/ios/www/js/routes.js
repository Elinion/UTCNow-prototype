angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.toutLUTC', {
    url: '/agendaAll',
    views: {
      'tab1': {
        templateUrl: 'templates/toutLUTC.html',
        controller: 'toutLUTCCtrl'
      }
    }
  })

  .state('tabsController.monAgenda', {
    url: '/agendaMine',
    views: {
      'tab2': {
        templateUrl: 'templates/monAgenda.html',
        controller: 'monAgendaCtrl'
      }
    }
  })

  .state('tabsController.agendasFavoris', {
    url: '/agendaStar',
    views: {
      'tab3': {
        templateUrl: 'templates/agendasFavoris.html',
        controller: 'agendasFavorisCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('bienvenue', {
    url: '/home',
    templateUrl: 'templates/bienvenue.html',
    controller: 'bienvenueCtrl'
  })

  .state('paramTres', {
    url: '/settings',
    templateUrl: 'templates/paramTres.html',
    controller: 'paramTresCtrl'
  })

  .state('Propos', {
    url: '/about',
    templateUrl: 'templates/Propos.html',
    controller: 'ProposCtrl'
  })

  .state('defaultAgenda', {
    url: '/agenda',
    templateUrl: 'templates/defaultAgenda.html',
    controller: 'defaultAgendaCtrl'
  })

  .state('tabsController.carteVNement', {
    url: '/event',
    views: {
      'tab2': {
        templateUrl: 'templates/carteVNement.html',
        controller: 'carteVNementCtrl'
      }
    }
  })

  .state('tabsController.editerUnVNement', {
    url: '/editEvent',
    views: {
      'tab2': {
        templateUrl: 'templates/editerUnVNement.html',
        controller: 'editerUnVNementCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/home')

  

});