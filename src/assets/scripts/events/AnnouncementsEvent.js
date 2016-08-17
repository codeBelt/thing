import BaseEvent from 'structurejs/event/BaseEvent';

/**
 * Events that pertains to the Flux Architecture Lifecycle.
 *
 * @class AnnouncementsEvent
 * @extends BaseEvent
 * @constructor
 **/
class AnnouncementsEvent extends BaseEvent {

    /**
     * Event to be dispatched when the store needs to be loaded.
     *
     * @event LOAD
     * @type {string}
     * @static
     */
    static LOAD = 'AnnouncementsEvent.load';

    /**
     * Event to be dispatched when store needs to be empty.
     *
     * @event CLEAR
     * @type {string}
     * @static
     */
    static CLEAR = 'AnnouncementsEvent.clear';

    constructor(type, bubbles, cancelable, data) {
        super(type, bubbles, cancelable, data);
    }

}

export default AnnouncementsEvent;
