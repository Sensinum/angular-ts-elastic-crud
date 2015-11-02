/// <reference path="../atec.refs.d.ts" />

/**
 * ----- Item Factory -----
 *
 * Factory used to build elastic crud item row, handle all its data & actions.
 *
 * @module atec/item
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
	export class ElasticCrudItemFactory implements IElasticCrudItemFactory {
		/**
		 * Selection flag
		 * @public
		 */
		public selected:boolean;

		/**
		 * Elastic crud item actions set
		 * @public
		 */
		public actions:Array<IElasticCrudItemAction<IElasticCrudItemPayload>>;

		constructor() {}

		//
		// Getters
		//

		/**
		 * Get item actions
		 * @returns {Array<any>}
		 */
		public getActions(): Array<IElasticCrudItemAction<IElasticCrudItemPayload>> {
			return this.actions;
		}

		/**
		 * Get item action
		 * @returns {IElasticCrudItemAction<ElasticCrudItemFactory>}
		 */
		public getAction(key:string): IElasticCrudItemAction<IElasticCrudItemPayload> {
			var index = this.getActions().map(function(e:IElasticCrudItemAction<IElasticCrudItemPayload>) {
				return e.key;
			}).indexOf(key);

			return (index > -1) ? this.actions[index] : null;
		}

		//
		// Setters
		//

		/**
		 * Set item as selected / deselected
 		 * @param {boolean} select - select/deselect item
		 */
		public setSelected(select:boolean):void {
			this.selected = select;
		}

		//
		// Boolean checkers
		//

		/**
		 * Is item marked as selected?
		 * @returns {boolean}
		 */
		public isSelected():boolean {
			return this.selected;
		}

	}
}