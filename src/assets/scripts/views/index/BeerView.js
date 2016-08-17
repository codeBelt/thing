import DOMElement from 'structurejs/display/DOMElement';

import BeerStore from '../../stores/BeerStore';
import BeerAction from '../../actions/BeerAction';
import BeerItemView from './beerview/BeerItemView';

/**
 * TODO: YUIDoc_comment
 *
 * @class BeerView
 * @extends DOMElement
 * @constructor
 **/
class BeerView extends DOMElement {

    /**
     * TODO: YUIDoc_comment
     *
     * @property _beerItemsContainer
     * @type {DOMElement}
     * @protected
     */
    _beerItemsContainer = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _beerFlowFirebase
     * @type {Firebase}
     * @protected
     */
    _beerFlowFirebase = new Firebase("https://burning-heat-6486.firebaseio.com");

    constructor($element) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        this._beerItemsContainer = this.getChild('.js-BeerView-itemsContainer');

        BeerAction.loadBeers();
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        BeerStore.addEventListener(BeerStore.CHANGE_EVENT, this._onStoreChange, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        BeerStore.removeEventListener(BeerStore.CHANGE_EVENT, this._onStoreChange, this);

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        if (BeerStore.getCount() > 0) {
            this._beerItemsContainer.removeChildren(true);

            const beerModels = BeerStore.getActiveModels();

            beerModels.forEach((beerModel, index) => {
                const beerTapNumber = index + 1;
                const beerItemView = new BeerItemView(beerModel, beerTapNumber, this._beerFlowFirebase);
                this._beerItemsContainer.addChild(beerItemView);
            });
        }
    }

    /**
     * @overridden DOMElement.destroy
     */
    destroy() {
        this.disable();

        // Call destroy on any child objects.
        // This super method will also null out your properties for garbage collection.

        super.destroy();
    }

    //--------------------------------------------------------------------------------
    // EVENT HANDLERS
    //--------------------------------------------------------------------------------

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onStoreChange
     * @protected
     */
    _onStoreChange(event) {
        this.layout();
    }

}

export default BeerView;
