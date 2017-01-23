"use strict";

angular.module("AppModule", []).constant("baseURL", "http://localhost:3000/");

angular.module("AppModule").config(ConfigInterceptor);

ConfigInterceptor.$inject = ['$httpProvider'];

function ConfigInterceptor(httpProvider) {
    httpProvider.interceptors.push(['$q', function ($q) {
        return {
            'request': function (config) {
                angular.element(".overlay").show();
                return config;
            },

            // optional method
            'requestError': function (rejection) {
                angular.element(".overlay").hide();
                return $q.reject(rejection);
            },

            // optional method
            'response': function (response) {
                angular.element(".overlay").hide();
                return response;
            },

            // optional method
            'responseError': function (rejection) {
                angular.element(".overlay").hide();
                return $q.reject(rejection);
            }
        };
    }]);
}; //configInterceptor
