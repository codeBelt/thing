import DOMElement from 'structurejs/display/DOMElement';
import TemplateFactory from 'structurejs/util/TemplateFactory';

import ModalEvent from '../../../events/ModalEvent';
import ModalManager from '../../../controllers/ModalManager';
import BeerAction from '../../../actions/BeerAction';
import AdminService from '../../../services/AdminService';
import BeerStore from '../../../stores/BeerStore';
import BeerFilterType from '../../../constants/BeerFilterType';
import BeerEditModal from '../../../views/cms/modals/BeerEditModal';
import AddBeerModal from '../../../views/cms/modals/AddBeerModal';
import GenericModal from '../../../views/modals/GenericModal';

import Sortable from 'Sortable';

/**
 * TODO: YUIDoc_comment
 *
 * @class BeerListView
 * @extends DOMElement
 * @constructor
 **/
class BeerListView extends DOMElement {

    /**
     * TODO: YUIDoc_comment
     *
     * @property _sortable
     * @type {Sortable}
     * @protected
     */
    _sortable = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _currentFilter
     * @type {string}
     * @protected
     */
    _currentFilter = BeerFilterType.ALL;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _isDraggable
     * @type {boolean}
     * @protected
     */
    _isDraggable = false;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _$beerItemsContainer
     * @type {JQuery}
     * @protected
     */
    _$beerItemsContainer = null;

    constructor() {
        super();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create('templates/jst/cms/views/BeerListView');

        this._$beerItemsContainer = this.$element.find('.js-beerListView-items');

        BeerAction.loadBeers();

        this._setupDrag();
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        BeerStore.addEventListener(BeerStore.CHANGE_EVENT, this._onBeerStoreChange, this);

        this.$element.addEventListener('click', '.js-beerListView-addBeer', this._onAddBeer, this);

        this.$element.addEventListener('click', '[data-filter]', this._onFilterChange, this);

        this._$beerItemsContainer.addEventListener('change', '.js-tapIndicator', this._onTapChange, this);
        this._$beerItemsContainer.addEventListener('click', '.js-emptyBtn', this._emptyToggle, this);
        this._$beerItemsContainer.addEventListener('click', '.js-activeBtn', this._activeToggle, this);
        this._$beerItemsContainer.addEventListener('click', '.js-editBtn', this._onClickEditBtn, this);
        this._$beerItemsContainer.addEventListener('click', '.js-deleteBtn', this._onClickDeleteBtn, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        BeerStore.removeEventListener(BeerStore.CHANGE_EVENT, this._onBeerStoreChange, this);

        this.$element.removeEventListener('click', '.js-beerListView-addBeer', this._onAddBeer, this);

        this.$element.removeEventListener('click', '[data-filter]', this._onFilterChange, this);

        this._$beerItemsContainer.removeEventListener('change', '.js-tapIndicator', this._onTapChange, this);
        this._$beerItemsContainer.removeEventListener('click', '.js-emptyBtn', this._emptyToggle, this);
        this._$beerItemsContainer.removeEventListener('click', '.js-activeBtn', this._activeToggle, this);
        this._$beerItemsContainer.removeEventListener('click', '.js-editBtn', this._onClickEditBtn, this);
        this._$beerItemsContainer.removeEventListener('click', '.js-deleteBtn', this._onClickDeleteBtn, this);

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        if (BeerStore.getCount() > 0) {
            const data = {
                isDraggable: this._isDraggable,
                beerModels: BeerStore.getModelsForFilter(this._currentFilter)
            };

            const html = TemplateFactory.create('templates/jst/cms/views/BeerItem', data);

            this._$beerItemsContainer.html(html);
        }
    }

    /**
     * @overridden DOMElement.destroy
     */
    destroy() {
        this.disable();

        this._sortable.destroy();

        super.destroy();
    }

    //--------------------------------------------------------------------------------
    // HELPER METHOD
    //--------------------------------------------------------------------------------

    /**
     * @TODO: YUIDoc_comment
     *
     * @method setupDrag
     * @accessType
     */
    _setupDrag() {
        const list = this._$beerItemsContainer.get(0);

        this._sortable = new Sortable(list, {
            ghostClass: 'isGhost',
            animation: 200,
            scroll: true,
            handle: '.listItem-handle',

            onUpdate: (event) => this._onTapIndexChange(event)
        });
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _swapValues
     * @protected
     */
    _swapValues(sourceOne, sourceTwo, propertyName) {
        const propertyValue = sourceOne[propertyName];
        sourceOne[propertyName] = sourceTwo[propertyName];
        sourceTwo[propertyName] = propertyValue;
    }

    //--------------------------------------------------------------------------------
    // EVENT HANDLERS
    //--------------------------------------------------------------------------------

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onBeerStoreChange
     * @protected
     */
    _onBeerStoreChange(event) {
        this.layout();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onTapIndexChange
     * @protected
     */
    _onTapIndexChange(event) {
        if (event.oldIndex === event.newIndex) { return; }

        const beerModels = BeerStore.getActiveModels();
        const swappedBeers = beerModels.filter((beerModel) => {
            return beerModel.tapOrder === event.oldIndex || beerModel.tapOrder === event.newIndex;
        });

        this._swapValues(swappedBeers[0], swappedBeers[1], 'tapOrder');

        BeerAction.update(swappedBeers[0]);
        BeerAction.update(swappedBeers[1]);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onAddBeer
     * @protected
     */
    _onAddBeer(event) {
        event.preventDefault();

        if (AdminService.isLoggedIn() === true) {
            const modal = new AddBeerModal();

            ModalManager.addModal(modal);
        } else {
            alert('Please log in!');
        }
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onFilterChange
     * @protected
     */
    _onFilterChange(event) {
        const $currentTarget = $(event.currentTarget);
        $currentTarget.siblings().removeClass('isActiveListBarItem');
        $currentTarget.addClass('isActiveListBarItem');

        this._currentFilter = $currentTarget.data('filter');

        this._isDraggable = (this._currentFilter === BeerFilterType.ACTIVE);

        this.layout();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onTapChange
     * @protected
     */
    _onTapChange(event) {
        const $currentTarget = $(event.currentTarget);
        const modelId = $currentTarget.data('beer-id');
        const tapOrder = $currentTarget.val();

        const beerModel = BeerStore.getBeerModelById(modelId);
        beerModel.tapOrder = tapOrder;

        BeerAction.update(beerModel);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onClickEditBtn
     * @protected
     */
    _onClickEditBtn(event) {
        const $currentTarget = $(event.currentTarget);
        const modelId = $currentTarget.data('beer-id');
        const beerModel = BeerStore.getBeerModelById(modelId);
        const modal = new BeerEditModal(beerModel);

        ModalManager.addModal(modal);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _emptyToggle
     * @protected
     */
    _emptyToggle(event) {
        const $currentTarget = $(event.currentTarget);
        const modelId = $currentTarget.data('beer-id');
        const beerModel = BeerStore.getBeerModelById(modelId);

        beerModel.isTapEmpty = !beerModel.isTapEmpty;

        BeerAction.update(beerModel);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _activeToggle
     * @protected
     */
    _activeToggle(event) {
        const $currentTarget = $(event.currentTarget);
        const modelId = $currentTarget.data('beer-id');
        const beerModel = BeerStore.getBeerModelById(modelId);

        beerModel.isActive = !beerModel.isActive;

        BeerAction.update(beerModel);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onClickDeleteBtn
     * @protected
     */
    _onClickDeleteBtn(event) {
        const $currentTarget = $(event.currentTarget);
        const modelId = $currentTarget.data('beer-id');

        const modal = new GenericModal('templates/jst/modals/GenericModal', {
            title: 'Delete Beer',
            content: 'Are you sure you want to delete this beer?',
            acceptBtn: 'Yes',
            rejectBtn: 'Cancel',
            modelId: modelId
        });
        modal.addEventListener(ModalEvent.ACCEPT, this._onDeleteBeer, this);

        ModalManager.addModal(modal);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onDeleteBeer
     * @protected
     */
    _onDeleteBeer(event) {
        const modelId = event.data.modelId;

        BeerAction.remove(modelId);
    }

}

export default BeerListView;
