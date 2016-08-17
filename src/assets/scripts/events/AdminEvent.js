import BaseEvent from 'structurejs/event/BaseEvent';

/**
 * Events that pertains to the Flux Architecture Lifecycle.
 *
 * @class AdminEvent
 * @extends BaseEvent
 * @constructor
 **/
class AdminEvent extends BaseEvent {

    /**
     * @event LOAD_USERS
     * @type {string}
     * @static
     */
    static LOAD_USERS = 'AdminEvent.loadUsers';

    /**
     * @event ADD
     * @type {string}
     * @static
     */
    static ADD = 'AdminEvent.add';

    /**
     * @event REMOVE
     * @type {string}
     * @static
     */
    static REMOVE = 'AdminEvent.remove';

    /**
     * @event UPDATE
     * @type {string}
     * @static
     */
    static UPDATE = 'AdminEvent.update';

    /**
     * @event UPDATE_LOGGED_IN_USER
     * @type {string}
     * @static
     */
    static UPDATE_LOGGED_IN_USER = 'AdminEvent.updateLoggedInUser';

    constructor(type, bubbles, cancelable, data) {
        super(type, bubbles, cancelable, data);
    }

}

export default AdminEvent;
