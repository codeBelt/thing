import BaseEvent from 'structurejs/event/BaseEvent';

/**
 * A central location for events within in the application.
 * Depending on the situation it is better to create individual event classes. Don't just throw all event types in here.
 * Do not put events that belong to the Flux Architecture Lifecycle in here.
 *
 * @class AppEvent
 * @extends BaseEvent
 * @constructor
 **/
class AppEvent extends BaseEvent {

    /**
     * Event to be dispatched when the local database is ready.
     *
     * @event DATABASE_READY
     * @type {string}
     * @static
     */
    static DATABASE_READY = 'AppEvent.databaseReady';

    /**
     * Event to be dispatched clear the local database.
     *
     * @event DATABASE_CLEAR
     * @type {string}
     * @static
     */
    static DATABASE_CLEAR = 'AppEvent.databaseClear';

    constructor(type, bubbles = false, cancelable = false, data = null) {
        super(type, bubbles, cancelable, data);
    }

}

export default AppEvent;
