angular.module('starter.services', [])
.factory('httpInterceptor', function httpInterceptor ($q, $window, $location) {
	return function (promise) {
		var success = function (response) {
			return response;
		};

		var error = function (response) {
			if (response.status === 401) {
				$location.url('/login');
			}

			return $q.reject(response);
		};

		return promise.then(success, error);
	};
})
.factory('api', function ($http, $cookies) {
	return {
		init: function (token) {
			$http.defaults.headers.common['X-Access-Token'] = token || $cookies.token;
		}
	};
})
.factory('ViewManager',['$http','$templateCache', function($http,$templateCache){
var url=" " ;
var jsonView = {
                  "_id" : '_design/' ,
                  "views" : {
                          "doc":{
                          "map" : ""
                                }
                             }
                      }
  //******************* local database
var database="http://localhost:5984/catafoto";

 return {
   createView:function(type,map){
        jsonView._id=jsonView._id+type;
        jsonView.views.doc.map=map;
        url=database+'/_design/'+type ;
        $http({method:"PUT", url:url,data:jsonView, cache: $templateCache}).
                                                   success(function(data, status) {
                                                   // alert("success view ");
                                                                                  }).
                                               error(function(data, status) {
                                               //alert("Request failed, status = "+status);
                                                                             });
   }
   }
}])
  //******************* base 64 service for encoding the password
.factory('Base64', function() {
    var  _keyStr= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

 var _utf8_encode= function(string) {
         string = string.replace(/\r\n/g, "\n");
         var utftext = "";

         for (var n = 0; n < string.length; n++) {

             var c = string.charCodeAt(n);

             if (c < 128) {
                 utftext += String.fromCharCode(c);
             }
             else if ((c > 127) && (c < 2048)) {
                 utftext += String.fromCharCode((c >> 6) | 192);
                 utftext += String.fromCharCode((c & 63) | 128);
             }
             else {
                 utftext += String.fromCharCode((c >> 12) | 224);
                 utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                 utftext += String.fromCharCode((c & 63) | 128);
             }

         }

         return utftext;
     };

   var  _utf8_decode= function(utftext) {
         var string = "";
         var i = 0;
         var c = c1 = c2 = 0;

         while (i < utftext.length) {

             c = utftext.charCodeAt(i);

             if (c < 128) {
                 string += String.fromCharCode(c);
                 i++;
             }
             else if ((c > 191) && (c < 224)) {
                 c2 = utftext.charCodeAt(i + 1);
                 string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                 i += 2;
             }
             else {
                 c2 = utftext.charCodeAt(i + 1);
                 c3 = utftext.charCodeAt(i + 2);
                 string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                 i += 3;
             }

         }

         return string;
     }

  return {
     encode: function(input) {
           var output = "";
           var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
           var i = 0;

           input = _utf8_encode(input);

           while (i < input.length) {

               chr1 = input.charCodeAt(i++);
               chr2 = input.charCodeAt(i++);
               chr3 = input.charCodeAt(i++);

               enc1 = chr1 >> 2;
               enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
               enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
               enc4 = chr3 & 63;

               if (isNaN(chr2)) {
                   enc3 = enc4 = 64;
               } else if (isNaN(chr3)) {
                   enc4 = 64;
               }

               output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);

           }

           return output;
       },

       decode: function(input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;

                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                while (i < input.length) {

                    enc1 = _keyStr.indexOf(input.charAt(i++));
                    enc2 = _keyStr.indexOf(input.charAt(i++));
                    enc3 = _keyStr.indexOf(input.charAt(i++));
                    enc4 = _keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                }

                output = _utf8_decode(output);

                return output;

            },

   }
})

  //******************* Crud for customer getting customer from sellpoint and inserting it in local Database
 //*******************  if the customer exist in he local databse it will be deleted and replaced by new customer

.factory("CustomerFactory",['$http','$templateCache', function($http,$templateCache){
  var database="http://localhost:5984/catafoto";
  var sellpoint="http://192.168.0.213:8080/sellpoint/rest";
  var identity="http://192.168.0.213:8080/sellpoint/rest/identity";
  var adress =[];
  var Customer=
    {
    	    "type" : "CLIE",
    	    "Code_cliente":"",
            "id":91,
            "identityId":43,
            "identityCode":"123456",
            "identityDependencyCode":"0001",
            "paymentConditionId":5,
            "paymentConditionCode":"0007",
            "listId":1,
            "listCode":"001",
            "areaId":null,
            "areaCode":null,
            "zoneId":6,
            "zoneCode":"123",
            "sellerId":16,
            "sellerCode":"000002",
            "currencyType":"EUR",
            "discountGroupId":null,
            "discountGroupCode":null,
            "credit":100000.0,
            "startDate":"2013-10-17",
            "endDate":"2013-11-07",
            "modifyDate":1390473891328,
            "employerId":null,
            "employerCode":null,
            "companyId":4,
            "companyCode":"00008",
            "dependencyCode":"0001",
            "description1":"RAISOON SOCIAL",
            "description2":"123456 test",
            "destination":{"id":248,"address":"adresse","placeDTOId":3609,"placeDTOName":"LEVICO TERME","placeDTOCAP":"38056","placeDTODistrinct":"TN","placeDTOCountry":"IT"},
            "juridicalSubjectType":"SOC",
            "fiscalCode":"",
            "pec":"gmail@gmail.com",
            "vatnumber":"03945470965"
    };
    var createCustomer =function(id,Idenid,Idencode,identityDependencyCode,dependency, des1,des2,addr,jurdical,fisacl,mail,number,paymentConditionId,paymentConditionCode,listId,listCode,areaId,areaCode,zoneId,
    zoneCode,sellerId,sellerCode,currencyType,discountGroupId,discountGroupCode,credit,startDate,endDate,modifyDate,employerId,employerCode,companyId,companyCode)
    {

               Customer.id=id;
               Customer.identityId=Idenid;
               Customer.Code_cliente="CLIE"+id;
               Customer.description1=des1;
               Customer.description2=des2;
               Customer.juridicalSubjectType=jurdical;
               Customer.fiscalCode=fisacl;
               Customer.pec=mail;
               Customer.vatnumber=number;
               Customer.destination.id=addr.id;
               Customer.destination.address=addr.address;
               Customer.destination.placeDTOId=addr.placeDTOId;
               Customer.destination.placeDTOName=addr.placeDTOName;
               Customer.destination.placeDTOCAP=addr.placeDTOCAP;
               Customer.destination.placeDTODistrinct=addr.placeDTODistrinct;
               Customer.destination.placeDTOCountry=addr.placeDTOCountry;
               Customer.paymentConditionId=paymentConditionId;
               Customer.paymentConditionCode=paymentConditionCode;
               Customer.listId=listId;
               Customer.listCode=listCode;
               Customer.areaId=areaId;
               Customer.areaCode=areaCode;
               Customer.zoneId=zoneId;
               Customer.zoneCode=zoneCode;
               Customer.sellerId=sellerId;
               Customer.sellerCode=sellerCode;
               Customer.currencyType=currencyType;
               Customer.discountGroupId=discountGroupId;
               Customer.discountGroupCode=discountGroupCode;
               Customer.credit=credit;
               Customer.startDate=startDate;
               Customer.endDate=endDate;
               Customer.modifyDate=modifyDate;
               Customer.employerId=employerId;
               Customer.employerCode=employerCode;
               Customer.companyId=companyId;
               Customer.companyCode=companyCode;

               var url=database+"/"+ Customer.Code_cliente;
                                                          var method="PUT";
                                                           $http({method: method, url: url,data:Customer, cache: $templateCache}).
                                                                 success(function(data, status) {
                                                                alert("Creating local Customer with Success ");

                                                                 }).
                                                                 error(function(data, status) {
                                                                  alert("Request failed, status = "+status);
                                                                                   });
               };
    var deleteCust= function(cust,dataCust,rev){
      var url=database+'/CLIE'+cust.id+"?rev="+rev;
                                     $http({method: "DELETE", url: url, cache: $templateCache}).
                                                       success(function(data, status) {
createCustomer(cust.id,dataCust.id,dataCust.code,cust.identityDependencyCode,dataCust.dependencyCode,dataCust.description1,dataCust.description2,dataCust.destination,dataCust.juridicalSubjectType,dataCust.fiscalCode,dataCust.pec,dataCust.vatnumber,
cust.paymentConditionId,cust.paymentConditionCode,cust.listId,cust.listCode,cust.areaId,cust.areaCode,cust.zoneId,cust.zoneCode,cust.sellerId,cust.sellerCode,cust.currencyType,
cust.discountGroupId,cust.discountGroupCode,cust.credit,cust.startDate,cust.endDate,cust.modifyDate,cust.employerId,cust.employerCode,cust.companyId,cust.companyCode);                                                                                         }).
                                                       error(function(data, status) {
                                                                                           data = data || "Request failed";
                                                                                          alert("error deleting doc !"+status);
                                                                                       });
    }

    var LocalCustomerById= function(identity,cust,dataCust) {
  $http({method: "GET", url: database+'/CLIE'+cust.id, cache: $templateCache}).
                                                                     success(function(data, status) {
                                                     var rev = data._rev;
                                                     deleteCust(cust,dataCust,rev);
                                                                                                  }).
                                                                        error(function(data, status) {
                                        alert("local customer not found it will be created ");
createCustomer(cust.id,dataCust.id,dataCust.code,cust.identityDependencyCode,dataCust.dependencyCode,dataCust.description1,dataCust.description2,dataCust.destination,dataCust.juridicalSubjectType,dataCust.fiscalCode,dataCust.pec,dataCust.vatnumber,
cust.paymentConditionId,cust.paymentConditionCode,cust.listId,cust.listCode,cust.areaId,cust.areaCode,cust.zoneId,cust.zoneCode,cust.sellerId,cust.sellerCode,cust.currencyType,
cust.discountGroupId,cust.discountGroupCode,cust.credit,cust.startDate,cust.endDate,cust.modifyDate,cust.employerId,cust.employerCode,cust.companyId,cust.companyCode);
                                });
                      };


   var RemoteCstomeridentiy= function(identity,cust) {
                                            var url=sellpoint+"/identity/"+identity;
                                                     $http({method: "GET", url: url, cache: $templateCache}).
                                                                           success(function(data, status) {
                                                      alert("getting remote Customer with Success : "+identity);
                                                       LocalCustomerById(identity,cust,data);
                                                                                                  }).
                                                                              error(function(data, status) {
                                                                             alert("error getting remote Customer, status = "+status);
                                                                                                                    });
                                                };

   return {
     GET: function(callback) {
         return  $http.get(database+'/_design/CLIE2/_view/doc').success(callback);
           },
    GETLocal: function(id,callback) {
              return  $http.get(database+'/'+id).success(callback);
                                 },
     PUTCust:function (id,code,dependency, des1,des2,addr,jurdical,fisacl,mail,number){
                createCustomer(id,code,dependency, des1,des2,addr,jurdical,fisacl,mail,number);
                                   },
     All: function(callback) {
            alert("i m in all customers");
            var url =sellpoint+'/customer/description?searchstring';
            return   $http({method: "GET", url: url, cache: $templateCache}).
                                                                    success(function(data, status) {
                                                                         alert("Getting all Customers with Success ");
                                                                         var cust=[];
                                                                               for (var i = 0; i < data.length; i++){
                                                                                       cust.push(data[i]);
                                                                                  RemoteCstomeridentiy(cust[i].identityId,cust[i]);
                                                                               }
                                                                                              }).
                                                                    error(function(data, status) {
                                                                         alert("Request failed, status = "+status);
                                                                                                         });
                },

     }
              }])
  //******************* User service for getting Remote and inserting local Users

.factory("UserFactory",['$http','$templateCache', function($http,$templateCache){
  var database="http://localhost:5984/catafoto";
  var id="";
var user={
    	"type" : "USER",
    	"id":"0001",
    	"value":{
    	    "login":" ",
    	    "password":" ",
    	    }
    	}


   return {
       GET: function(id,callback) {
                               return  $http({method: "GET", url: database+'/_design/'+id+'/_view/doc', cache: $templateCache})
       .success(callback).error(function(data, status) {alert("failed to get user= "+status); });
        },
        PUT: function(login,pass) {
        id=Math.floor((Math.random()*100)+1);
        user.id="USER"+id;
         user.value.login=login;
         user.value.password=pass;
         var url=database+"/"+user.id;
                                       $http({method: "PUT", url: url,data:user, cache: $templateCache}).
                                                      success(function(data, status) {
                                                      alert("Creating Customer with Success ");
                                                          }).
                                                       error(function(data, status) {
                                                           alert("Request failed, status = "+status);
                                                                            });
        },

      }


}])
  //******************* Creating new server if dosnt exist else it will be deleted and replaced by new one

.factory("ServerFactory",['$http','$templateCache', function($http,$templateCache){
  var database='http://localhost:5984/catafoto';
  var dataRev={};
var jsonData = {
                         "id" : "server" ,
                         "type": "server",
                         "value" : {
                                                                "adress": " ",
                                                                 "port": " ",
                                                                 "login": " ",
                                                                 "pwd":  " "
                                                  }
                        }
    var putServer= function(id,adress,port,login,pwd) {
                                            jsonData.value.adress=adress;
                                            jsonData.value.port=port;
                                            jsonData.value.login=login;
                                            jsonData.value.pwd=pwd;
                                           var url=database+"/"+id;
                                                               $http({method: "PUT", url: url,data:jsonData, cache: $templateCache}).
                                                                       success(function(data, status) {
                                                                        alert("Success server ");
                                                                                              }).
                                                                          error(function(data, status) {
                                                                         alert("error putting server, status = "+status);
                                                                                                                });
                                            };
     var deleteWith =function(rev,id,adress,port,login,pwd) {
                                        var url=database+"/"+id+"?rev="+rev;
                                                      $http({method: "DELETE", url: url, cache: $templateCache}).
                                                                                  success(function(data, status) {
                                                                                  putServer(id,adress,port,login,pwd);
                                                                                     }).
                                                                                     error(function(data, status) {
                                                                                       data = data || "Request failed";
                                                                                      alert("error deleting doc !"+status);
                                                                                   });
                                                                                   };
   return {
    GET: function(id,adress,port,login,pwd) {
     return  $http.get(database+'/'+id)
                  .success(function (data, status) {
                         var rev= data._rev;
                        deleteWith(rev,id,adress,port,login,pwd);
                             })
                  .error(function (data, status, headers, config) {
                         putServer(id,adress,port,login,pwd);
                              });

       },
          }


         }])
   .service('sharedProperties', function() {
             var stringValue = 'test string value';
             var objectValue = {
                 data: 'test object value'
             };

             return {
                 getString: function() {
                     return stringValue;
                 },
                 setString: function(value) {
                     stringValue = value;
                 },
                 getObject: function() {
                     return objectValue;
                 }
             }
         });



