import BaseModal from '../../modals/BaseModal';
import AdminAction from '../../../actions/AdminAction';

import form2js from 'form2js';

/**
 *
 * @class ForgotPasswordModal
 * @extends BaseModal
 * @constructor
 **/
class ForgotPasswordModal extends BaseModal {

    constructor() {
        super();
    }

    /**
     * @overridden BaseModal.create
     */
    create() {
        super.create('templates/jst/cms/modals/ForgotPasswordModal');
    }

    /**
     * @overridden BaseModal._onAcceptModal
     */
    _onAcceptModal(event) {
        event.preventDefault();

        const formData = form2js(this.$element.find('form').get(0), '.', true);

        AdminAction.resetPassword(formData.email);

        this.close();
    }

}

export default ForgotPasswordModal;
