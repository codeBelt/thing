import BaseObject from 'structurejs/BaseObject';
import EventBroker from 'structurejs/event/EventBroker';

import AnnouncementsEvent from '../events/AnnouncementsEvent';

/**
 * Action class help facilitate passing data to the {{#crossLink "EventBroker"}}{{/crossLink}}(Global Dispatcher).
 * Pertains to the Flux Architecture Lifecycle.
 *
 * @class AnnouncementsAction
 * @extends BaseObject
 * @constructor
 **/
class AnnouncementsAction extends BaseObject {

    constructor() {
        super();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method load
     * @public
     */
    async load() {
        try {

            const response = await fetch('/calendar');
            const data = await response.json();

            EventBroker.dispatchEvent(AnnouncementsEvent.LOAD, data)

        } catch(error) { console.error(error); }
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method clear
     * @public
     */
    clear() {
        EventBroker.dispatchEvent(AnnouncementsEvent.CLEAR);
    }

}

export default new AnnouncementsAction();
