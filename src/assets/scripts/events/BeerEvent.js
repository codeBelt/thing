import BaseEvent from 'structurejs/event/BaseEvent';

/**
 * Events that pertains to the Flux Architecture Lifecycle.
 *
 * @class BeerEvent
 * @extends BaseEvent
 * @constructor
 **/
class BeerEvent extends BaseEvent {

    /**
     * Event to be dispatched when the store needs to be loaded.
     *
     * @event LOAD
     * @type {string}
     * @static
     */
    static LOAD = 'BeerEvent.load';

    /**
     * Event to be dispatched when a beer needs to be added.
     *
     * @event ADD
     * @type {string}
     * @static
     */
    static ADD = 'BeerEvent.add';

    /**
     * Event to be dispatched when a beer needs to be removed.
     *
     * @event REMOVE
     * @type {string}
     * @static
     */
    static REMOVE = 'BeerEvent.remove';

    /**
     * Event to be dispatched when a beer needs to be updated.
     *
     * @event UPDATE
     * @type {string}
     * @static
     */
    static UPDATE = 'BeerEvent.update';

    /**
     * Event to be dispatched when store needs to be empty.
     *
     * @event CLEAR
     * @type {string}
     * @static
     */
    static CLEAR = 'BeerEvent.clear';

    constructor(type, bubbles, cancelable, data) {
        super(type, bubbles, cancelable, data);
    }

}

export default BeerEvent;
