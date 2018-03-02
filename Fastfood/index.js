/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/firebase.js":
/*!************************!*\
  !*** ./js/firebase.js ***!
  \************************/
/*! exports provided: Firebase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Firebase\", function() { return Firebase; });\nconst config = {\r\n    apiKey: \"AIzaSyCTSrtpza1D_7tv0w82CV6cd6bqMabvGb8\",\r\n    authDomain: \"test-po4erk.firebaseapp.com\",\r\n    databaseURL: \"https://test-po4erk.firebaseio.com\",\r\n    projectId: \"test-po4erk\",\r\n    storageBucket: \"test-po4erk.appspot.com\",\r\n    messagingSenderId: \"950069581603\"\r\n};\r\n\r\nclass Firebase {\r\n    constructor() {}\r\n\r\n    get auth() {\r\n        return firebase.auth();\r\n    }\r\n\r\n    get database() {\r\n        return firebase.database();\r\n    }\r\n\r\n    get storage() {\r\n        return firebase.storage();\r\n    }\r\n\r\n    init() {\r\n        firebase.initializeApp(config);\r\n    }\r\n}\n\n//# sourceURL=webpack:///./js/firebase.js?");

/***/ }),

/***/ "./js/init.js":
/*!********************!*\
  !*** ./js/init.js ***!
  \********************/
/*! exports provided: Initialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Initialize\", function() { return Initialize; });\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./firebase */ \"./js/firebase.js\");\n/* harmony import */ var _routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routing */ \"./js/routing.js\");\n/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login */ \"./js/login.js\");\n\r\n\r\n\r\n\r\nclass Initialize{\r\n    constructor(){\r\n        this.firebase = new _firebase__WEBPACK_IMPORTED_MODULE_0__[\"Firebase\"]();\r\n        this.router = new _routing__WEBPACK_IMPORTED_MODULE_1__[\"Router\"]();\r\n        this.authView = new _login__WEBPACK_IMPORTED_MODULE_2__[\"AuthView\"]();\r\n    }\r\n\r\n    init(){\r\n\r\n        this.firebase.init();\r\n        this.router.init();\r\n        this.authView.init();\r\n\r\n        this.firebase.auth.onAuthStateChanged(firebaseUser => {\r\n            if (firebaseUser) {\r\n                this.router.navigate('app');\r\n            } else {\r\n                console.log('You are not logged in...');\r\n                this.router.navigate('login');\r\n            }\r\n        });\r\n    }\r\n}\r\n    \r\n\r\n\r\n\n\n//# sourceURL=webpack:///./js/init.js?");

/***/ }),

/***/ "./js/login.js":
/*!*********************!*\
  !*** ./js/login.js ***!
  \*********************/
/*! exports provided: AuthView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AuthView\", function() { return AuthView; });\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./firebase */ \"./js/firebase.js\");\n\r\n\r\n    class Authentifications{\r\n        constructor(){\r\n            this.firebase = new _firebase__WEBPACK_IMPORTED_MODULE_0__[\"Firebase\"]();\r\n        }\r\n\r\n\r\n        logInGoogle() {\r\n            let provider = new firebase.auth.GoogleAuthProvider();\r\n            this.firebase.auth.signInWithPopup(provider);\r\n        }\r\n\r\n        logInAnon() {\r\n            this.firebase.auth.signInAnonymously().then(function () {\r\n                console.log(\"You are logged in anonymously.\");\r\n            });\r\n        }\r\n        //Realisation button \"Login\"\r\n        logIn(email, pass) {\r\n            this.email = email;\r\n            this.pass = pass;\r\n            this.firebase.auth.signInWithEmailAndPassword(email, pass).then(function () {\r\n                console.log(\"You are logged in.\");\r\n            }).catch(function (error) {\r\n                if((email == null)||(pass==null)){\r\n                    alert('Enter any login data!');\r\n                }else{\r\n                    alert('Sign Up please!');\r\n                }\r\n            });\r\n        }\r\n\r\n        //Realisation button \"Sign Up\"\r\n        signUp(email, pass) {\r\n            this.email = email;\r\n            this.pass = pass;\r\n            this.firebase.auth.createUserWithEmailAndPassword(email, pass).then(function () {\r\n                alert('Thank you for registrations!');\r\n            });\r\n        }\r\n\r\n    }\r\n    const authorization = new Authentifications();\r\n\r\n    class AuthView{\r\n\r\n        init(){\r\n            //Button LogIn with email and pass\r\n            $(document).on('click','#btnLogIn', function(e) {\r\n                const email = $(\"#txtEmail\").val();\r\n                const pass = $(\"#txtPassword\").val();\r\n                authorization.logIn(email, pass);\r\n            });\r\n\r\n            //Button LogInAnon\r\n            $(document).on('click','#btnLogInAnon', function(e) {\r\n                console.log('anon');\r\n                authorization.logInAnon();\r\n            });\r\n\r\n            //Button LogInGoogle\r\n            $(document).on('click','#btnLogInGoogle', function(e) {\r\n                authorization.logInGoogle();\r\n            });\r\n\r\n            //Button SignIn with email and pass\r\n            $(document).on('click','#btnSignUp', function(e) {\r\n                const email = $(\"#txtEmail\").val();\r\n                const pass = $(\"#txtPassword\").val();\r\n                authorization.signUp(email, pass);\r\n            });\r\n        }\r\n    }\r\n\n\n//# sourceURL=webpack:///./js/login.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./init */ \"./js/init.js\");\n\r\nconst app = new _init__WEBPACK_IMPORTED_MODULE_0__[\"Initialize\"]();\r\napp.init();\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/routing.js":
/*!***********************!*\
  !*** ./js/routing.js ***!
  \***********************/
/*! exports provided: Router */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Router\", function() { return Router; });\n\r\nclass Router{\r\n\r\n    constructor(){\r\n        this.router = new Navigo(null, true, '#!');\r\n    }\r\n\r\n    loadHTML(url, id){\r\n      const req = new XMLHttpRequest();\r\n      req.open('GET', url);\r\n      req.send();\r\n      req.onload = () => {\r\n        $(id).html(req.responseText);\r\n      };\r\n    };\r\n\r\n    init(){\r\n\r\n      this.router.on({\r\n        'addnew': () => { \r\n          this.loadHTML('./templates/add.html', '#addBlock');    \r\n        },\r\n        'app': () => {\r\n          this.loadHTML('./templates/app.html', '#content');\r\n        },\r\n        'show/:key': (params) => {\r\n          let input = document.createElement('input');\r\n          input.id = 'dataKey';\r\n          input.type = 'hidden';\r\n          $('#content').append(input);\r\n          $('#dataKey').val(`${params.key}`);\r\n          this.loadHTML('./templates/show.html', '#addBlock');\r\n        },\r\n        'login': () => { \r\n          this.loadHTML('./templates/login.html', '#content'); \r\n        }\r\n      }).resolve();\r\n\r\n    }\r\n\r\n    navigate(url) {\r\n      this.router.navigate(url);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./js/routing.js?");

/***/ })

/******/ });