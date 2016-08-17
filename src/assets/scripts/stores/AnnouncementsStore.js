import Collection from 'structurejs/model/Collection';
import EventBroker from 'structurejs/event/EventBroker';

import AnnouncementsEvent from '../events/AnnouncementsEvent';
import AnnouncementModel from '../models/AnnouncementModel';

/**
 * A Singleton store container that maintains state & logic for a data set.
 * Pertains to the Flux Architecture Lifecycle.
 *
 * @class AnnouncementsStore
 * @extends Collection
 * @constructor
 **/
class AnnouncementsStore extends Collection {

    /**
     * A change event for the store to dispatch.
     *
     * @property CHANGE_EVENT
     * @type {string}
     * @public
     * @const
     */
    CHANGE_EVENT = 'AnnouncementsStore.changeEvent';

    constructor() {
        super(AnnouncementModel);

        this.enable();
    }

    /**
     * @overridden Collection.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        EventBroker.addEventListener(AnnouncementsEvent.LOAD, this._onLoad, this);
        EventBroker.addEventListener(AnnouncementsEvent.CLEAR, this._onClear, this);

        super.enable();
    }

    /**
     * @overridden Collection.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        EventBroker.removeEventListener(AnnouncementsEvent.LOAD, this._onLoad, this);
        EventBroker.removeEventListener(AnnouncementsEvent.CLEAR, this._onClear, this);

        super.disable();
    }

    //--------------------------------------------------------------------------------
    // HELPER METHOD
    //--------------------------------------------------------------------------------

    /**
     * Return all the models in the store.
     *
     * @method getAll
     * @return {Array<AnnouncementModel>}
     * @public
     */
    getAll() {
        return this.models.slice(0); // Clone array.
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
     * @method _onLoad
     * @param event {AnnouncementsEvent}
     * @protected
     */
    _onLoad(event) {
        this.clear();

        const announcementModel = event.data;

        this._updateStore(announcementModel);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onClear
     * @protected
     */
    _onClear(event) {
        this.clear();

        this.dispatchEvent(this.CHANGE_EVENT);
    }

}

export default new AnnouncementsStore();
