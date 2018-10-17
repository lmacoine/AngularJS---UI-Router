var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.factory('battlocalstorage', ['$window', function($window) { // factory = service
    return {
        set: function(key, value) { 
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue || false;
        },
    }
}]);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // ETAT DE LA HOME & VUES ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'home.html'
        })

        // form
        .state('home.form', {
            url: '/signin',
            templateUrl: 'home-form.html',
            controller: function($scope, battlocalstorage) {
                $scope.user = {
                    name: battlocalstorage.get("name"),
                    email: battlocalstorage.get("email")
                }
                $scope.saveUser = function(user) {
                    battlocalstorage.set("name", user.name);
                    battlocalstorage.set("email", user.email);
                }                
            }
        })

        .state('home.datatable', {
            url: '/datatable',
            templateUrl: 'home-datatable.html',
            controller: function($scope, $http) {
                $http.get('/sample.csv').success(function(csv) {
                    // console.log(csv);
                    var lines = csv.split('\n');
                    // console.table(lines);

                    for (var i = 0; i < lines.length; i++) {
                        var cells = lines[i].split(',');
                        console.log(cells);
                    }
                });
               
            }
        })

        .state('home.map', {
            url: '/map',
            template: 'I could sure use a drink right now.'
        })

        // PAGE 'ABOUT' & PLUSIEURS VUES =================================
        .state('about', {
            url: '/about',
            views: {
                // the main template will be placed here (relatively named)
                '': { templateUrl: 'about.html' },

                // the child views will be defined here (absolutely named)
                'columnOne@about': { template: 'Donec ac tellus enim. Fusce consequat risus ipsum, quis vestibulum ex sollicitudin id. ' },

                // for column two, we'll define a separate controller 
                'columnTwo@about': { 
                    templateUrl: 'table-data.html',
                    controller: 'scotchController'
                }
            }

        });

}); // closes $routerApp.config()

// let's define the scotch controller that we call up in the about state
routerApp.controller('scotchController', function($scope) {

    $scope.message = 'test';

    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];

});
