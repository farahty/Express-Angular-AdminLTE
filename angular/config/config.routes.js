export function RoutesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  'ngInject'

  //$locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/')

  $stateProvider
  ////////////// main state //////////////////////////////////////
    .state('app', {
      abstract: true,
      views: {
        'layout': {
          templateUrl: './views/layout.html'
        },
        'navbar@app': {
          templateUrl: './views/navbar.html'
        },
        'sidebar@app': {
          templateUrl: './views/sidebar.html'
        },
        main: {}
      },
      data: {
        bodyClass: 'hold-transition skin-blue sidebar-mini'
      }
    })
    //////////////////////////////// login state //////////////////
    .state('app.login', {
      url: '/login',
      views: {
        'main@app': {
          templateUrl: './views/login.html'
        },
        'sidebar@app': {},
        'navbar@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      },
    //////////////////////////////// home state /////////////////////  
    })
    .state('app.home', {
      url: '/',
      views: {
        'main@app': {
          templateUrl: './views/test-content.html'
        }
      }
    })
    ///////////////////////////////// test state //////////////////////
    .state('app.test', {
      url: '/test',
      views: {
        'main@app': {
          templateUrl: './views/test.con-2.html'
        }
      }
    })


}