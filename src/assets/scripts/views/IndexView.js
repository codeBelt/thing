import DOMElement from 'structurejs/display/DOMElement';

import BaseApiService from '../services/BaseApiService';
import SliderComponent from './components/SliderComponent';
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

        this._sliderComponent = new SliderComponent(this.$element.find('.js-SliderComponent'));
        this.addChild(this._sliderComponent);

        // Update date and time displayed
        this._$date = this.$element.find('.js-IndexView-date');
        this._$time = this.$element.find('.js-IndexView-time');

        setInterval(() => this._onDateTimeUpdate(), 1000);

        this._fetchData();
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

    /**
     * TODO: YUIDoc_comment
     *
     * @method _fetchData
     * @protected
     */
    async _fetchData() {
        const apiService = new BaseApiService();
        const imageList = await apiService.getRequest('/api/images');

        imageList.forEach(imagePath => {
           const imageView = new ImageView(imagePath);
            this._sliderComponent.addChild(imageView);
        });
    }

}

export default IndexView;
