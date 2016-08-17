import Collection from 'structurejs/model/Collection';
import EventBroker from 'structurejs/event/EventBroker';

import BeerEvent from '../events/BeerEvent';
import BeerModel from '../models/BeerModel';
import BeerFilterType from '../constants/BeerFilterType';

/**
 * A Singleton store container that maintains state & logic for a data set.
 * Pertains to the Flux Architecture Lifecycle.
 *
 * @class BeerStore
 * @extends Collection
 * @constructor
 **/
class BeerStore extends Collection {

    /**
     * A change event for the store to dispatch.
     *
     * @property CHANGE_EVENT
     * @type {string}
     * @public
     * @const
     */
    CHANGE_EVENT = 'BeerStore.changeEvent';

    constructor() {
        super(BeerModel);

        this.enable();
    }

    /**
     * @overridden Collection.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        EventBroker.addEventListener(BeerEvent.LOAD, this._onLoad, this);
        EventBroker.addEventListener(BeerEvent.ADD, this._onAdd, this);
        EventBroker.addEventListener(BeerEvent.UPDATE, this._onUpdate, this);
        EventBroker.addEventListener(BeerEvent.REMOVE, this._onRemove, this);
        EventBroker.addEventListener(BeerEvent.CLEAR, this._onClear, this);

        super.enable();
    }

    /**
     * @overridden Collection.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        EventBroker.removeEventListener(BeerEvent.LOAD, this._onLoad, this);
        EventBroker.removeEventListener(BeerEvent.ADD, this._onAdd, this);
        EventBroker.removeEventListener(BeerEvent.UPDATE, this._onUpdate, this);
        EventBroker.removeEventListener(BeerEvent.REMOVE, this._onRemove, this);
        EventBroker.removeEventListener(BeerEvent.CLEAR, this._onClear, this);

        super.disable();
    }

    //--------------------------------------------------------------------------------
    // HELPER METHOD
    //--------------------------------------------------------------------------------

    /**
     * Return all active beer models in the store.
     *
     * @method getActiveModels
     * @return {Array<BeerModel>}
     * @public
     */
    getActiveModels() {
         let models = this.models.filter((beerModel) => {
            return beerModel.isActive === true;
        });

        // Sort the beers by there tap order.
        models = models.sort((a, b) => a.tapOrder - b.tapOrder);

        // Need to update the tap order for the models in memory because a new one that is added
        // has a tap order of 99. This makes the models tap orders swappable.
        models.forEach((beerModel, index) => {
            beerModel.tapOrder = index;
        });

        return models;
    }

    /**
     * Return all the models in the store.
     *
     * @method getAll
     * @return {Array<BeerModel>}
     * @public
     */
    getAll() {
        return this.models.slice(0); // Clone array.
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method getModelsForFilter
     * @protected
     */
    getModelsForFilter(filterType) {
        let models;

        if (filterType === BeerFilterType.ACTIVE) {
            models = this.getActiveModels();
        } else if (filterType === BeerFilterType.INACTIVE) {
            models = this.models.filter((model) => { return model.isActive === false; });
        } else {
            models = this.getAll();
        }

        return models;
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
     * Return a model by its beerId.
     *
     * @method getBeerModelById
     * @return {BeerModel}
     * @public
     */
    getBeerModelById(beerId) {
        return this.findBy({beerId: beerId})[0];
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _updateStore
     * @protected
     */
    _updateStore(models) {
        this.add(models);

        this.sortOn('company');

        this.dispatchEvent(this.CHANGE_EVENT);
    }

    //--------------------------------------------------------------------------------
    // EVENT HANDLERS
    //--------------------------------------------------------------------------------

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onLoad
     * @param event {BeerEvent}
     * @protected
     */
    _onLoad(event) {
        this.clear();

        const beerModel = event.data;

        this._updateStore(beerModel);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onAdd
     * @protected
     */
    _onAdd(event) {
        const beerModel = event.data;

        this._updateStore(beerModel);
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
        const beerId = event.data;
        const beerModel = this.findBy({beerId: beerId});

        this.remove(beerModel);

        this.dispatchEvent(this.CHANGE_EVENT);
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

export default new BeerStore();
