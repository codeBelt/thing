import DOMElement from 'structurejs/display/DOMElement';

import SliderComponent from './SliderComponent';
import ImageView from './ImageView';

/**
 * TODO: YUIDoc_comment
 *
 * @class IndexView
 * @extends DOMElement
 * @constructor
 **/
class IndexView extends DOMElement {

    /**
     * @property _sliderComponent
     * @type {SliderComponent}
     * @protected
     */
    _sliderComponent = null;

    /**
     * @property _$date
     * @type {jQuery}
     * @protected
     */
    _$date = null;

    constructor($element) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        // http://www.bikes.com/sites/default/files/models/MAIDEN%20WORLD%20CUP%20SIDE.jpg
        // http://www.bikes.com/sites/default/files/models/THUNDERBOLT%20799%20MSL%20SIDE.jpg
        // http://www.bikes.com/sites/default/files/models/ALTITUDE%20750%20MSL%20SIDE_REVISED.jpg
        // http://www.bikes.com/sites/default/files/models/2016-Sherpa-side.jpg

        this._sliderComponent = new SliderComponent(this.$element.find('.js-SliderComponent'));
        this.addChild(this._sliderComponent);

        this._sliderComponent.addChild(new ImageView('http://www.bikes.com/sites/default/files/models/MAIDEN%20WORLD%20CUP%20SIDE.jpg'));
        this._sliderComponent.addChild(new ImageView('http://www.bikes.com/sites/default/files/models/THUNDERBOLT%20799%20MSL%20SIDE.jpg'));

        // Update date and time displayed
        this._$date = this.$element.find('.js-IndexView-date');
        this._$time = this.$element.find('.js-IndexView-time');

        setInterval(() => this._onDateTimeUpdate(), 1000);
    }

    //--------------------------------------------------------------------------------
    // HELPER METHOD
    //--------------------------------------------------------------------------------

    /**
     * @method _onDateTimeUpdate
     * @protected
     */
    _onDateTimeUpdate() {
        this._$date.text(moment().format('MMM D'));
        this._$time.text(moment().format('h:mma'));
    }

}

export default IndexView;
