import DOMElement from 'structurejs/display/DOMElement';

/**
 * @class ImageView
 * @extends DOMElement
 * @constructor
 **/
class ImageView extends DOMElement {

    /**
     * @property _imagePath
     * @type {string}
     * @protected
     */
    _imagePath = null;

    constructor(imagePath) {
        super();

        this._imagePath = imagePath;
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create('templates/jst/ImageView', { imagePath: this._imagePath });
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
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

}

export default ImageView;
