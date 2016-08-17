import DOMElement from 'structurejs/display/DOMElement';
import Router from 'structurejs/controller/Router';

import RouteType from '../constants/RouteType';
import RouterManager from '../controllers/RouterManager';
import AdminStore from '../stores/AdminStore';
import LoginView from '../views/cms/LoginView';
import AdminView from '../views/cms/AdminView';

/**
 * TODO: YUIDoc_comment
 *
 * @class CMSView
 * @extends DOMElement
 * @constructor
 **/
class CMSView extends DOMElement {

    /**
     * @property _$logoutBtn
     * @type {jQuery}
     * @protected
     */
    _$logoutBtn = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _beerListView
     * @type {BeerListView}
     * @protected
     */
    _beerListView = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _routerManager
     * @type {RouterManager}
     * @protected
     */
    _routerManager = null;

    constructor($element) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        Router.forceSlash = true;
        // Router.useDeepLinking = false;
        // Router.allowManualDeepLinking = false;

        this._routerManager = new RouterManager(this);
        this._routerManager.setRoute(RouteType.INDEX, LoginView);
        this._routerManager.setRoute(RouteType.ADMIN + '/:childView:/', AdminView);
        this._routerManager.start();
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        AdminStore.addEventListener(AdminStore.LOG_IN_CHANGE, this._onAdminStoreChange, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        AdminStore.removeEventListener(AdminStore.LOG_IN_CHANGE, this._onAdminStoreChange, this);

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
    // EVENT HANDLERS
    //--------------------------------------------------------------------------------

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onAdminStoreChange
     * @protected
     */
    _onAdminStoreChange(event) {
        if (AdminStore.getLoggedInUser() === null) {
            Router.navigateTo(RouteType.INDEX);
        } else {
            const route = Router.buildRoute(RouteType.ADMIN, RouteType.BEER_LIST);

            Router.navigateTo(route);
        }
    }

}

export default CMSView;
