// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array or 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  // Set up the initial routes that our app will respond to.
  // These are then tied up to our nav router which animates and
  // updates a navigation bar
  $stateProvider
    .state('server', {
      url: '/server',
      templateUrl: 'templates/server.html',
    })
     .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
           controller: 'LoginCtrl'
        })
  .state('main', {
    url: '/main',
    templateUrl: 'templates/main.html',
    controller: 'MainCtrl'
  });
   $stateProvider
    .state('cust', {
      url: '/customer',
      templateUrl: 'templates/customer.html',
    })
  // if none of the above routes are met, use this fallback
  // which executes the 'AppCtrl' controller (controllers.js)
  $urlRouterProvider.otherwise('/login');

})
.controller('MainController', ['$scope', '$location', '$ionicModal','$state',
  function($scope, $location, $ionicModal,$state) {
    $scope.goTo = function(page) {
      console.log('Going to ' + page);
    //  $scope.sideMenuController.toggleLeft();
     // $location.url('/' + page);
         $state.go(page);

    };
// Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/modal.html', function($ionicModal) {
      $scope.modal = $ionicModal;
    }, {
      // Use our scope for the scope of the modal to keep it simple
      scope: $scope,
      // The animation we want to use for the modal entrance
      animation: 'slide-in-up'
    });

    $scope.openModal = function() {
      console.log('Opening Modal!');
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    }
  }
])
.controller('MenuCtrl', function($scope,$state) {
$scope.list = [];
                                $scope.list.push({
                                                                          text :    "customer",
                                                                          link :    "/customer",
                                                                          icon :    "icon ion-person"
                                                              });
                                $scope.list.push({
                                                                           text :    "Manual Order",
                                                                           link :    "/maunal",
                                                                           icon :    "icon ion-clipboard"
                                                               });
                                $scope.list.push({
                                                                            text :    "Catalogue",
                                                                            link :    "/maunal",
                                                                            icon :    "icon ion-images"
                                                                                                });
                                 $scope.list.push({
                                                                           text :    "Server Configuration",
                                                                           link :    "/server",
                                                                           icon :    "icon ion-settings"
                                                               });
                                $scope.list.push({
                                                                           text :    "About",
                                                                           link :    "/customer",
                                                                           icon :    "icon ion-information-circled"
                                                                                               });
                                 $scope.list.push({
                                                                             text :    "Update Data",
                                                                             link :    "/login",
                                                                             icon :    "icon ion-archive"
                                                                                               });
                                $scope.list.push({
                                                                           text :    "Log out",
                                                                           link :    "/login",
                                                                           icon :    "icon ion-log-out"
                                                               });
              $scope.CreateMenu = function(list) {
                               };
        $scope.CreateMenu($scope.list);
        $scope.openLeft = function(link) {
        alert(link);
                  $state.go(link);
                };
        })
.controller('LoginCtrl', function($scope,$location,$state) {
$scope.submit=function(feed){
   $state.go('server');
  };
})

.controller('MainCtrl', ['$scope', '$location', '$ionicModal',
                         function($scope, $location, $ionicModal) {
  console.log('MainCtrl');
  // Load the modal from the given template URL
      $ionicModal.fromTemplateUrl('templates/modal.html', function($ionicModal) {
        $scope.modal = $ionicModal;
      }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
      });

      $scope.openModal = function() {
        console.log('Opening Modal!');
        $scope.modal.show();
      };

      $scope.closeModal = function() {
        $scope.modal.hide();
      }
 $scope.goTo = function(page) {
      console.log('Going to ' + page);
    //  $scope.sideMenuController.toggleLeft();
     // $location.url('/' + page);
         $state.go(page);

    };
}]);


