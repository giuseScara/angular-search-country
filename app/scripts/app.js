"use strict";

angular.module("AppModule", []).constant("baseURL", "http://localhost:3000/");

angular.module("AppModule").config(ConfigInterceptor);

ConfigInterceptor.$inject = ['$httpProvider'];

function ConfigInterceptor(httpProvider) {
    toastr.options = {
        "positionClass": "toast-bottom-right"
    }
    httpProvider.interceptors.push(['$q', function ($q) {
        return {
            'request': function (config) {
                return config;
            },

            // optional method
            'requestError': function (rejection) {
                toastr.error('Error with the request!')
                return $q.reject(rejection);
            },

            // optional method
            'response': function (response) {
                if (response.config.method == "POST") {
                    toastr.success('Operation completed!')
                }
                return response;
            },

            // optional method
            'responseError': function (rejection) {
                toastr.error('Operation not completed!')
                return $q.reject(rejection);
            }
        };
    }]);
}; //configInterceptor