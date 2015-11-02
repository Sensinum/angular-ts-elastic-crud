
/**
 * ----- Interfaces -----
 *
 * Interfaces used by elastic crud
 *
 * @module atec
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

declare module ngTsElasticCrud {
    //
    // Common
    //

    /**
     * Query parameters available for remote data queries
     *
     * @interface IElasticCrudQueryParams
     *
     * @property {number} page (optional) - requested page number counted from 0
     * @property {number} size (optional) - requested maximum pages size
     * @property {string} sort (optional) - sort query like 'field_name,direction', direction = asc|desc
     * @property {object} filter (optional) - filter object with parameters like 'key: simple_value|complex_value'
     */
    export interface IElasticCrudQueryParams {
        page? : number;
        size? : number;
        sort?: string;
        filter? : any;
    }

    /**
     * Response parameters available in remote data query responses
     *
     * @interface IElasticCrudResponseParams
     *
     * @property {object} content (optional) - remote list content, could be array of items or something else
     * @property {number} numberOfElements (optional) - {@content} items count
     * @property {number} totalElements (optional) - count of all available items
     * @property {number} number (optional) - current page number counted from 0
     * @property {number} size (optional) - maximum page size
     * @property {boolean} first (optional) - is this page first of all available?
     * @property {boolean} last (optional) - is this page last of all available?
     * @property {number} totalPages (optional) - count of all available pages
     * @property {Array<string>} allowedOrderByProperties (optional) - array of column keys that allows sorting
     */
    export interface IElasticCrudResponseParams {
        content? : any;
        numberOfElements? : number;
        totalElements? : number;
        number? : number;
        size? : number;
        first? : boolean;
        last? : boolean;
        totalPages? : number;
        allowedOrderByProperties?: Array<string>;
    }

    //
    // Factories
    //

    /**
     * Elastic Crud Factory options base interface
     *
     * @interface IElasticCrudPayload
     */
    export interface IElasticCrudPayload {}

    /**
     * Elastic Crud Factory base interface
     *
     * @interface IElasticCrudFactory
     */
    export interface IElasticCrudFactory extends IElasticCrudPayload {}

    /**
     * Elastic Crud Item Factory options base interface
     *
     * @interface IElasticCrudItemPayload
     */
    export interface IElasticCrudItemPayload {}

    /**
     * Elastic Crud Item Factory base interface
     *
     * @interface IElasticCrudItemFactory
     */
    export interface IElasticCrudItemFactory extends IElasticCrudItemPayload {}

    //
    // Directives
    //

    /**
     * Elastic Crud Directive available attributes
     *
     * @interface IElasticCrudAttributes
     *
     * @property {string} id - parameter that identifies list and it's related listeners
     * @property {string} title - list title
     * @property {string / array} source - path to remote data source or local array of items
     * @property {string} templateTitle - path to elastic crud title template
     * @property {string} templateHeader - path to elastic crud header template
     * @property {string} templateRow - path to elastic crud item row template
     * @property {string} templateRowMore - path to elastic crud item more toggled template
     * @property {string} templateSummary - path to elastic crud footer summary row template
     * @property {string} templateFooter - path to elastic crud footer row template
     * @property {object} templates - contains list of parameters with html templates pathes for list partials
     * @property {reference} prepareData - reference to an external function that parse received data
     * @property {object} externalMethods - contains list of methods that you can use inside custom templates
     * @property {object} actions - contains actions dedicated for list it self, items, items groups and for custom usage
     */
    export interface IElasticCrudAttributes extends ng.IAttributes {
        id : string;
        title : string;
        source : string;
        templateTitle : string;
        templateHeader : string;
        templateRow : string;
        templateRowMore : string;
        templateSummary : string;
        templateFooter : string;
        templates : string;
        prepareData : string;
        externalMethods : string;
        actions : string;
    }

    /**
     * Elastic Crud Directive available $scope parameters
     *
     * @interface IElasticCrudScope
     *
     * @property {string} id - parameter that identifies list and it's related listeners
     * @property {string} title - list title
     * @property {string / array} source - path to remote data source or local array of items
     * @property {object} templates - contains list of parameters with html templates pathes for list partials
     * @property {reference} prepareData - reference to an external function that parse received data
     * @property {object} externalMethods - contains list of methods that you can use inside custom templates
     * @property {object} actions - contains actions dedicated for list it self, items, items groups and for custom usage
     * @property {ElasticCrudFactory} list - reference to elastic crud factory
     * @property {function} getColumnsCount - reference to function that counts elastic crud columns
     * @property {boolean} debugOn - is elastic crud debug ON?
     * @property {object} defaults - default elastic crud options
     */
    export interface IElasticCrudScope extends ng.IScope {
        id : string;
        title : string;
        source : any;
        templates : any;
        prepareData: void;
        externalMethods : any;
        actions : any;
        list : ElasticCrudFactory;
        getColumnsCount : any;
        debugOn : boolean;
        defaults : any;
    }

    /**
     * Elastic Crud Header Directive available attributes
     *
     * @interface IElasticCrudHeaderAttributes
     *
     * @property {string} key - field/column/parameter name used as a key for sorting remote data or manual direct data
     * @property {ElasticCrudFactory} list - parent elastic crud Factory
     */
    export interface IElasticCrudHeaderAttributes extends ng.IAttributes {
        key : string;
        list : string;
    }

    /**
     * Elastic Crud Header Directive available $scope parameters
     *
     * @interface IElasticCrudHeaderScope
     *
     * @property {string} key - field/column/parameter name used as a key for sorting remote data or manual direct data
     * @property {ElasticCrudFactory} list - parent elastic crud Factory
     */
    export interface IElasticCrudHeaderScope extends ng.IScope {
        key : string;
        list: ElasticCrudFactory;
    }

    /**
     * Elastic Crud Filter Directive available attributes
     *
     * @interface IElasticCrudFilterAttributes
     *
     * @property {string} key - field/column/parameter name used as a key for filtering remote data or manual direct data
     * @property {ElasticCrudFactory} list - parent elastic crud Factory
     */
    export interface IElasticCrudFilterAttributes extends ng.IAttributes {
        key : string;
        list : string;
    }

    /**
     * Elastic Crud Filter Directive available $scope parameters
     *
     * @interface IElasticCrudFilterScope
     *
     * @property {string} key - field/column/parameter name used as a key for filtering remote data or manual direct data
     * @property {any} value - value of applied filter could be everything
     * @property {ElasticCrudFactory} list - parent elastic crud Factory
     */
    export interface IElasticCrudFilterScope extends ng.IScope {
        key : string;
        value : any;
        list: ElasticCrudFactory;
    }

    /**
     * Elastic Crud Item Actions Directive available attributes
     *
     * @interface IElasticCrudItemActionsAttributes
     *
     * @property {ElasticCrudItemFactory} item - item factory linked with elastic crud row
     * @property {ElasticCrudFactory} list - parent elastic crud factory
     */
    export interface IElasticCrudItemActionsAttributes extends ng.IAttributes {
        item : string;
        list : string;
    }

    /**
     * Elastic Crud Item Actions Directive available $scope parameters
     *
     * @interface IElasticCrudItemActionsScope
     *
     * @property {ElasticCrudItemFactory} item - item factory linked with elastic crud row
     * @property {ElasticCrudFactory} list - parent elastic crud factory
     */
    export interface IElasticCrudItemActionsScope extends ng.IScope {
        item : IElasticCrudItemFactory;
        list: ElasticCrudFactory;
    }

    /**
     * Elastic Crud Item More Directive available attributes
     *
     * @interface IElasticCrudItemMoreAttributes
     *
     * @property {ElasticCrudItemFactory} item - item factory linked with elastic crud row
     * @property {ElasticCrudFactory} list - parent elastic crud factory
     * @property {number} cols - number of columns that have to be merged
     * @property {string} template - template path
     */
    export interface IElasticCrudItemMoreAttributes extends ng.IAttributes {
        item : string;
        list : string;
        cols : string;
        template : string;
    }

    /**
     * Elastic Crud Item More Directive available $scope parameters
     *
     * @interface IElasticCrudItemMoreScope
     *
     * @property {ElasticCrudItemFactory} item - item factory linked with elastic crud row
     * @property {ElasticCrudFactory} list - parent elastic crud factory
     * @property {number} cols - number of columns that have to be merged
     * @property {string} template - template path
     */
    export interface IElasticCrudItemMoreScope extends ng.IScope {
        item : IElasticCrudItemFactory;
        list : ElasticCrudFactory;
        cols : number;
        template : string;
    }

    /**
     * Elastic Crud custom templates interface
     *
     * @interface IElasticCrudTemplates
     *
     * @property {string} title (optional) - path to elastic crud title template
     * @property {string} header - path to elastic crud header template
     * @property {string} row - path to elastic crud item row template
     * @property {string} row-more (optional) - path to elastic crud item more toggled template
     * @property {string} summary (optional) - path to elastic crud footer summary row template
     * @property {string} footer (optional) - path to elastic crud footer row template
     */
    export interface IElasticCrudTemplates {
        title? : string;
        header : string;
        row : string;
        'row-more'? : string;
        summary? : string;
        footer? : string;
    }

    /**
     * Elastic Crud Action base interface
     *
     * @interface IElasticCrudAction
     *
     * @property {string} key - action unique name as a key
     * @property {string} type (optional) - action type
     * @property {string} label - action displayable label
     */
    export interface IElasticCrudAction {
        key: string;
        type? : string;
        label : string;
    }

    /**
     * Elastic Crud Action interface - Global
     *
     * @interface IElasticCrudGlobalAction
     *
     * @property {function} onClick - reference to function triggered on 'click' event
     */
    export interface IElasticCrudGlobalAction extends IElasticCrudAction {

        /**
         * Function triggered on 'click' event
         *
         * @param {event} evt - native click event
         * @param {function} callback (optional) - reference to callback function
         */
        onClick: (evt: ng.IAngularEvent, callback?: () => any) => void;
    }

    /**
     * Elastic Crud Action interface - Item
     *
     * @interface IElasticCrudItemAction
     *
     * @property {function} onClick - reference to function triggered on 'click' event
     */
    export interface IElasticCrudItemAction<T> extends IElasticCrudAction {

        /**
         * Function triggered on 'click' event
         *
         * @param {event} evt - native click event
         * @param {function} callback (optional) - reference to callback function, passed with parameter IElasticCrudItemFactory
         */
        onClick: (evt: ng.IAngularEvent, item: T, callback?: (arg?: T) => any) => void;
    }

    /**
     * Elastic Crud Action interface - Group of items
     *
     * @interface IElasticCrudGroupAction
     *
     * @property {function} onClick - reference to function triggered on 'click' event
     */
    export interface IElasticCrudGroupAction<T> extends IElasticCrudAction {

        /**
         * Function triggered on 'click' event
         *
         * @param {event} evt - native click event
         * @param {function} callback (optional) - reference to callback function, passed with parameter Array<IElasticCrudItemFactory>
         */
        onClick: (evt: ng.IAngularEvent, items: T[], callback?: (args?: T[]) => any) => void;
    }

    /**
     * Elastic Crud Action interface - Custom (available in whole scope)
     *
     * @interface IElasticCrudCustomAction
     *
     * @property {function} onClick - reference to function triggered on 'click' event
     */
    export interface IElasticCrudCustomAction extends IElasticCrudAction {

        /**
         * Function triggered on 'click' event
         *
         * @param {event} evt - native click event
         * @param {function} callback (optional) - reference to callback function
         */
        onClick: (evt: ng.IAngularEvent, callback?: () => any) => void;
    }

    /**
     * Elastic Crud Actions configuration interface
     *
     * @property {Array<IElasticCrudGlobalAction>} global (optional) - array of IElasticCrudFactory actions
     * @property {Array<IElasticCrudItemAction>} item (optional) - array of ElasticCrudItemFactory actions
     * @property {Array<IElasticCrudGroupAction>} group (optional) - array of Array<IElasticCrudItemFactory> actions
     * @property {Array<IElasticCrudCustomAction>} custom (optional) - array of custom actions
     */
    export interface IElasticCrudActionsConfig<T> {
        global? : IElasticCrudGlobalAction[];
        item? : IElasticCrudItemAction<T>[];
        group? : IElasticCrudGroupAction<T>[];
        custom? : IElasticCrudCustomAction[];
    }
}