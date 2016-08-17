import DOMElement from 'structurejs/display/DOMElement';

import ModalManager from '../../controllers/ModalManager';
import AdminAction from '../../actions/AdminAction';
import ForgotPasswordModal from '../cms/modals/ForgotPasswordModal';

import form2js from 'form2js';

/**
 * TODO: YUIDoc_comment
 *
 * @class LoginView
 * @extends DOMElement
 * @constructor
 **/
class LoginView extends DOMElement {

    /**
     * @property _$loginBtn
     * @type {jQuery}
     * @protected
     */
    _$loginBtn = null;

    /**
     * @property _$forgotPasswordBtn
     * @type {jQuery}
     * @protected
     */
    _$forgotPasswordBtn = null;

    constructor() {
        super();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create('templates/jst/cms/LoginView');

        this._$loginBtn = this.$element.find('.js-signInBtn');
        this._$forgotPasswordBtn = this.$element.find('.js-forgotPasswordBtn');
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        this._$loginBtn.addEventListener('click', this._onLoginClick, this);
        this._$forgotPasswordBtn.addEventListener('click', this._onForgotClick, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        this._$loginBtn.removeEventListener('click', this._onLoginClick, this);
        this._$forgotPasswordBtn.removeEventListener('click', this._onForgotClick, this);

        super.disable();
    }

    //--------------------------------------------------------------------------------
    // HELPER METHOD
    //--------------------------------------------------------------------------------

    /**
     * TODO: YUIDoc_comment
     *
     * @method update
     * @pulbic
     */
    update(routerEvent) {
        console.log('routerEvent', routerEvent);
    }

    //--------------------------------------------------------------------------------
    // EVENT HANDLERS
    //--------------------------------------------------------------------------------

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onLoginClick
     * @protected
     */
    _onLoginClick(event) {
        event.preventDefault();

        const formElement = this.$element.find('form').get(0);
        const formData = form2js(formElement, '.', false);

        AdminAction.login(formData.email, formData.password);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onForgotClick
     * @protected
     */
    _onForgotClick(event) {
        event.preventDefault();

        const modal = new ForgotPasswordModal();

        ModalManager.addModal(modal);
    }

}

export default LoginView;
