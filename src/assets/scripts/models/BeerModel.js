import BaseModel from 'structurejs/model/BaseModel';

/**
 * TODO: YUIDoc_comment
 *
 * @class BeerModel
 * @extends BaseModel
 * @constructor
 **/
class BeerModel extends BaseModel {

    /**
     * @property beerId
     * @type {number}
     * @public
     */
    beerId = null;

    /**
     * @property company
     * @type {string}
     * @public
     */
    company = '';

    /**
     * @property name
     * @type {string}
     * @public
     */
    name = '';

    /**
     * @property description
     * @type {string}
     * @public
     */
    description = '';

    /**
     * @property imagePath
     * @type {string}
     * @public
     */
    imagePath = '';

    /**
     * @property isTapEmpty
     * @type {boolean}
     * @public
     */
    isTapEmpty = false;

    /**
     * @property isActive
     * @type {boolean}
     * @public
     */
    isActive = false;

    /**
     * @property tapOrder
     * @type {number}
     * @public
     */
    tapOrder = 99;

    /**
     * Alcohol By Volume
     *
     * @property abv
     * @type {number}
     * @public
     */
    abv = 0;

    constructor(data) {
        super();

        if (data) {
            this.update(data);
        }
    }

    /**
     * @overridden BaseModel.update
     */
    update(data) {
        super.update(data);

        // Override any values after the default super update method has set the values.
    }

}

export default BeerModel;
