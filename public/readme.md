## Angular Framework


## Official Angular Documentation

Documentation for the framework can be found on the [Angular website](https://angularjs.org).

## Install

init folder structure

```
mkdir angular.dev
cd angular.dev/
npm init
npm install http-server bower --save-dev
```

setup bower

```
$vi .bowerrc
{
  "directory": "bower_components"
}
bower init
bower install angular angular-route angular-loader angular-mocks html5-boilerplate --save
```

add some scripts to package.json

```Json
"scripts": {
"postinstall": "bower install",

"prestart": "npm install",
"start": "http-server -a localhost -p 8000 -c-1",
}
```

## Project

create folder structure

```
.
├── bower.json               // bower files
├── bower_components
│   ├── angular
│   ├── angular-loader
│   ├── angular-mocks
│   ├── angular-route
│   └── html5-boilerplate
├── css                      // css dir
│   └── app.css
├── img                      // images dir
├── index.html               // main html
├── js                       // js dir
│   ├── app.js
│   ├── controllers
│   │   ├── controllers.js
│   └── services
├── node_modules             // npm files
│   ├── bower
│   └── http-server
├── package.json
└── views                 // view views
    └── home
```

Starting angular to me, this makes more sense as a folder structure.
we have a classic MVW structure, Controller, and app initialization lives in the JS folder
View lives in views folder and instead of model, and the Whatever the rest maybe I have service based architecture

we first create app.js, giving a name to our main controller, and setting default reoutes

```JS
'appControllers',
...
.otherwise({redirectTo: '/home'});
```

then in `js/controllers/controllers.js` instantiate angular module, this main controller will be reused

```JS
var appControllers = angular.module( 'appControllers', ['ngRoute'] );
```

then in `js/controllers/home.js` we for now just set some root scope variables, to distinguish the page from others

```JS
appControllers.controller( 'HomeController', function( $scope, $rootScope, $http ) {

    $rootScope.page_id = 'page-home';

});
```

we can leave `js/services` blank for now, and so for `css/app.css`

in index.html, we create boilerplate html code, add resources to what is our main template

ng-view will be the piece overwriten by the views

```html
<div ng-view></div>
```

last but not list, create our `views/home/index.html`

```html
<p>hello world</p>
```

## Start

by running npm start we kick off the script we've added, runing npm/bower install to fetch modules, resources and run the web server.


### License

The Laravel framework is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
