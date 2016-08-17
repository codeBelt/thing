import BaseModel from 'structurejs/model/BaseModel';

/**
 * TODO: YUIDoc_comment
 *
 * @class KegModel
 * @extends BaseModel
 * @constructor
 **/
class KegModel extends BaseModel {

    /**
     * @property kegId
     * @type {int}
     * @public
     */
    kegId = -1;

    /**
     * @property volume
     * @type {number}
     * @public
     */
    volume = 0;

    /**
     * @property currentVolume
     * @type {number}
     * @public
     */
    currentVolume = 0;

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

export default KegModel;
