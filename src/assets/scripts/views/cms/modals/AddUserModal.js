import BaseModal from '../../modals/BaseModal';
import AdminAction from '../../../actions/AdminAction';
import UserModel from '../../../models/UserModel';

import form2js from 'form2js';

/**
 *
 * @class AddUserModal
 * @extends BaseModal
 * @constructor
 **/
class AddUserModal extends BaseModal {

    /**
     * TODO: YUIDoc_comment
     *
     * @property _userModel
     * @type {UserModel}
     * @protected
     */
    _userModel = null;

    constructor(userModel = null) {
        super();

        this._userModel = userModel;
    }

    /**
     * @overridden BaseModal.create
     */
    create() {
        super.create('templates/jst/cms/modals/AddUserModal', this._userModel);
    }

    /**
     * @overridden BaseModal._onAcceptModal
     */
    _onAcceptModal(event) {
        event.preventDefault();

        const formData = form2js(this.$element.find('form').get(0), '.', true);
        const userModel = new UserModel(formData);

        AdminAction.createAccount(userModel);

        this.close();
    }

}

export default AddUserModal;
