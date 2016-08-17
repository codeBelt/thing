import EventDispatcher from 'structurejs/event/EventDispatcher';
import Router from 'structurejs/controller/Router';

/**
 * This class is responsible for changing out the main section views.
 *
 * @class RouterManager
 * @extends EventDispatcher
 * @param view {TransitionView}
 * @constructor
 **/
class RouterManager extends EventDispatcher {

    /**
     * A reference to parent view where the main section views will be swapped out.
     *
     * @property _view
     * @type {DOMElement}
     * @private
     */
    _view = null;

    /**
     * A reference to one of the main secton view.
     *
     * @property _currentView
     * @type {any}
     * @private
     */
    _currentView = null;

    /**
     * A dictionary object to hold on to the view class and the route.
     *
     * @property _viewDictionary
     * @type {Array.<DOMElement>}
     * @private
     */
    _viewDictionary = {};

    constructor(view) {
        super();

        this._view = view;
    }

    /**
     * Help method ot set the route pattern ot the class view.
     *
     * @method setRoute
     * @public
     */
    setRoute(routePattern, classObject) {
        this._viewDictionary[routePattern] = classObject;

        Router.add(routePattern, this._onRouteChange, this);
    }

    /**
     * Helper method to change the route.
     *
     * @method navigateTo
     * @public
     */
    navigateTo(routePattern) {
        Router.navigateTo(routePattern);
    }

    /**
     * Method to start the {{#crossLink "Router"}}{{/crossLink}}.
     *
     * @method start
     * @public
     */
    start() {
        Router.start();
    }

    /**
     * Handles changing the main section view determined by the route the was trigger.
     *
     * @method _onRouteChange
     * @param routerEvent {RouterEvent}
     * @privates
     */
    _onRouteChange(routerEvent) {
        // Gets the class view by the route pattern.
        let ClassObject = this._viewDictionary[routerEvent.routePattern];

        if ((this._currentView instanceof ClassObject) === false) {

            // Removes the current view.
            if (this._currentView != null) {
                this._view.removeChild(this._currentView);
            }

            // Adds the view to the parent.
            this._currentView = new ClassObject();
            this._view.addChild(this._currentView);
        }

        this._currentView.update(routerEvent);
    }

}

export default RouterManager;
