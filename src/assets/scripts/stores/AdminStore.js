import Collection from 'structurejs/model/Collection';
import EventBroker from 'structurejs/event/EventBroker';

import AdminEvent from '../events/AdminEvent';
import UserModel from '../models/UserModel';

/**
 * A Singleton store container that maintains state & logic for a data set.
 * Pertains to the Flux Architecture Lifecycle.
 *
 * @class AdminStore
 * @extends Collection
 * @constructor
 **/
class AdminStore extends Collection {

    /**
     * A change event for the store to dispatch.
     *
     * @property CHANGE_EVENT
     * @type {string}
     * @public
     * @const
     */
    CHANGE_EVENT = 'AdminStore.changeEvent';

    /**
     * TODO: YUIDoc_comment
     *
     * @property LOG_IN_CHANGE
     * @type {string}
     * @public
     * @const
     */
    LOG_IN_CHANGE = 'AdminStore.logInChange';

    /**
     * TODO: YUIDoc_comment
     *
     * @property _currentUser
     * @type {UserModel}
     * @protected
     */
    _currentUser = null;

    constructor() {
        super(UserModel);

        this.enable();
    }

    /**
     * @overridden Collection.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        EventBroker.addEventListener(AdminEvent.ADD, this._onAdd, this);
        EventBroker.addEventListener(AdminEvent.REMOVE, this._onRemove, this);
        EventBroker.addEventListener(AdminEvent.UPDATE, this._onUpdate, this);
        EventBroker.addEventListener(AdminEvent.LOAD_USERS, this._onLoad, this);
        EventBroker.addEventListener(AdminEvent.UPDATE_LOGGED_IN_USER, this._updateLoggedInfo, this);

        super.enable();
    }

    /**
     * @overridden Collection.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        EventBroker.removeEventListener(AdminEvent.ADD, this._onAdd, this);
        EventBroker.removeEventListener(AdminEvent.REMOVE, this._onRemove, this);
        EventBroker.removeEventListener(AdminEvent.UPDATE, this._onUpdate, this);
        EventBroker.removeEventListener(AdminEvent.LOAD_USERS, this._onLoad, this);
        EventBroker.removeEventListener(AdminEvent.UPDATE_LOGGED_IN_USER, this._updateLoggedInfo, this);

        super.disable();
    }

    //--------------------------------------------------------------------------------
    // HELPER METHOD
    //--------------------------------------------------------------------------------

    /**
     * Return all the models in the store.
     *
     * @method getAllUsers
     * @return {Array<UserModel>}
     * @public
     */
    getAllUsers() {
        return this.models.slice(0); // Clone array.
    }

    /**
     * Return a model by its userId.
     *
     * @method getUserModelById
     * @return {UserModel}
     * @public
     */
    getUserModelById(userId) {
        return this.findBy({userId: userId})[0];
    }

    /**
     * Return the number of models in the store.
     *
     * @method getCount
     * @return {number}
     * @public
     */
    getCount() {
        return this.length;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method getLoggedInUser
     * @return {UserModel}
     * @public
     */
    getLoggedInUser() {
        return this._currentUser;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _updateStore
     * @protected
     */
    _updateStore(models) {
        this.add(models);

        this.dispatchEvent(this.CHANGE_EVENT);
    }

    //--------------------------------------------------------------------------------
    // EVENT HANDLERS
    //--------------------------------------------------------------------------------

    /**
     * TODO: YUIDoc_comment
     *
     * @method _updateLoggedInfo
     * @protected
     */
    _updateLoggedInfo(event) {
        this._currentUser = event.data;

        if (this._currentUser == null) {
            this.clear();
        }

        this.dispatchEvent(this.LOG_IN_CHANGE);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onLoad
     * @param event {AdminEvent}
     * @protected
     */
    _onLoad(event) {
        this.clear();

        const userModels = event.data;

        this._updateStore(userModels);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onAdd
     * @protected
     */
    _onAdd(event) {
        const userModel = event.data;

        this._updateStore(userModel);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onUpdate
     * @protected
     */
    _onUpdate(event) {
        this.dispatchEvent(this.CHANGE_EVENT);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onRemove
     * @protected
     */
    _onRemove(event) {
        const userId = event.data;

        const userModel = this.findBy({userId: userId});

        this.remove(userModel);

        this.dispatchEvent(this.CHANGE_EVENT);
    }

}

export default new AdminStore();
