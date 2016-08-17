import BaseModal from '../../modals/BaseModal';
import BeerAction from '../../../actions/BeerAction';
import BeerModel from '../../../models/BeerModel';

import form2js from 'form2js';

/**
 *
 * @class AddBeerModal
 * @extends BaseModal
 * @constructor
 **/
class AddBeerModal extends BaseModal {

    /**
     * TODO: YUIDoc_comment
     *
     * @property _beerModel
     * @type {BeerModel}
     * @protected
     */
    _beerModel = null;

    constructor(beerModel = null) {
        super();

        this._beerModel = beerModel;
    }

    /**
     * @overridden BaseModal.create
     */
    create() {
        super.create('templates/jst/cms/modals/AddBeerModal', this._beerModel);
    }

    /**
     * @overridden BaseModal._onAcceptModal
     */
    _onAcceptModal(event) {
        event.preventDefault();

        const formData = form2js(this.$element.find('form').get(0), '.', true);
        const beerModel = new BeerModel(formData);

        BeerAction.add(beerModel);

        this.close();
    }

}

export default AddBeerModal;
