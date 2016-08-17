import BaseObject from 'structurejs/BaseObject';
import EventBroker from 'structurejs/event/EventBroker';

import BeerService from '../services/BeerService';
import BeerEvent from '../events/BeerEvent';

/**
 * Action class help facilitate passing data to the {{#crossLink "EventBroker"}}{{/crossLink}}(Global Dispatcher).
 * Pertains to the Flux Architecture Lifecycle.
 *
 * @class BeerAction
 * @extends BaseObject
 * @constructor
 **/
class BeerAction extends BaseObject {

    _api = null;

    constructor() {
        super();

        BeerService.addEventListener(BeerService.CHANGE, this._onServiceChange, this);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method loadBeers
     * @public
     */
    async loadBeers() {
        try {

            const models = await BeerService.getAllBeerModels();

            EventBroker.dispatchEvent(BeerEvent.LOAD, models);

        } catch(error) { console.error(error.stack); }
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method add
     * @param beerModel {BeerModel}
     * @public
     */
    async add(beerModel) {
        try {

            const model = await BeerService.add(beerModel);

            EventBroker.dispatchEvent(BeerEvent.ADD, model);

        } catch(error) { console.error(error.stack); }
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method update
     * @public
     */
    async update(beerModel) {
        try {

            const model = await BeerService.update(beerModel);

            EventBroker.dispatchEvent(BeerEvent.UPDATE);

        } catch(error) { console.error(error.stack); }
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method remove
     * @public
     */
    async remove(beerId) {
        try {

            const beerId = await BeerService.delete(beerId);

            EventBroker.dispatchEvent(BeerEvent.REMOVE, beerId)

        } catch(error) { console.error(error.stack); }
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method clear
     * @public
     */
    clear() {
        EventBroker.dispatchEvent(BeerEvent.CLEAR);
    }

    //--------------------------------------------------------------------------------
    // EVENT HANDLERS
    //--------------------------------------------------------------------------------

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onServiceChange
     * @protected
     */
    _onServiceChange(event) {
        this.loadBeers();
    }

}

export default new BeerAction();
