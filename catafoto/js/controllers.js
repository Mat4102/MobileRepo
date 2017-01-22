angular.module('starter.controllers', [])

///**************************** Main Control Done

.controller('MainCtrl', ['$scope', '$ionicModal','$state','$ionicLoading','$timeout',
                         function($scope, $ionicModal,$state,$ionicLoading,$timeout) {
      $ionicModal.fromTemplateUrl('templates/modal.html', function($ionicModal) {
        $scope.modal = $ionicModal;
      }, {
        scope:$scope,
        animation: 'slide-in-up'
      });

      $scope.openModal = function() {
        $scope.modal.show();
      };

      $scope.closeModal = function() {
        $scope.modal.hide();
      }
 $scope.goTo = function(page) {
         $state.go(page);
    };
     // Trigger the loading indicator
      $scope.show = function() {

        // Show the loading overlay and text
        $scope.loading = $ionicLoading.show({

          // The text to display in the loading indicator
          content: 'checking .. please waite',

          // The animation to use
          animation: 'fade-in',

          // Will a dark overlay or backdrop cover the entire view
          showBackdrop: true,

          // The maximum width of the loading indicator
          // Text will be wrapped if longer than maxWidth
          maxWidth: 200,

          // The delay in showing the indicator
          showDelay: 500
        });
      };

      // Hide the loading indicator
      $scope.hide = function(){
        $scope.loading.hide();
      };

      $scope.onRefresh = function() {
          console.log('ON REFRESH');

          $timeout(function() {
            $scope.$broadcast('scroll.refreshComplete');
          }, 1000);
        }

}])

///**************************** Menu Control Done

.controller('MenuCtrl', function($scope,$state) {
$scope.list = [];
                                $scope.list.push({
                                                                          text :    "customer",
                                                                          link :    "main",
                                                                          icon :    "icon ion-person"
                                                              });
                                $scope.list.push({
                                                                           text :    "Manual Order",
                                                                           link :    "manual",
                                                                           icon :    "icon ion-clipboard"
                                                               });
                                $scope.list.push({
                                                                            text :    "Catalogue",
                                                                            link :    "catalogue",
                                                                            icon :    "icon ion-images"
                                                                                                });
                                 $scope.list.push({
                                                                           text :    "Server Configuration",
                                                                           link :    "server",
                                                                           icon :    "icon ion-settings"
                                                               });
                                $scope.list.push({
                                                                           text :    "About",
                                                                           link :    "main",
                                                                           icon :    "icon ion-information-circled"
                                                                                               });
                                 $scope.list.push({
                                                                             text :    "Update Data",
                                                                             link :    "login",
                                                                             icon :    "icon ion-archive"
                                                                                               });
                                $scope.list.push({
                                                                           text :    "Log out",
                                                                           link :    "login",
                                                                           icon :    "icon ion-log-out"
                                                               });
              $scope.CreateMenu = function(list) {
                               };
        $scope.CreateMenu($scope.list);
        $scope.openLeft = function(link) {
                  $state.go(link);
                };
        })
///**************************** Login Control (problem in scope )

.controller('LoginCtrl', function($scope,$state, $cookieStore,api,UserFactory,Base64,ViewManager) {
var passhash=""
$scope.map="";
$scope.users=[];
var i =0;
$scope.submit=function(feed) {
 if (feed.$valid) {
  alert("login: "+$scope.login);
        $scope.show();
 if (($scope.password !== null) && ($scope.password !== undefined) && ($scope.password !== '')){
  passhash =Base64.encode($scope.password);
    }
var idView=Math.floor((Math.random()*500)+1);
//UserFactory.PUT($scope.login,passhash);
// $scope.mapView= "function(doc){if (doc.type && doc.type=='USER') emit(doc.value.login,[doc.value.login,doc.value.password]);}";

 //ViewManager.createView("UserView",$scope.mapView);
 UserFactory.GET("UserView",function(data) {

    $scope.users = data.rows;

if ($scope.users.length!= 0)
             {
             if ( i<$scope.users.length)
             {
            if ($scope.login===$scope.users[i].key)
            {
           var password= $scope.users[i].value[1];
           var pass =Base64.decode(password);
                if(pass===$scope.password)
             {
                 $scope.hide();
                 var token = 'token'+$scope.users[i].key;
                 api.init(token);
                 $cookieStore.put('token', token);
                 $state.go("server");
             }
                 else  {
                     alert("password incorrect!");
                     }
               }

       else i++ ;

             }
             else if($scope.login!=$scope.users[$scope.users.length-1].key)
              {    alert("login incorrect!");
              }}
              });

}

};

})
///********************************* Server control Done

.controller('ConfigServer', function ($scope,ServerFactory,$location,ViewManager) {
 $scope.map="";
$scope.PutServer=function(feed) {
 if (feed.$valid) {
 $scope.map= "function(doc){if (doc.type=='server') emit(doc._id, doc);}";
           ServerFactory.GET("server",$scope.server,$scope.port,$scope.login,$scope.pwd) ;
        // ViewManager.createView("server",$scope.map);
                $location.path('/main');
                                         };
                                         }
   })
 ///********************************** OrderList control will be updated dynamically
.controller('OrderList', function($scope) {
$scope.list = [];
                                $scope.list.push({
                                                                          Date :    "12-02-2014",
                                                                          Article :    "article1",
                                                                          Quantity :    "12"
                                                              });
                                $scope.list.push({                          Date :    "23-03-2014",
                                                                            Article :    "article1",
                                                                            Quantity :    "13"
                                                               });
                                $scope.list.push({                          Date :    "12-01-2014",
                                                                             Article :    "article2",
                                                                            Quantity :    "14"
                                                                                                                });
                                 $scope.list.push({                         Date :    "31-01-2014",
                                                                            Article :    "article3",
                                                                            Quantity :    "15"
                                                                                                                 });

              $scope.CreateMenu = function(list) {
                               };
        $scope.CreateMenu($scope.list);
        })

///**************************** Customer control
.controller('ServiceCliente', function($scope,CustomerFactory,$state,ViewManager,$filter,$templateCache,$http,sharedProperties) {
var database="http://localhost:5984/catafoto";
$scope.map="";
$scope.customers=[];
$scope.itemss=[];
$scope.codes=[];
$scope.customer={};
$scope.template='page1';
$scope.GETCustomer=function(code) {

 //$scope.map=  "function(doc){if (doc.type=='CLIE' && doc.id==='"+code+"')||(doc.type=='CLIE' && doc.description1==='"+code+"') emit(doc._id, doc);}";
 //$scope.map=  "function(doc){if (doc.type=='CLIE') emit(doc._id,[doc.id,doc.description1,doc.description2,doc.destination.address]);}";
//ViewManager.createView("CLIE1",$scope.map);

 CustomerFactory.GET(function(data) {

    $scope.customers = data.rows;
    // var found = $filter('getByCode')($scope.customers, code);
    $scope.$watch('code', function()
                        {
                            $scope.customers = $filter('filter')($scope.customers, code);
                            if ($scope.customers==undefined)
                            alert("code or name undefined !");
                            else {
                             $scope.isPatientInUnit = function(o) {return o.id;};
                             $scope.selectedPatient;
                            angular.forEach($scope.customers, function(item) {
                            var idCust=item.id;
                            CustomerFactory.GETLocal(idCust,function(data) {
                                                                  if((data._id == null) && (data._id == undefined) && (data._id == ''))
                                                                      $scope.customer= "";
                                                                      else
                                                                               {
                                                                                  $scope.customer=data;
                                                                                }
                                                                                                      });
                                });

                             }
                        });

                if ( $scope.customers.length== 0)
                alert("Customer Code or name not found, please retry");
                  });

                                   };
 $scope.getCustmer=function(id) {
                $scope.code=id;
            $scope.template='page2';
                                };
 $scope.goto=function(){
                          $scope.template='page1';
                          $scope.code="";
                                              };


 })

///**************************** Catalogue Control
 .controller('IntroCtrl', function($scope, $state) {

     // Called to navigate to the main app
   var startApp = function() {
     $state.go('main');

     // Set a flag that we finished the tutorial
   //  window.localStorage['didTutorial'] = true;
   window.localStorage.clear();
   };

   // Check if the user already did the tutorial and skip it if so
   if(window.localStorage['didTutorial'] === "true") {
     console.log('Skip intro');
     startApp();
   }

   // Move to the next slide
   $scope.next = function() {
     $scope.$broadcast('slideBox.nextSlide');
   };

   // Our initial right buttons
   var rightButtons = [
     {
       content: 'Next',
       type: 'button-light button-clear',
       tap: function(e) {
         // Go to the next slide on tap
         $scope.next();
       }
     }
   ];

   // Our initial left buttons
   var leftButtons = [
     {
       content: 'Home',
       type: 'button-light button-clear',
       tap: function(e) {
         // Start the app on tap
         startApp();
       }
     }
   ];

   // Bind the left and right buttons to the scope
   $scope.leftButtons = leftButtons;
   $scope.rightButtons = rightButtons;


   // Called each time the slide changes
   $scope.slideChanged = function(index) {

     // Check if we should update the left buttons
     if(index > 0) {
       // If this is not the first slide, give it a back button
       $scope.leftButtons = [
         {
           content: 'Back',
           type: 'button-light button-clear',
           tap: function(e) {
             // Move to the previous slide
             $scope.$broadcast('slideBox.prevSlide');
           }
         }
       ];
     } else {
       // This is the first slide, use the default left buttons
       $scope.leftButtons = leftButtons;
     }

     // If this is the last slide, set the right button to
     // move to the app
     if(index == 2) {
       $scope.rightButtons = [
         {
           content: 'exit catalgue',
           type: 'button-light button-clear',
           tap: function(e) {
             startApp();
           }
         }
       ];
     } else {
       // Otherwise, use the default buttons
       $scope.rightButtons = rightButtons;
     }
   };
 })

  .controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate) {
    var cardTypes = [
      { title: 'Swipe down to clear the card', image: 'http://ionicframework.com.s3.amazonaws.com/demos/ionic-contrib-swipecards/pic.png' },
      { title: 'Where is this?', image: 'http://ionicframework.com.s3.amazonaws.com/demos/ionic-contrib-swipecards/pic.png' },
      { title: 'What kind of grass is this?', image: 'http://ionicframework.com.s3.amazonaws.com/demos/ionic-contrib-swipecards/pic2.png' },
      { title: 'What beach is this?', image: 'http://ionicframework.com.s3.amazonaws.com/demos/ionic-contrib-swipecards/pic3.png' },
      { title: 'What kind of clouds are these?', image: 'http://ionicframework.com.s3.amazonaws.com/demos/ionic-contrib-swipecards/pic4.png' }
    ];

    $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

    $scope.cardSwiped = function(index) {
      $scope.addCard();
    };

    $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
    };

    $scope.addCard = function() {
      var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      newCard.id = Math.random();
      $scope.cards.push(angular.extend({}, newCard));
    };
    $scope.goAway = function() {
    alert("i clicked go away");
          $scope.addCard();
        };
  });


