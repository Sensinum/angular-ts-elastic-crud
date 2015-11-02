/// <reference path="../atec.refs.d.ts" />

/**
 * ----- Filter Directive -----
 *
 * Directive that allows to filter elastic crud by specified column.
 *
 * Features:
 * - simple text filtering
 * - more soon...
 *
 * @module atec/filter
 *
 * @param {string} key - field/column/parameter name used as a key for filtering remote data or manual direct data
 * @param {ElasticCrudFactory} list - parent elastic crud Factory
 *
 * @example
 * <tr class="quick-filters">
 *      ...
 *      <th elastic-crud-filter
 *       list="list"
 *       key="column_key"></th>
 *      ...
 * </tr>
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

    export class ElasticCrudFilterDirective implements ng.IDirective {
        public restrict = 'A';
        public replace = false;
        public scope = {
            key: '@',
            list: '='
        };

        public templateUrl = 'app/components/filter/atec.filter.template.html';

        constructor(public $timeout:ng.ITimeoutService) {
            this.$timeout = $timeout;
        }

        link = (scope:IElasticCrudFilterScope, elem:ng.IAugmentedJQuery, attrs:IElasticCrudFilterAttributes, ngModel:ng.INgModelController) => {
            var self = this;
            var field = elem.find('input');

            /**
             * Trigger filters apply on field change event
             */
            field.on('change', function (evt:any) {
                self.$timeout(function () {
                    scope.list.applyFiltering(scope.key, scope.value);
                });
            });
        };
    }
}
