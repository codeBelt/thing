import DOMElement from 'structurejs/display/DOMElement';
import TemplateFactory from 'structurejs/util/TemplateFactory';

import ModalManager from '../../../controllers/ModalManager';
import AdminAction from '../../../actions/AdminAction';
import AdminService from '../../../services/AdminService';
import AdminStore from '../../../stores/AdminStore';
import UserEditModal from '../../../views/cms/modals/UserEditModal';
import AddUserModal from '../../../views/cms/modals/AddUserModal';

/**
 * TODO: YUIDoc_comment
 *
 * @class UserListView
 * @extends DOMElement
 * @constructor
 **/
class UserListView extends DOMElement {

    /**
     * TODO: YUIDoc_comment
     *
     * @property _$userItemsContainer
     * @type {JQuery}
     * @protected
     */
    _$userItemsContainer = null;

    constructor() {
        super();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create('templates/jst/cms/views/UserListView');

        this._$userItemsContainer = this.$element.find('.js-userListView-items');

        AdminAction.loadUsers();
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        AdminStore.addEventListener(AdminStore.CHANGE_EVENT, this._onAdminStoreChange, this);

        this.$element.addEventListener('click', '.js-userListView-addUser', this._onAddUser, this);
        this._$userItemsContainer.addEventListener('click', '.js-editBtn', this._onClickEditBtn, this);
        this._$userItemsContainer.addEventListener('click', '.js-deleteBtn', this._onClickDeleteBtn, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        AdminStore.removeEventListener(AdminStore.CHANGE_EVENT, this._onAdminStoreChange, this);

        this.$element.removeEventListener('click', '.js-userListView-addUser', this._onAddUser, this);
        this._$userItemsContainer.removeEventListener('click', '.js-editBtn', this._onClickEditBtn, this);
        this._$userItemsContainer.removeEventListener('click', '.js-deleteBtn', this._onClickDeleteBtn, this);

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        if (AdminStore.getCount() > 0) {
            const html = TemplateFactory.create('templates/jst/cms/views/UserItem', AdminStore.getAllUsers());

            this._$userItemsContainer.html(html);
        }
    }

    //--------------------------------------------------------------------------------
    // HELPER METHOD
    //--------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------
    // EVENT HANDLERS
    //--------------------------------------------------------------------------------

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onAdminStoreChange
     * @protected
     */
    _onAdminStoreChange(event) {
        this.layout();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onAddUser
     * @protected
     */
    _onAddUser(event) {
        event.preventDefault();

        if (AdminService.isLoggedIn() === true) {
            const modal = new AddUserModal();

            ModalManager.addModal(modal);
        } else {
            alert('Please log in!');
        }
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onClickEditBtn
     * @protected
     */
    _onClickEditBtn(event) {
        const $currentTarget = $(event.currentTarget);
        const modelId = $currentTarget.data('user-id');
        const userModel = AdminStore.getUserModelById(modelId);
        const modal = new UserEditModal(userModel);

        ModalManager.addModal(modal);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onClickDeleteBtn
     * @protected
     */
    _onClickDeleteBtn(event) {
        const $currentTarget = $(event.currentTarget);
        const modelId = $currentTarget.data('user-id');

        AdminAction.remove(modelId);
    }

}

export default UserListView;
