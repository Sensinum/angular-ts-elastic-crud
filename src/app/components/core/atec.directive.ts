/// <reference path="../atec.refs.d.ts" />

/**
 * ----- Core Directive -----
 *
 * Directive that build elastic crud based on passed parameters. It also provide some communication events to control it self.
 *
 * @module atec/core
 *
 * @param {string} id - parameter that identifies list and it's related listeners
 * @param {string} title (optional) - list title
 * @param {string / array} source - path to remote data source or local array of items
 * @param {object} templates (optional) - contains list of parameters with html templates pathes for list partials
 * @param {reference} prepareData (optional) - reference to an external function that parse received data
 * @param {object} externalMethods (optional) - contains list of methods that you can use inside custom templates
 * @param {object} actions (optional) - contains actions dedicated for list it self, items, items groups and for custom usage
 *
 * @example
 * <elastic-crud
 *  id="myId"
 *  title="My sample CRUD"
 *  source="api/crud-sample/get"
 *  templates="templates"
 *  prepare-data="prepareData(data, actions, callback)"
 *  actions="actions"
 *  ></elastic-crud>
 *
 * @version 0.1.0
 *
 * @author Mateusz Ziarko (cyp3r) [mateusz.ziarko@sensinum.pl]
 *
 * @license
 * Copyright (c) 2015 Sensinum Sp. z o.o.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

module ngTsElasticCrud {
    export class ElasticCrudDirective implements ng.IDirective {
        public restrict = 'E';
        public replace = false;
        public scope = {
            id: '@',
            title: '@?',
            source: '=',
            templates: '=?',
            prepareData: '&?',
            externalMethods: '=?',
            actions: '=?'
        };
        public templateUrl = 'app/components/core/atec.template.html';

        constructor(public $rootScope:ng.IRootScopeService,
                    public $compile:ng.ICompileService,
                    public ElasticCrudModel:(options:IElasticCrudPayload) => void) {

            this.$rootScope = $rootScope;
            this.$compile = $compile;
            this.ElasticCrudModel = ElasticCrudModel;
        }

        link = (scope:IElasticCrudScope, elem:ng.IAugmentedJQuery, attrs:IElasticCrudAttributes, ngModel:ng.INgModelController) => {
            var self = this;

            //
            // List settings
            //

            // Directive defaults
            scope.defaults = {
                templates: {
                    title: 'app/components/title/atec.title.template.html',
                    footer: 'app/components/footer/atec.footer.template.html',
                    pagination: 'app/components/footer/atec.footer.pagination.template.html'
                }
            };

            // Prepare directive scope
            scope.templates = scope.templates ? scope.templates : {
                title: attrs.templateTitle,
                header: attrs.templateHeader,
                row: attrs.templateRow,
                'row-more': attrs.templateRowMore,
                summary: attrs.templateSummary,
                footer: attrs.templateFooter
            };

            if (scope.title && !('title' in scope.templates)) {
                scope.templates.title = scope.defaults.templates.title;
            }

            if (!('footer' in scope.templates)) {
                scope.templates.footer = scope.defaults.templates.footer;
            }

            // Prepare list options object
            var options = {
                id: scope.id,
                title: scope.title,
                source: scope.source,
                prepareData: scope.prepareData,
                actions: scope.actions
            };

            // Generate list model
            scope.list = new this.ElasticCrudModel(options);

            //
            // Directive params $watch'ers
            //

            /**
             * Watch elastic crud source changes
             */
            scope.$watch('source', function (val:any) {
                if (val) {
                    scope.list.setSource(val);
                }
            });

            //
            // Event listeners
            //
            var listeners = [];

            /**
             * Listen for refresh list event and trigger refresh method
             */
            listeners.push(scope.$on(scope.id + '.refreshList', (event:any, args:any) => {
                scope.list.refreshList();
            }));

            /**
             * Listen for share list request event and broadcast elastic crud as an answer
             */
            listeners.push(scope.$on(scope.id + '.shareListRequest', (event:any, args:any) => {
                self.$rootScope.$broadcast(scope.id + '.shareListResponse', scope.list);
            }));

            /**
             * Listen for share list items request event and broadcast elastic crud items array as an answer
             */
            listeners.push(scope.$on(scope.id + '.shareListItemsRequest', (event:any, args:any) => {
                self.$rootScope.$broadcast(scope.id + '.shareListItemsResponse', scope.list.getItems());
            }));

            //
            // List helper functions
            //

            /**
             * Counts elastic crud columns with colspans also
             * @returns {number}
             */
            scope.getColumnsCount = function () {
                var cols = elem.find('table thead tr').first().children('th');
                var spans = 0;
                cols.each(function(col) {
                    var col_span = angular.element(col).attr("colspan");
                    if(col_span) {
                        spans += parseInt(col_span, 10);
                    }
                });
                return (cols.length + spans) || 1;
            };

            //
            // Destroy & clean
            //

            /**
             * Destroy elastic crud and unbind all listeners
             */
            scope.$on('$destroy', function () {
                angular.forEach(listeners, function (unbind:any) {
                    unbind();
                });
            });

            // Debug
            scope.debugOn = false;
        };
    }
}
