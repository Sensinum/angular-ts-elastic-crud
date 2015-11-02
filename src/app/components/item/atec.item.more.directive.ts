/// <reference path="../atec.refs.d.ts" />

/**
 * ----- Item More Directive -----
 *
 * Directive that allows expand specified row with extended data & template as an additional toggled row below.
 *
 * Features:
 * - generates toggled row below specified using selected html template
 * - more soon...
 *
 * @module atec/item
 *
 * @param {ElasticCrudItemFactory} item - item factory linked with elastic crud row
 * @param {ElasticCrudFactory} list - parent elastic crud factory
 * @param {number} cols - number of columns that have to be merged
 * @param {string} template - template path
 *
 * @example
 * <tr class="item-row">
 *      <td class="actions"
 *       elastic-crud-item-more
 *       list="list"
 *       item="item"
 *       cols="list.getColumnsCount()"
 *       template="templates['row-more']"></td>
 *      ...
 *  </tr>
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
    export class ElasticCrudItemMoreDirective implements ng.IDirective {
        public restrict = 'EAC';
        public replace = false;
        public scope = {
            item: '=',
            list: '=',
            cols: '=?',
            template: '=?'
        };

        constructor(public $compile:ng.ICompileService) {
            this.$compile = $compile;
        }

        link = (scope:IElasticCrudItemMoreScope, elem:ng.IAugmentedJQuery, attrs:IElasticCrudItemMoreAttributes, ngModel:ng.INgModelController) => {
            if (scope.template) {
                var self = this;
                var parent = elem.parents('tr');
                var more = self.$compile('<td colspan="{{ cols }}" ng-include="template"></td>')(scope);
                var more_tr = angular.element('<tr></tr>');
                var expanded = false;

                more_tr.append(more);
                elem.on('click', function () {
                    if (expanded) {
                        more_tr.remove();
                    } else {
                        more_tr.insertAfter(parent);
                    }
                    expanded = !expanded;
                });
            }

            // Remove more row on destroy
            scope.$on('$destroy', function () {
                more_tr.remove();
            });
        };
    }
}