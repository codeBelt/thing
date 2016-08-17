import BaseModal from '../../modals/BaseModal';
import AdminAction from '../../../actions/AdminAction';

import form2js from 'form2js';

/**
 *
 * @class UserEditModal
 * @extends BaseModal
 * @constructor
 **/
class UserEditModal extends BaseModal {

    /**
     * TODO: YUIDoc_comment
     *
     * @property _userModel
     * @type {UserModel}
     * @protected
     */
    _userModel = null;

    constructor(userModel) {
        super();

        this._userModel = userModel;
    }

    /**
     * @overridden BaseModal.create
     */
    create() {
        super.create('templates/jst/cms/modals/UserEditModal', this._userModel);
    }

    /**
     * @overridden BaseModal._onAcceptModal
     */
    _onAcceptModal(event) {
        event.preventDefault();

        const formData = form2js(this.$element.find('form').get(0), '.', true);

        this._userModel.update(formData);

        AdminAction.updateUser(this._userModel);

        this.close();
    }

}

export default UserEditModal;
