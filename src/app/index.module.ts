module ngTsElasticCrudSample {
  'use strict';

  /**
   * DEPENDENCIES
   */
  var appDependencies = {
    internal: ['sensinum.ngTsElasticCrud'],
    external: []
  };

  /**
   * MODULES DECLARATIONS
   */
  export var ngTsElasticCrudSampleModule = angular.module('ngTsElasticCrudSample', []
    .concat(appDependencies.internal)
    .concat(appDependencies.external)
  );
}
