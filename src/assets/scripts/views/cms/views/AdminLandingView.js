import DOMElement from 'structurejs/display/DOMElement';

/**
 * TODO: YUIDoc_comment
 *
 * @class AdminLandingView
 * @extends DOMElement
 * @constructor
 **/
class AdminLandingView extends DOMElement {

    constructor() {
        super();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create('templates/jst/cms/views/AdminLandingView');
    }

}

export default AdminLandingView;
