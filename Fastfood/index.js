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

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! exports provided: AppView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AppView\", function() { return AppView; });\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./firebase */ \"./js/firebase.js\");\n/* harmony import */ var _routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routing */ \"./js/routing.js\");\n\r\n\r\n\r\n    class AppData{\r\n\r\n        constructor(){\r\n            this.firebase = new _firebase__WEBPACK_IMPORTED_MODULE_0__[\"Firebase\"]();\r\n            this.name = 'Fastfoods';\r\n        }\r\n\r\n        init(){\r\n            this.base = this.firebase.database.ref(this.name);\r\n            this.storage = this.firebase.storage;\r\n        }\r\n        //Load table with data about place\r\n        loadTable(table){\r\n            \r\n            this.base.on('child_added',function(snapshot) {\r\n                let key = snapshot.key;\r\n                let getData = [snapshot.child(\"name\").val(), snapshot.child(\"address\").val(), snapshot.child(\"rating\").val()];\r\n                let trBuild = table.rows.add([getData]).draw().nodes();\r\n                $(trBuild).attr('data-key',key);\r\n            });\r\n        };\r\n\r\n        addNew(name,address) {\r\n            this.base.push({\r\n                name: name,\r\n                address: address,\r\n                rating: \"Any rating\",\r\n                info: 'Any info',\r\n            });\r\n        }\r\n\r\n        deleteData(data) {\r\n            this.storage.ref(data).delete().then(function() {\r\n                console.log('Delete complite!')\r\n            }).catch(function(error) {\r\n                console.log('Delete error!')\r\n            });\r\n            this.base.child(data).remove();\r\n        };\r\n\r\n    }\r\n\r\n    class AppView{\r\n\r\n        constructor(){\r\n            this.dao = new AppData();\r\n            this.router = new _routing__WEBPACK_IMPORTED_MODULE_1__[\"Router\"]();\r\n        }\r\n\r\n        init(){\r\n            const table = $('#dataTable').DataTable({\r\n                \"autoWidth\": false,\r\n                \"destroy\": true,\r\n                \"columnDefs\": [{\r\n                  \"width\": '3%',\r\n                  \"targets\": 3,\r\n                  \"data\": null,\r\n                  \"defaultContent\": \"<button type='button' class='btn btn-danger delete'>Delete</button>\"\r\n                },{\r\n                  \"width\": '3%',\r\n                  \"targets\": 4,\r\n                  \"data\": null,\r\n                  \"defaultContent\": \"<button type='button' class='btn btn-info edit'>See More</button>\"\r\n                }],\r\n            });\r\n\r\n            this.dao.init();\r\n            this.dao.loadTable(table);\r\n            //Add new place\r\n            $('#addAdd').on('click', () => {\r\n                let newName = $('#newName').val();\r\n                let newAddress = $('#newAddress').val();\r\n                if(( newName == \"\" ) || ( newAddress == \"\" )){\r\n                    alert('123');\r\n                }else{\r\n                    this.dao.addNew(newName,newAddress);\r\n                    newName = $('#newName').val('');\r\n                    newAddress = $('#newAddress').val('');\r\n                }\r\n            });\r\n\r\n            //Delete fastfood object\r\n            $('#dataTable tbody').on( 'click', '.delete', (e) => {\r\n                let that = $( e.target );\r\n                let data = that.parent().parent().attr('data-key');\r\n                dialog.confirm({\r\n                    title: \"Delete place\",\r\n                    message: \"Do you want delete this place?\",\r\n                    cancel: \"Cancel\",\r\n                    button: \"Accept\",\r\n                    required: true,\r\n                    callback: (value) => {\r\n                        if(value == true){\r\n                            this.dao.deleteData(data);\r\n                            table.rows(that.parents('tr')).remove().draw();\r\n                        }else{\r\n                            return false;\r\n                        }\r\n                    }\r\n                    }); \r\n            });\r\n\r\n            //Button LogOut\r\n            $('#btnLogOut').on('click', (e) => {\r\n                console.log(\"logout\");\r\n                dialog.confirm({\r\n                    title: \"Logout\",\r\n                    message: \"Do you want to exit?\",\r\n                    cancel: \"No\",\r\n                    button: \"Yes\",\r\n                    required: true,\r\n                    callback: (value) => {\r\n                    if(value == true){\r\n                        this.dao.firebase.auth.signOut();\r\n                        this.router.navigate('#!login');\r\n                    }else{\r\n                        return false;\r\n                    }\r\n                    }\r\n                });\r\n            });\r\n\r\n            // Realisation button \"Show more\"\r\n            $('#dataTable tbody').on( 'click', '.edit', (e) => {\r\n                let id = $(e.target).parent().parent().attr('data-key');\r\n                this.router.navigate(`show/${id}`);\r\n            });\r\n        }\r\n        \r\n    }\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./js/app.js?");

/***/ }),

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Initialize\", function() { return Initialize; });\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./firebase */ \"./js/firebase.js\");\n/* harmony import */ var _routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routing */ \"./js/routing.js\");\n\r\n\r\n\r\nclass Initialize{\r\n    constructor(){\r\n        this.firebase = new _firebase__WEBPACK_IMPORTED_MODULE_0__[\"Firebase\"]();\r\n        this.router = new _routing__WEBPACK_IMPORTED_MODULE_1__[\"Router\"]();\r\n    }\r\n\r\n    init(){\r\n\r\n        this.firebase.init();\r\n        this.router.init();\r\n\r\n        this.firebase.auth.onAuthStateChanged(firebaseUser => {\r\n            if (!firebaseUser) this.router.navigate('login');\r\n        });\r\n    }\r\n}\r\n    \r\n\r\n\r\n\n\n//# sourceURL=webpack:///./js/init.js?");

/***/ }),

/***/ "./js/login.js":
/*!*********************!*\
  !*** ./js/login.js ***!
  \*********************/
/*! exports provided: AuthView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AuthView\", function() { return AuthView; });\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./firebase */ \"./js/firebase.js\");\n/* harmony import */ var _routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routing */ \"./js/routing.js\");\n\r\n\r\n\r\n    class Authentifications{\r\n        constructor(){\r\n            this.firebase = new _firebase__WEBPACK_IMPORTED_MODULE_0__[\"Firebase\"]();\r\n            this.router = new _routing__WEBPACK_IMPORTED_MODULE_1__[\"Router\"]();\r\n        }\r\n\r\n\r\n        logInGoogle() {\r\n            let provider = new firebase.auth.GoogleAuthProvider();\r\n            this.firebase.auth.signInWithPopup(provider)\r\n            .then(() => this.router.navigate('app'));\r\n        }\r\n\r\n        logInAnon() {\r\n            this.firebase.auth.signInAnonymously().then(() => {\r\n                console.log(\"You are logged in anonymously.\");\r\n                this.router.navigate('app');\r\n            });\r\n        }\r\n        //Realisation button \"Login\"\r\n        logIn(email, pass) {\r\n            this.email = email;\r\n            this.pass = pass;\r\n            this.firebase.auth.signInWithEmailAndPassword(email, pass).then(() => {\r\n                console.log(\"You are logged in.\");\r\n                this.router.navigate('app');\r\n            }).catch(function (error) {\r\n                if((email == \"\")||(pass == \"\")){\r\n                    dialog.alert({\r\n                        title: \"Sorry!\",\r\n                        message: \"Enter any login data!\"\r\n                    });\r\n                }else{\r\n                    dialog.alert({\r\n                        title: \"Sorry!\",\r\n                        message: \"Sign Up please!\"\r\n                    });\r\n                }\r\n            });\r\n        }\r\n\r\n        //Realisation button \"Sign Up\"\r\n        signUp(email, pass) {\r\n            this.email = email;\r\n            this.pass = pass;\r\n            this.firebase.auth.createUserWithEmailAndPassword(email, pass).then(() => {\r\n                dialog.alert({\r\n                    title: \"Thanks!\",\r\n                    message: \"Thanks for registration!\"\r\n                });\r\n                this.router.navigate('app');\r\n            }).catch((e) => dialog.alert({\r\n                title: \"Sory!\",\r\n                message: \"The email address is badly formatted!\"\r\n            }));\r\n        }\r\n\r\n    }\r\n\r\n    class AuthView{\r\n\r\n        constructor(){\r\n            this.authorization = new Authentifications();\r\n        }\r\n\r\n        init(){\r\n            //Button LogIn with email and pass\r\n            $('#btnLogIn').on('click', (e) => {\r\n                const email = $(\"#txtEmail\").val();\r\n                const pass = $(\"#txtPassword\").val();\r\n                this.authorization.logIn(email, pass);\r\n            });\r\n\r\n            //Button LogInAnon\r\n            $('#btnLogInAnon').on('click', (e) => {\r\n                console.log('anon');\r\n                this.authorization.logInAnon();\r\n            });\r\n\r\n            //Button LogInGoogle\r\n            $('#btnLogInGoogle').on('click', (e) => {\r\n                this.authorization.logInGoogle();\r\n            });\r\n\r\n            //Button SignIn with email and pass\r\n            $('#btnSignUp').on('click', (e) => {\r\n                const email = $(\"#txtEmail\").val();\r\n                const pass = $(\"#txtPassword\").val();\r\n                this.authorization.signUp(email, pass);\r\n            });\r\n        }\r\n    }\r\n\n\n//# sourceURL=webpack:///./js/login.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Router\", function() { return Router; });\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./js/app.js\");\n/* harmony import */ var _show__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./show */ \"./js/show.js\");\n/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login */ \"./js/login.js\");\n\r\n\r\n\r\n\r\nlet instance = null;\r\n\r\nclass Router{\r\n\r\n    constructor(){\r\n        if(instance) return instance;\r\n        instance = this;\r\n\r\n        this.router = new Navigo(null, true, '#!');\r\n        this.app = new _app__WEBPACK_IMPORTED_MODULE_0__[\"AppView\"]();\r\n        this.authView = new _login__WEBPACK_IMPORTED_MODULE_2__[\"AuthView\"]();\r\n        this.show = new _show__WEBPACK_IMPORTED_MODULE_1__[\"ShowView\"]();\r\n    }\r\n\r\n    loadHTML(url, id){\r\n      return fetch(url)\r\n        .then(response => response.text())\r\n        .then(html => $(id).html(html));\r\n    };\r\n\r\n    init(){\r\n\r\n      this.router.on({\r\n        'addnew': () => {\r\n          this.loadHTML('./templates/app.html', '#content')\r\n            .then(() => this.loadHTML('./templates/add.html', '#addBlock'))\r\n            .then(() => this.app.init());\r\n        },\r\n        'app': () => {\r\n          this.loadHTML('./templates/app.html', '#content')\r\n            .then(() => this.app.init());\r\n        },\r\n        'show/:key': (params) => {\r\n          this.loadHTML('./templates/app.html', '#content')\r\n            .then(() => this.app.init())\r\n            .then(() => {\r\n              let input = document.createElement('input');\r\n              input.id = 'dataKey';\r\n              input.type = 'hidden';\r\n              $('#content').append(input);\r\n              $('#dataKey').val(`${params.key}`);\r\n            })\r\n            .then(() => this.loadHTML('./templates/show.html', '#addBlock'))\r\n            .then(() => this.show.showMore());\r\n        },\r\n        'login': () => { \r\n          this.loadHTML('./templates/login.html', '#content')\r\n          .then(() => this.authView.init()); \r\n        },\r\n        '': () => this.router.navigate('app')\r\n      }).resolve();\r\n\r\n    }\r\n\r\n    navigate(url) {\r\n      this.router.navigate(url);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./js/routing.js?");

/***/ }),

/***/ "./js/show.js":
/*!********************!*\
  !*** ./js/show.js ***!
  \********************/
/*! exports provided: ShowView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ShowView\", function() { return ShowView; });\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./firebase */ \"./js/firebase.js\");\n/* harmony import */ var _routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routing */ \"./js/routing.js\");\n\r\n\r\n\r\n    class ShowActions{\r\n\r\n        constructor(){\r\n            this.firebase = new _firebase__WEBPACK_IMPORTED_MODULE_0__[\"Firebase\"]();\r\n            this.name = 'Fastfoods';\r\n        }\r\n\r\n        init(){\r\n            this.base = this.firebase.database.ref(this.name);\r\n            this.storage = this.firebase.storage;\r\n        }\r\n\r\n        getShowData(id){\r\n            let thisData = this.base.child(id);\r\n            return thisData.once(\"value\").then((snapshot) => {\r\n\r\n                //We get the name and address using a unique key and write it in the \"Show more\" section and in the DOM\r\n                var title = snapshot.child('name').val();\r\n                var address = snapshot.child('address').val();\r\n                var info = snapshot.child('info').val();\r\n                var rating = snapshot.child('rating').val();\r\n\r\n                return {\r\n                    title,\r\n                    address,\r\n                    info,\r\n                    rating\r\n                };\r\n\r\n            });\r\n        }\r\n\r\n        getShowComments(id){\r\n            let commentsRef = this.base.child(id+'/comments');\r\n            return commentsRef.once('value').then((snapshot) => {\r\n                return snapshot.val();\r\n            })\r\n        }\r\n\r\n        uploadImage(target,id){\r\n            let file = target.files[0];\r\n            let storageRef = this.storage.ref(id);\r\n            let task = storageRef.put(file);\r\n            task.on('state_changed',\r\n                (snapshot) => {\r\n                    let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;\r\n                    $('#uploader').val(percentage);\r\n                },\r\n                (err) => {\r\n                    console.log('Upload image for this place.');\r\n                },\r\n                () => {\r\n                    console.log('Complete!')\r\n                    $('.image').attr('src', '');\r\n                    this.downloadImage(id);\r\n                }\r\n            );\r\n        }\r\n        \r\n        rating(id,array){\r\n            console.log(array);\r\n            let sum = 0;\r\n            let mRating;\r\n            for(let i = 0; i < array.length; i++){\r\n                sum += +array[i];\r\n                mRating = sum/array.length;\r\n            }\r\n            let allRating = Math.floor(mRating);\r\n            console.log(allRating);\r\n            this.editDataRating(id,allRating);\r\n            let elem = $('[data-key='+id+'] td:eq(2)');\r\n            elem.html(allRating);\r\n        };\r\n\r\n        downloadImage(id){\r\n            return this.storage.ref(id).getDownloadURL().then((url) => {\r\n                $('.image').attr('src', url);\r\n            }).catch(e => console.error(\"Image does not exist!\"));\r\n        }\r\n\r\n        editDataName(id,value){\r\n            let thisData = this.base.child(id);\r\n                thisData.update({\r\n                    name: value\r\n                });\r\n        };\r\n\r\n        editDataAddress(id,value){\r\n            let thisData = this.base.child(id);\r\n                thisData.update({\r\n                    address: value\r\n                });\r\n        };\r\n\r\n        editDataInfo(id,value){\r\n            let thisData = this.base.child(id);\r\n                thisData.update({\r\n                    info: value\r\n                });\r\n        };\r\n\r\n        editDataRating(id,value){\r\n            let thisData = this.base.child(id);\r\n                thisData.update({\r\n                    rating: value\r\n                });\r\n        };\r\n\r\n        addNewComment(id,name,comment,rating) {\r\n            this.base.child(id+'/comments').push({\r\n                name: name,\r\n                comment: comment,\r\n                rating: rating\r\n            });   \r\n        };\r\n        \r\n        deleteNewComment(id,key) {\r\n            this.base.child(id+'/comments'+'/'+key).remove();\r\n        };\r\n    }\r\n    \r\n    class ShowView{\r\n\r\n        constructor(){\r\n            this.router = new _routing__WEBPACK_IMPORTED_MODULE_1__[\"Router\"]();\r\n            this.actions = new ShowActions();\r\n        }\r\n        //Show more window about each place\r\n        showMore(){\r\n            const id = $('#dataKey').val();\r\n            \r\n            this.actions.init();\r\n            this.actions.getShowData(id)\r\n            .then(data => {\r\n                var tmpl = $('#template').html();\r\n                var compiled = Handlebars.compile(tmpl);\r\n                var result = compiled(data);\r\n                $('#result').html(result);\r\n                }\r\n                \r\n            )\r\n            .then(() => this.actions.downloadImage(id))\r\n            .then(() => {\r\n\r\n                //Changes for title\r\n                $('.title').on('click', (e) => {\r\n                    let newTitle = dialog.prompt({\r\n                        title: \"New Name\",\r\n                        message: \"Enter new name\",\r\n                        button: \"Submit\",\r\n                        input: {\r\n                            type: \"text\",\r\n                            placeholder: \"New name...\"\r\n                        },\r\n                        validate: (value) => {\r\n                            if( $.trim(value) === \"\" ){\r\n                                return false;\r\n                            }else{\r\n                                this.actions.editDataName(id,value);\r\n                                $('.title').html(value);\r\n                                let elem = $('[data-key='+id+'] td:eq(0)');\r\n                                elem.html(value);\r\n                            }\r\n                        }\r\n                    });  \r\n                });\r\n\r\n                //Changes for address and geolocation\r\n                $('#Address').geocomplete({ map: '#map' });\r\n                $('#Address').trigger('geocode');\r\n                $('.address').on('click', (e) => {\r\n                    $('.address').addClass('hide');\r\n                    $('#Address').removeClass('hide');\r\n                });\r\n                $('#Address').on('keypress', (e) => {\r\n                    e = e || window.event;\r\n                    let value = $('#Address').val();\r\n                    if (e.keyCode === 13) {\r\n                        if( $.trim(value) === \"\" ){\r\n                            return false;\r\n                        }else{\r\n                            this.actions.editDataAddress(id,value);\r\n                            $('.address').html(value);\r\n                            let elem = $('[data-key='+id+'] td:eq(1)');\r\n                            elem.html(value);\r\n                            $('#Address').addClass('hide');\r\n                            $('.address').removeClass('hide');\r\n                        }\r\n                    }\r\n                });\r\n\r\n                //Changes for info\r\n                $('.info').on('click', (e) => {\r\n                    let newInfo = dialog.prompt({\r\n                        title: \"New Info about place\",\r\n                        message: \"Enter new info about this place\",\r\n                        button: \"Submit\",\r\n                        input: {\r\n                            type: \"text\",\r\n                            placeholder: \"New info...\"\r\n                        },\r\n                        validate: (value) => {\r\n                            if( $.trim(value) === \"\" ){\r\n                                return false;\r\n                            }else{\r\n                                this.actions.editDataInfo(id,value);\r\n                                $('.info').html(value);\r\n                            }\r\n                        }\r\n                    });\r\n                });\r\n\r\n                //Upload new image\r\n                $('#fileButton').on('change', (e) => {\r\n                    let target = e.target;\r\n                    this.actions.uploadImage(target,id);\r\n                });\r\n            \r\n                //Comments button\r\n                $('#comments').on('click', (e) => {\r\n                    $('#comments-wrapper').toggle();\r\n                    $('#commentaries').toggle();\r\n                    $('#commentaries').empty();\r\n                    this.seeComment(id);\r\n                });\r\n                \r\n                //Add new comment\r\n                $('#comments-button').on('click', (e) => {\r\n                    let newComName = $('#comments-name').val();\r\n                    let newComComment = $('.comments-area').val();\r\n                    let newRating = $(\"#ratingSel\").val();\r\n                    if((newComName==\"\")||(newComComment==\"\")||(newRating=='Rating:')){\r\n                        dialog.alert({\r\n                            title: \"Fields not filled!\",\r\n                            message: \"You must fill in all fields!\"\r\n                        });\r\n                    }else{\r\n                        this.actions.addNewComment(id,newComName,newComComment,newRating);\r\n                        dialog.alert({\r\n                            title: \"Thanks!\",\r\n                            message: \"Your comment has been sent successfully!\"\r\n                        });\r\n                        $('#comments-name').val('');\r\n                        $('.comments-area').val('');\r\n                        $('#commentaries').html('');\r\n                        this.seeCommentAndUpdateRating(id);\r\n                    }\r\n                });\r\n\r\n                //Delete new comment\r\n                $('#commentaries').on('click', '.comDelete', (e) => {\r\n                    let key = event.target.getAttribute('data-comment');\r\n                    $(event.target).parent().remove();\r\n                    this.actions.deleteNewComment(id,key);\r\n                    $('#commentaries').html('');\r\n                    this.seeCommentAndUpdateRating(id);\r\n                });\r\n\r\n            });\r\n\r\n            //Close \"Show more\" window\r\n            $('#content').on( 'click','#Close', e => {\r\n                $('#fileButton').val('');\r\n                $('#uploader').attr('value', '0');\r\n                this.router.navigate('app');\r\n            });\r\n        }\r\n\r\n        seeCommentAndUpdateRating(id) {\r\n            let arr = [];\r\n            this.seeComment(id, arr).then(() => {\r\n                this.actions.rating(id,arr);\r\n            });\r\n        }\r\n\r\n        //Rating realisation            \r\n        seeComment(id, arr){\r\n            if (!arr) arr = [];\r\n            return this.actions.getShowComments(id).then(comments => {\r\n                for (const key in comments) {\r\n                    const {name, comment, rating} = comments[key];\r\n                    arr.push(rating);\r\n                    \r\n                    let comTmpl = $('#comTemplate').html();\r\n                    let compiledCom = Handlebars.compile(comTmpl);\r\n                    let resultCom = compiledCom({\r\n                        comments:[{\r\n                            key: key,\r\n                            name: name,\r\n                            comment: comment,\r\n                            rating: rating\r\n                        }]\r\n                    });\r\n                    $('#commentaries').append(resultCom);\r\n                }\r\n            });\r\n        };\r\n    }\r\n\n\n//# sourceURL=webpack:///./js/show.js?");

/***/ })

/******/ });