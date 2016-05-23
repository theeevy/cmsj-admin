'use strict';

angular.module('cmsj-admin', [  'ui.router',
                                'ui.bootstrap',
                                'ui.tinymce',
                                'ngResource',
                                'ngAnimate',
                                'ngCropper'])
    .config(function($stateProvider, $urlRouterProvider, $resourceProvider){
        $urlRouterProvider.otherwise('/cmsj/home');

        $stateProvider
            .state('cmsj', {
                'url' : '/cmsj',
                //'controller' : '',
                'templateUrl' : 'views/dashboard/main.html'
            })
            .state('cmsj.home', {
                'url' : '/home',
                //'controller' : 'MainController',
                'templateUrl' : 'views/dashboard/home.html'
            })
            .state('cmsj.content', {
                'url' : '/content',
                'templateUrl' : 'views/content/main.html'
            })
            .state('cmsj.content.list', {
                'url' : '/',
                'templateUrl' : 'views/content/list.html'
            })
            .state('cmsj.content.detail', {
                'url' : '/:contentId',
                'templateUrl' : 'views/content/detail.html'
            })
            .state('cmsj.media', {
                'url' : '/media',
                'controller' : 'MediaController',
                'templateUrl' : 'views/media/list.html'
            });
    });