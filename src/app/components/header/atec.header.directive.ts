/// <reference path="../atec.refs.d.ts" />

/**
 * ----- Header Directive -----
 *
 * Directive that allows to sort elastic crud by specified column.
 *
 * Features:
 * - toggle sorting asc/desc
 * - more soon...
 *
 * @module atec/header
 *
 * @param {string} key - field/column/parameter name used as a key for sorting remote data or manual direct data
 * @param {ElasticCrudFactory} list - parent elastic crud Factory
 *
 * @example
 * <tr class="elastic-crud-headers">
 *      ...
 *      <th elastic-crud-header
 *       list="list"
 *       key="column_key">My sortable column</th>
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
    export class ElasticCrudHeaderDirective implements ng.IDirective {
        public restrict = 'A';
        public replace = false;
        public scope = {
            key: '@',
            list: '='
        };

        constructor(public $compile:ng.ICompileService) {
            this.$compile = $compile;
        }

        link = (scope:IElasticCrudHeaderScope, elem:ng.IAugmentedJQuery, attrs:IElasticCrudHeaderAttributes, ngModel:ng.INgModelController) => {
            var caption = elem.html();
            elem.empty();

            var sortTrigger = this.$compile('<span class="sort-trigger {{ list.isSortingActive(key) ? \'sort-active \' + list.getSortingDirection() : \'\' }}" ng-click="list.applySorting(key)"><i ng-if="list.isSortingActive(key)" class="glyphicon {{ list.getSortingDirection() == \'asc\' ? \'glyphicon-sort-by-alphabet\' : \'glyphicon-sort-by-alphabet-alt\' }}"></i>' + caption + '</span>')(scope);
            elem.append(sortTrigger);
        };
    }
}
