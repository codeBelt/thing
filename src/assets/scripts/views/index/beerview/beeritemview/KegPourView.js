import DOMElement from 'structurejs/display/DOMElement';

/**
 * TODO: YUIDoc_comment
 *
 * @class KegPourView
 * @extends DOMElement
 * @constructor
 **/
class KegPourView extends DOMElement {

    /**
     * @property _$kegLevel
     * @type {jQuery}
     * @protected
     */
    _$kegLevel = null;

    constructor() {
        super();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create('templates/jst/index/beerview/beeritemview/KegPourView');

        this._$kegLevel = this.$element.find('.js-KegPourView-level');
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        // Enable the child objects and/or add any event listeners.

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        // Disable the child objects and/or remove any event listeners.

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        // Layout or update the objects in this parent class.
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
    // HELPER METHOD
    //--------------------------------------------------------------------------------

    /**
     * TODO: YUIDoc_comment
     *
     * @method setLevel
     * @public
     */
    setLevel(value) {
        this._$kegLevel.css({
            "webkitTransform":"translateY(" + value + "px)",
            "MozTransform":"translateY(" + value + "px)",
            "msTransform":"translateY(" + value + "px)",
            "OTransform":"translateY(" + value + "px)",
            "transform":"translateY(" + value + "px)"
        });
    }

}

export default KegPourView;
