import BaseModal from '../../modals/BaseModal';
import BeerAction from '../../../actions/BeerAction';

import form2js from 'form2js';

/**
 *
 * @class BeerEditModal
 * @extends BaseModal
 * @constructor
 **/
class BeerEditModal extends BaseModal {

    /**
     * TODO: YUIDoc_comment
     *
     * @property _beerModel
     * @type {BeerModel}
     * @protected
     */
    _beerModel = null;

    constructor(beerModel) {
        super();

        this._beerModel = beerModel;
    }

    /**
     * @overridden BaseModal.create
     */
    create() {
        super.create('templates/jst/cms/modals/BeerEditModal', this._beerModel);
    }

    /**
     * @overridden BaseModal._onAcceptModal
     */
    _onAcceptModal(event) {
        event.preventDefault();

        const formData = form2js(this.$element.find('form').get(0), '.', true);

        this._beerModel.update(formData);

        BeerAction.update(this._beerModel);

        this.close();
    }

}

export default BeerEditModal;
