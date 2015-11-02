/// <reference path="../atec.refs.d.ts" />

/**
 * ----- Item Actions Directive -----
 *
 * Directive that handles & generates elastic crud actions with key 'item' that user can trigger on specified row.
 *
 * Features:
 * - generates set of actions listed in ElasticCrudFactory.getActions('item')
 * - more soon...
 *
 * @module atec/item
 *
 * @param {ElasticCrudItemFactory} item - item factory linked with elastic crud row
 * @param {ElasticCrudFactory} list - parent elastic crud factory
 *
 * @example
 * <tr class="item-row">
 *      ...
 *      <td class="actions"
 *       elastic-crud-header
 *       list="list"
 *       item="item"></td>
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
    export class ElasticCrudItemActionsDirective implements ng.IDirective {
        public restrict = 'A';
        public replace = false;
        public scope = {
            item: '=',
            list: '='
        };
        public templateUrl = 'app/components/item/atec.item.actions.template.html';

        constructor() {
        }
    }
}