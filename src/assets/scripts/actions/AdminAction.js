import BaseObject from 'structurejs/BaseObject';
import EventBroker from 'structurejs/event/EventBroker';

import AdminService from '../services/AdminService';
import AdminEvent from '../events/AdminEvent';

/**
 * Action class help facilitate passing data to the {{#crossLink "EventBroker"}}{{/crossLink}}(Global Dispatcher).
 * Pertains to the Flux Architecture Lifecycle.
 *
 * @class AdminAction
 * @extends BaseObject
 * @constructor
 **/
class AdminAction extends BaseObject {

    constructor() {
        super();

        AdminService.addEventListener(AdminService.CHANGE, this._onChange, this);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method loadUsers
     * @public
     */
    loadUsers() {
        AdminService
            .getAllUsers()
            .then((userModels) => {
                EventBroker.dispatchEvent(AdminEvent.LOAD_USERS, userModels);
            });
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method login
     * @public
     */
    login(email, password) {
        AdminService.login(email, password);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method logout
     * @public
     */
    logout() {
        AdminService.logout();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method createAccount
     * @public
     */
    createAccount(userModel) {
        AdminService
            .createUser(userModel)
            .then((model) => {
                EventBroker.dispatchEvent(AdminEvent.ADD, model);
            });
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method updateUser
     * @public
     */
    updateUser(userModel) {
        AdminService.updateUser(userModel);

        EventBroker.dispatchEvent(AdminEvent.UPDATE);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method resetPassword
     * @public
     */
    resetPassword(email) {
        AdminService.resetPassword(email);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method remove
     * @public
     */
    remove(userId) {
        AdminService
            .delete(userId)
            .then(EventBroker.dispatchEvent(AdminEvent.REMOVE, userId));
    }

    //--------------------------------------------------------------------------------
    // EVENT HANDLERS
    //--------------------------------------------------------------------------------

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onChange
     * @protected
     */
    _onChange(event) {
        EventBroker.dispatchEvent(AdminEvent.UPDATE_LOGGED_IN_USER, AdminService.getLoggedInUser());
        //
        // AdminService.getAllUsers()
        //    .then((dataList) => {
        //        console.log("dataList", dataList);
        //    });
    }

}

export default new AdminAction();
