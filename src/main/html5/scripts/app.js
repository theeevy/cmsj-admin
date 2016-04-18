'use strict';

angular.module('cmsj-admin', [  'ui.router',
                                'ui.bootstrap',
                                'ngResource',
                                'datatables'])
    .config(function($stateProvider, $urlRouterProvider, $resourceProvider){
        $urlRouterProvider.otherwise('/dashboard/home');

        //$resourceProvider.stripTrailingSlashes();

        $stateProvider
            .state('dashboard', {
                'url' : '/dashboard',
                //'controller' : '',
                'templateUrl' : 'views/dashboard/main.html'
            })
            .state('dashboard.home', {
                'url' : '/home',
                'controller' : 'MainController',
                'templateUrl' : 'views/dashboard/home.html'
            })
            .state('dashboard.contentList', {
                'url' : '/contentList',
                'templateUrl' : 'views/content/list.html'
            })
            .state('dashboard.contentDetail', {
                'url' : '/contentDetail',
                'templateUrl' : 'views/content/detail.html'
            });
    });