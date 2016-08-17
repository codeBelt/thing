import DOMElement from 'structurejs/display/DOMElement';

import AdminAction from '../../actions/AdminAction';
import BeerAction from '../../actions/BeerAction';
import BeerListView from './views/BeerListView';
import UserListView from './views/UserListView';
import AdminLandingView from './views/AdminLandingView';
import RouteType from '../../constants/RouteType';

/**
 * TODO: YUIDoc_comment
 *
 * @class AdminView
 * @extends DOMElement
 * @constructor
 **/
class AdminView extends DOMElement {

    /**
     * Reference to a container where sub children views will be displayed.
     *
     * @property _viewContainer
     * @type {DOMElement}
     * @protected
     */
    _viewContainer = null;

    /**
     * Reference to the current sub child view being viewed.
     *
     * @property _currentChildView
     * @type {DOMElement}
     * @protected
     */
    _currentChildView = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _childViews
     * @type {any}
     * @protected
     */
    _childViews = {};

    /**
     * Reference to the current route or route pattern.
     *
     * @property _currentRoute
     * @type {string}
     * @protected
     */
    _currentRoute = null;

    /**
     * @property _$logoutBtn
     * @type {jQuery}
     * @protected
     */
    _$logoutBtn = null;

    constructor() {
        super();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create('templates/jst/cms/AdminView');

        this._$logoutBtn = this.$element.find('.js-adminView-logout');

        this._viewContainer = this.getChild('.js-adminView-container');

        this._childViews[RouteType.LANDING] = AdminLandingView;
        this._childViews[RouteType.BEER_LIST] = BeerListView;
        this._childViews[RouteType.USER_LIST] = UserListView;
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        this.$element.addEventListener('click', '.js-adminView-logout', this._onLogout, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        this.$element.removeEventListener('click', '.js-adminView-logout', this._onLogout, this);

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {

    }

    /**
     * @overridden DOMElement.destroy
     */
    destroy() {
        this.disable();

        super.destroy();
    }

    //--------------------------------------------------------------------------------
    // HELPER METHOD
    //--------------------------------------------------------------------------------

    /**
     * TODO: YUIDoc_comment
     *
     * @method update
     * @pulbic
     */
    update(routerEvent) {
        let route = routerEvent.params[0];

        if (this._childViews[route] == null) {
            route = RouteType.LANDING;
        }

        // Swap out child views.
        if (this._currentRoute !== route) {
            if (this._currentChildView) {
                this._viewContainer.removeChild(this._currentChildView);
            }

            this._currentChildView = new this._childViews[route]();
            this._viewContainer.addChild(this._currentChildView);
            // this._currentChildView.update(routerEvent);
        } else {
            // this._currentChildView.update(routerEvent);
        }

        this._currentRoute = route;
    }

    //--------------------------------------------------------------------------------
    // EVENT HANDLERS
    //--------------------------------------------------------------------------------

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onLogout
     * @protected
     */
    _onLogout(event) {
        event.preventDefault();

        AdminAction.logout();
        BeerAction.clear();
    }

}

export default AdminView;
