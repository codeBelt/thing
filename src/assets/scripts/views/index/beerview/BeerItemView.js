import DOMElement from 'structurejs/display/DOMElement';
import Util from 'structurejs/util/Util';
import KegPourView from './beeritemview/KegPourView';

/**
 * TODO: YUIDoc_comment
 *
 * @class BeerItemView
 * @extends DOMElement
 * @constructor
 **/
class BeerItemView extends DOMElement {

    /**
     * @property _beerTapNumber
     * @type {number}
     * @protected
     */
    _beerTapNumber = null;

    /**
     * @property _fireBase
     * @type {FireBase}
     * @protected
     */
    _fireBase = null;

    /**
     * @property _kegPourView
     * @type {KegPourView}
     * @protected
     */
    _kegPourView = null;

    /**
     * @property _amount
     * @type {number}
     * @protected
     */
    _amount = 0;

    /**
     * @property _capacity
     * @type {number}
     * @protected
     */
    _capacity = 0;

    /**
     * @property _isPouring
     * @type {boolean}
     * @protected
     */
    _isPouring = true;

    /**
     * @property _$glass
     * @type {jQuery}
     * @protected
     */
    _$glass = null;

    /**
     * @property _$activeBar
     * @type {jQuery}
     * @protected
     */
    _$activeBar = null;

    /**
     * @property _beerColors
     * @type {Array<string>}
     * @protected
     */
    _beerColors = [ '#FDE69D', '#FCD87F', '#FCCA63', '#FBC050', '#F5B238', '#F3A728', '#EC9D26', '#E48F23', '#E18822', '#D87E1F', '#D1741D', '#C96C1B', '#C4641A', '#BD5C18', '#B45315', '#AE4F14', '#AA4713', '#A04011', '#9A390F', '#94350E', '#8F2F0D', '#8A2D0D', '#82260B', '#7D200A', '#761D09', '#711C07', '#6B1607', '#661006', '#611006', '#5A0E05', '#540D05', '#5C0B06', '#4E0B0B', '#490708', '#430808', '#410909', '#3B0A0A', '#380809', '#38080C', '#34090B'
    ];

    constructor(beerModel, beerTapNumber, firebase) {
        super('templates/jst/index/beerview/BeerItemView', beerModel);

        this._beerTapNumber = beerTapNumber;
        this._fireBase = firebase;
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        const domElement = this.getChild('.js-BeerItemView-kegContainer');

        this._kegPourView = new KegPourView();
        domElement.addChild(this._kegPourView);

        this._$glass = this.$element.find('.js-KegPourView-glass');
        this._$activeBar = this.$element.find('.js-BeerItemView-isActive');
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        this._fireBase.child(`line${ this._beerTapNumber }/amount`).on('value', this._onAmountChange, this);
        this._fireBase.child(`line${ this._beerTapNumber }/capacity`).on('value', this._onCapacityChange, this);
        this._fireBase.child(`line${ this._beerTapNumber }/status`).on('value', this._onStatusChange, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        this._fireBase.child(`line${ this._beerTapNumber }/amount`).off('value', this._onAmountChange, this);
        this._fireBase.child(`line${ this._beerTapNumber }/capacity`).off('value', this._onCapacityChange, this);
        this._fireBase.child(`line${ this._beerTapNumber }/status`).off('value', this._onStatusChange, this);

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        let percent = (this._amount / this._capacity) ;
        percent = (isNaN(percent) === true) ? 0 : percent;

        var MAX = 0;
        var MIN = 150;
        var value = ((MAX - MIN) * percent) + MIN;
        // percent = (value - MIN) / (MAX - MIN);

        this._kegPourView.setLevel(value);
        this._isPouring = (percent === 0) ? false : this._isPouring;

        this._$glass.toggle(this._isPouring);
        this._$activeBar.toggleClass('isActive', this._isPouring);
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
     * @method _onAmountChange
     * @protected
     */
    _onAmountChange(snapshot) {
        this._amount = snapshot.val();

        this.layout();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onCapacityChange
     * @protected
     */
    _onCapacityChange(snapshot) {
        this._capacity = snapshot.val();

        this.layout();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onStatusChange
     * @protected
     */
    _onStatusChange(snapshot) {
        this._isPouring = Util.toBoolean(snapshot.val());

        this.layout();
    }




}

export default BeerItemView;
