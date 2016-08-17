import BaseModel from 'structurejs/model/BaseModel';

/**
 * TODO: YUIDoc_comment
 *
 * @class UserModel
 * @extends BaseModel
 * @constructor
 **/
class UserModel extends BaseModel {

    /**
     * @property userId
     * @type {number}
     * @public
     */
    userId = null;

    /**
     * @property name
     * @type {string}
     * @public
     */
    name = null;

    /**
     * @property email
     * @type {string}
     * @public
     */
    email = null;

    /**
     * @property password
     * @type {string}
     * @public
     */
    password = null;

    /**
     * @property uid
     * @type {string}
     * @public
     */
    uid = null;

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

export default UserModel;
