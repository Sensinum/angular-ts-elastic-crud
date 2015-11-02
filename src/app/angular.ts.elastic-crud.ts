/// <reference path="./components/atec.refs.d.ts" />

module ngTsElasticCrud {
  'use strict';

  var sensinumATEC = angular.module('sensinum.ngTsElasticCrud', ['ngSanitize', 'restangular']);

  /**
   * Directives
   */

    // core
  sensinumATEC.directive('elasticCrud', (
      $rootScope: ng.IRootScopeService,
      $compile: ng.ICompileService,
      ElasticCrudModel: (listPayload: IElasticCrudPayload) => void) => new ElasticCrudDirective($rootScope, $compile, ElasticCrudModel));

  // header
  sensinumATEC.directive('elasticCrudHeader', ($compile: ng.ICompileService) => new ElasticCrudHeaderDirective($compile));

  // filter
  sensinumATEC.directive('elasticCrudFilter', ($timeout: ng.ITimeoutService) => new ElasticCrudFilterDirective($timeout));

  // item - actions
  sensinumATEC.directive('elasticCrudItemActions', () => new ElasticCrudItemActionsDirective());

  // item - expanded more row
  sensinumATEC.directive('elasticCrudItemMore', ($compile: ng.ICompileService) => new ElasticCrudItemMoreDirective($compile));

  /**
   * Factories
   */
    // core
  sensinumATEC.factory('ElasticCrudModel', (
      $rootScope: ng.IRootScopeService,
      Restangular: restangular.IService,
      $filter: ng.IFilterService) =>
      (options: IElasticCrudPayload) => new ElasticCrudFactory($rootScope, Restangular, $filter, options));

  // item
  sensinumATEC.factory('ElasticCrudItemModel', () => new ElasticCrudItemFactory());
}
