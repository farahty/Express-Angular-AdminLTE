/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(2);

	__webpack_require__(4);

	__webpack_require__(7);

	__webpack_require__(9);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	angular.module('app', ['app.run', 'app.services', 'app.components', 'app.routes', 'app.config']);

	angular.module('app.run', []);
	angular.module('app.routes', []);
	angular.module('app.services', []);
	angular.module('app.config', []);
	angular.module('app.components', ['ui.router', 'satellizer']);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _run = __webpack_require__(3);

	angular.module('app.run').run(_run.runRoutes);

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	runRoutes.$inject = ["$rootScope", "$state"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.runRoutes = runRoutes;
	function runRoutes($rootScope, $state) {
	    "ngInject";

	    $rootScope.$on('$stateChangeStart', function (event, toState) {
	        if (false) {
	            if (toState.name == 'app.login') return;
	            event.preventDefault();
	            return $state.go('app.login');
	        }
	    });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _config = __webpack_require__(5);

	var _config2 = __webpack_require__(6);

	angular.module('app.config').config(_config.RoutesConfig).config(_config2.AuthConfig);

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RoutesConfig = RoutesConfig;
	function RoutesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
	  'ngInject';

	  //$locationProvider.html5Mode(true);

	  $urlRouterProvider.otherwise('/');

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
	    }
	  }).state('app.home', {
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
	  });
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	AuthConfig.$inject = ["$authProvider"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AuthConfig = AuthConfig;
	function AuthConfig($authProvider) {
	  'ngInject';

	  $authProvider.httpInterceptor = function () {
	    return true;
	  };

	  $authProvider.loginUrl = '/api/users/login';
	  $authProvider.signupUrl = '/api/auth/register';
	  $authProvider.tokenRoot = 'data'; // compensates success response macro
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _routeBodyclass = __webpack_require__(8);

	angular.module('app.components').directive('routeBodyclass', _routeBodyclass.RouteBodyClassComponent);

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	routeBodyClass.$inject = ['$rootScope'];
	function routeBodyClass($rootScope) {
	  return {
	    scope: { ngModel: '=ngModel' },
	    link: function routeBodyClassLink(scope, elem) {
	      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
	        // eslint-disable-line angular/on-watch
	        var fromClassnames = angular.isDefined(fromState.data) && angular.isDefined(fromState.data.bodyClass) ? fromState.data.bodyClass : null;
	        var toClassnames = angular.isDefined(toState.data) && angular.isDefined(toState.data.bodyClass) ? toState.data.bodyClass : null;

	        if (fromClassnames != toClassnames) {
	          if (fromClassnames) {
	            elem.removeClass(fromClassnames);
	          }

	          if (toClassnames) {
	            elem.addClass(toClassnames);
	          }
	        }
	      });
	    },
	    restrict: 'EA'
	  };
	}

	var RouteBodyClassComponent = exports.RouteBodyClassComponent = routeBodyClass;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	angular.module('app.services');

/***/ }
/******/ ]);