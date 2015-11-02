/// <reference path="../atec.refs.d.ts" />

/**
 * ----- Core Factory -----
 *
 * Factory used to build major elastic crud functionality.
 *
 * @module atec/core
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
	export class ElasticCrudFactory implements IElasticCrudFactory {
		/**
		 * String identifies list and it's related listeners
		 * @protected
		 */
		protected id:string;

		/**
		 * List title
		 * @protected
		 */
		protected title:string;

		/**
		 * Path to remote data source or local array of items
		 * @protected
		 */
		protected source:string;

		/**
		 * Flag that specifies if Factory uses remote or direct data source
		 * @protected
		 */
		protected sourceStatic:boolean;

		/**
		 * Object contains all parameters needed by Restangular query like page, sort, filtering etc.
		 * @protected
		 * @implements IElasticCrudQueryParams
		 */
		protected queryParams:IElasticCrudQueryParams;

		/**
		 * Reference to an external function that parse received data
		 * @protected
		 */
		protected prepareData;

		/**
		 * Object contains additional data received from remote source like page number, page size,
		 * number of displayed items, total number of items etc.
		 * @protected
		 */
		protected meta:any;

		/**
		 * Object contains actions dedicated for list it self, items, items groups and for custom usage
		 * @protected
		 */
		protected actions:any;

		/**
		 * Array of received items
		 * @protected
		 */
		protected items:Array<any>;

		/**
		 * Copy of @{items} used for manual sort & filter
		 * @protected
		 */
		protected itemsOriginal:Array<any>;

		/**
		 * Local angular.scope used for event listeners management
		 * @protected
		 */
		protected scope:ng.IScope;

		/**
		 * Crud Model constructor
		 *
		 * @param $rootScope - angular.$rootScope
		 * @param Restangular - Restangular
		 * @param $filter - angular.$filter
		 * @param {any} options - factory options object
		 */
		constructor(protected $rootScope:ng.IRootScopeService,
					protected Restangular:restangular.IService,
					protected $filter:ng.IFilterService,
					protected options:IElasticCrudPayload) {
			this.$rootScope = $rootScope;
			this.Restangular = Restangular;
			this.$filter = $filter;


			this.scope = $rootScope.$new();
			this.reset();

			if (options) {
				this.init(options);
			}
		}

		/**
		 * Initialize Proton List Model
		 * @param {object} data - options data passed to core factory from @{ElasticCrudDirective}
		 */
		public init(data:any):void {
			var self = this;

			// Items
			this.items = [];
			this.itemsOriginal = [];

			// Query params
			this.queryParams = {};

			// Meta data
			this.meta = {};

			// Actions
			this.actions = {
				group: [],
				item: [],
				global: []
			};

			// Update list
			angular.extend(this, data);
		}

		/**
		 * Received data reset
		 */
		public reset():void {
			this.items = [];
		}

		/**
		 * Force refresh if factory operates on remote data
		 */
		public refreshList():void {
			if (this.source && !this.isSourceStatic()) {
				this.fetchData();
			}
		}

		//
		// Getters
		//

		/**
		 * Get list title
		 * @returns {string} List title
		 */
		public getTitle():string {
			return this.title || '';
		}

		/**
		 * Get list items
		 * @returns {Array<any>} Array of received list items that implements @{IElasticCrudItem} interface
		 */
		public getItems():Array<IElasticCrudItemFactory> {
			return this.items;
		}

		/**
		 * Get list items count
		 * @returns {number} Items count
		 */
		public getItemsCount():number {
			return this.getItems().length;
		}

		/**
		 * Get selected items
		 * @returns {any[]} Items marked as "selected"
		 */
		public getSelectedItems():Array<any> {
			return this.items.filter(function (item:any) {
				if (item.isSelected()) {
					return item;
				}
			});
		}

		/**
		 * Get selected items count
		 * @returns {number} Count of items marked as "selected"
		 */
		public getSelectedItemsCount():number {
			return this.getSelectedItems().length;
		}


		/**
		 * Get list meta data
		 * @param {string} key - meta record key
		 * @returns {any} Meta record content
		 */
		public getMeta(key:any):any {
			if (!(key in this.meta)) {
				return;
			}
			return this.meta[key];
		}

		//
		// Setters
		//

		/**
		 * Set list source and triggers data fetching if remote or direct data preparing for direct data
		 * @param {string|Array} source - data source
		 */
		public setSource(source:any):void {
			this.sourceStatic = typeof(source) !== 'string';
			this.source = source;

			if (this.isSourceStatic()) {
				this.items = this.prepareData ? this.prepareData({
					data: this.source,
					actions: this.getActions('item')
				}) : this.source;
			} else {
				this.fetchData();
			}
		}

		/**
		 * Set all list items as selected / unselected based on passed param
		 * @param {boolean} select - select / unselect
		 */
		public setAllItemsSelected(select:boolean):void {
			angular.forEach(this.items, function (item:any) {
				item.setSelected(select);
			});
		}

		/**
		 * Set list meta record
		 * @param {string|object} key_or_set - meta record key of set of meta (key - data) records to set
		 * @param (any} value (optional) - value to be set for meta record key
		 */
		public setMeta(key_or_set:any, value?:any):void {
			if ((key_or_set !== undefined) && (value !== undefined)) {
				this.meta[key_or_set] = value;
			} else if (typeof(key_or_set) === 'object') {
				angular.extend(this.meta, key_or_set);
			}
		}

		//
		// Boolean checkers
		//

		/**
		 * Is list source type 'static'
		 * @returns {boolean}
		 */
		public isSourceStatic():boolean {
			return this.sourceStatic;
		}

		/**
		 * Has list any items marked as selected?
		 * @returns {boolean}
		 */
		public hasAnySelectedItems():boolean {
			return this.getSelectedItemsCount() !== 0;
		}

		/**
		 * Has list all items marked as selected?
		 * @returns {boolean}
		 */
		public hasAllSelectedItems():boolean {
			return this.getSelectedItemsCount() === this.getItemsCount();
		}

		/**
		 * Is list data fetching in progress?
		 * @returns {boolean} - meta data value of 'loading' record
		 */
		public isFetchInProgress():boolean {
			return this.getMeta('loading');
		}

		//
		// Data operations
		//

		/**
		 * Fetch data from remote source
		 * @param {IElasticCrudQueryParams} queryParams (optional) - inline query parameters for single query
		 */
		protected fetchData(queryParams?:IElasticCrudQueryParams):void {
			var self = this;

			self.setMeta('loading', true);
			this.Restangular
				.all(this.source)
				.customGET('', queryParams ? queryParams : this.queryParams)
				.then(function (response:any) {
					var data = [];
					var settings = <IElasticCrudResponseParams>{};

					if ('content' in response) {
						data = response.content;
						settings = angular.copy(response);
						delete settings.content;
					} else {
						data = response;
					}

					// Prepare data
					if (!data.length) {
						self.items = [];

						// Set meta data of this query
						self.setMeta('display-from', 0);
					} else {
						self.items = self.prepareData ? self.prepareData({
							data: data,
							actions: self.getActions('item')
						}) : data;
					}

					// Set meta data of this query
					self.setMeta({

						// Display
						'display-from': !self.isSourceStatic() ? settings.number * settings.size + 1 : 1,
						'display-to': !self.isSourceStatic() ? settings.number * settings.size + settings.numberOfElements : settings.numberOfElements,
						'display-total': settings.totalElements ? settings.totalElements : self.items.length,

						// Pagination
						'display-page': settings.number + 1,
						'display-page-size': settings.size,
						'display-page-is-first': settings.first,
						'display-page-is-last': settings.last,
						'display-total-pages': settings.totalPages,

						//Sorting
						'sorting-allowed-columns': settings.allowedOrderByProperties
					});

					// Set Query Params
					self.queryParams.page = settings.number;
					self.queryParams.size = settings.size;

					self.setMeta('loading', false);
				}
			);
		}

		//
		// Sorting
		//

		/**
		 *  Apply sorting for column (toggles directions between 'asc' & 'desc')
		 * @param {string} column - sort column key
		 */
		public applySorting(column:string):void {
			if (!this.isSortingAllowed(column)) {
				return;
			}

			var sortTuple = 'sort' in this.queryParams ? this.queryParams.sort.split(',') : [];
			var sortColumn = sortTuple.length > 0 ? sortTuple[0] : '';
			var sortDir = sortTuple.length === 2 ? sortTuple[1] : '';

			if (sortColumn !== column) {
				sortDir = 'asc';
			} else {
				sortDir = !sortDir || (sortDir === 'desc') ? 'asc' : 'desc';
			}
			sortColumn = column;

			this.queryParams.sort = sortColumn + ',' + sortDir;

			// Set page as default one
			delete this.queryParams.page;

			if (!this.isSourceStatic()) {
				this.fetchData();
			} else {
				this.doManualSorting();
			}
		}

		/**
		 * Manual sorting for applied sorting
		 */
		public doManualSorting():void {
			// Backup items before do filtering
			this.backupData();

			// Do filtering by selected fields
			this.items = this.$filter('orderBy')(this.itemsOriginal, this.getSortingColumn(), this.getSortingDirection() === 'desc');
		}

		/**
		 *  Get applied sorting column
		 * @returns {string} Sort column key
		 */
		public getSortingColumn():string {
			var sortTuple = 'sort' in this.queryParams ? this.queryParams.sort.split(',') : [];
			return sortTuple.length > 0 ? sortTuple[0] : '';
		}

		/**
		 * Get applied sorting direction ('asc', 'desc')
		 * @returns {string} Sort column direction
		 */
		public getSortingDirection():string {
			var sortTuple = 'sort' in this.queryParams ? this.queryParams.sort.split(',') : [];
			return sortTuple.length === 1 ? sortTuple[1] : '';
		}

		/**
		 * Is sorting active for selected column
		 * @param {string} column - column key
		 * @returns {boolean}
		 */
		public isSortingActive(column:string):boolean {
			return this.getSortingColumn() === column;
		}

		/**
		 * Get allowed sorting columns based on received remote meta data
		 * @returns {Array}
		 */
		public getAllowedSortingColumns():Array<string> {
			return this.getMeta('sorting-allowed-columns') || [];
		}

		/**
		 * Is sorting allowed by selected columns
		 * @param {string} column - column key
		 * @returns {boolean}
		 */
		public isSortingAllowed(column:string):boolean {
			return this.getAllowedSortingColumns().indexOf(column) > -1;
		}

		//
		// Filtering
		//

		/**
		 * Apply filtering for column with value
		 * @param {string} column - filter column key
		 * @param {any} value - filter value
		 */
		public applyFiltering(column:string, value:any):void {
			if (!this.queryParams.filter) {
				this.queryParams.filter = {};
			}

			var filter = value ? value : undefined;
			if (filter) {
				this.queryParams.filter[column] = filter;
			} else {
				delete this.queryParams.filter[column];

			}

			// Set page as default one
			delete this.queryParams.page;

			if (!this.isSourceStatic()) {
				this.fetchData();
			} else {
				this.doManualFiltering();
			}
		}

		/**
		 * Manual filtering for applied filters
		 */
		public doManualFiltering():void {
			var self = this;

			// Backup items before do filtering
			this.backupData();

			// Do filtering by selected fields
			this.items = this.itemsOriginal.filter(function (item:any, number:number) {
				var match = true;
				angular.forEach(self.getFilters(), function (filter:any, key:string) {
					if (filter) {
						if (key in item) {
							match = !item[key].contains(filter) ? false : match;
						} else {
							match = false;
						}
					}
				});

				if (match) {
					return item;
				}
			});
		}

		/**
		 * Get all applied filters stored in queryParams
		 * @returns {any}
		 */
		public getFilters():any {
			return this.queryParams.filter;
		}

		/**
		 * Is filtering active for selected column
		 * @param {string} column - column key
		 * @returns {boolean}
		 */
		public isFilteringActive(column:string):boolean {
			return column in this.getFilters();
		}

		//
		// Pagination
		//

		/**
		 * Build range of pagination visible page numbers
		 * @returns {Array<number>} Page numbers
		 */
		public paginationDisplayPages():Array<number> {
			if (!this.getItemsCount()) {
				return [];
			}

			var pages = [];
			var n = this.paginationCurrentPage() - 1;
			var step = 0;
			var step_limit = 3;
			while ((n > 0) && (step < step_limit)) {
				pages.push(n);
				n--;
				step++;
			}

			step_limit += n;
			pages.push(this.paginationCurrentPage());
			n = this.paginationCurrentPage() + 1;

			step = 0;
			while ((n <= this.paginationTotalPages()) && (step < step_limit)) {
				pages.push(n);
				n++;
				step++;
			}

			return pages;
		}

		/**
		 * Get current page number
		 * @param {boolean} realNum (optional) - returned value should be real (couted from 0) page number?
		 * @returns {number}
		 */
		public paginationCurrentPage(realNum?:boolean):number {
			return realNum ? this.getMeta('display-page') - 1 : this.getMeta('display-page');
		}

		/**
		 * Get total pages
		 * @returns {number}
		 */
		public paginationTotalPages():number {
			return this.getMeta('display-total-pages');
		}

		/**
		 * Is current page first of available?
		 * @returns {boolean}
		 */
		public paginationIsFirstPage():boolean {
			return this.getMeta('display-page-is-first');
		}

		/**
		 * Is current page last of available?
		 * @returns {boolean}
		 */
		public paginationIsLastPage():boolean {
			return this.getMeta('display-page-is-last');
		}

		/**
		 * Go to - Previous page
		 * @param {event} evt - click event
		 */
		public paginationGoPrev(evt:any):void {
			if (this.paginationCurrentPage() <= 1) {
				return;
			}

			this.paginationGoTo(null, this.paginationCurrentPage() - 1);
		}

		/**
		 * Go to - Next page
		 * @param {event} evt - click event
		 */
		public paginationGoNext(evt:any):void {
			if (this.paginationCurrentPage() >= this.paginationTotalPages()) {
				return;
			}

			this.paginationGoTo(null, this.paginationCurrentPage() + 1);
		}


		/**
		 * Go to - Selected page
		 * @param {event} evt - click event
		 * @param {number} page - page number to switch
		 * @param {boolean} force (optional) - switch should be forced
		 */
		public paginationGoTo(evt:any, page:number, force?:boolean):void {
			if ((page < 1)
				|| (page > this.paginationTotalPages())
				|| ((page === this.paginationCurrentPage()) && !force)) {
				return;
			}

			this.queryParams.page = page - 1;
			this.fetchData();
		}

		//
		// Actions
		//

		/**
		 * Get list actions by selected type
		 * @param {string} type - actions type key like 'item', 'group', 'global', 'custom' etc.
		 * @returns {Array} Actions set
		 */
		public getActions(type:string):Array<IElasticCrudAction> {
			if (!(type in this.actions)) {
				return [];
			}
			return this.actions[type] || [];
		}

		/**
		 * Get action by key of specified type
		 * @returns {IElasticCrudAction}
		 */
		public getAction(type:string, key:string): IElasticCrudAction {
			var actions = this.getActions(type);

			if(actions.length) {
				var index = actions.map(function(e:IElasticCrudItemAction<IElasticCrudItemPayload>) {
					return e.key;
				}).indexOf(key);

				return (index > -1) ? actions[index] : null;
			}
			return null;
		}

		/**
		 * Get list actions count by selected type
		 * @param {string} type - actions type key like 'item', 'group', 'global', 'custom' etc.
		 * @returns {number}
		 */
		public getActionsCount(type:string):number {
			return this.getActions(type).length || 0;
		}

		/**
		 * Has list any actions of selected type?
		 * @param {string} type - actions type key like 'item', 'group', 'global', 'custom' etc.
		 * @returns {boolean}
		 */
		public hasAnyActions(type:string):boolean {
			return this.getActionsCount(type) > 0;
		}

		//
		// Helpers
		//

		/**
		 * Backup original data before manual sorting / filtering & others
		 */
		protected backupData():void {
			if (!this.itemsOriginal.length) {
				this.itemsOriginal = [];
				angular.forEach(this.items, function (item:any) {
					this.push(item);
				}, this.itemsOriginal);
			}
		}

	}
}