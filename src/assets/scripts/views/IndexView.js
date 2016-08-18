import DOMElement from 'structurejs/display/DOMElement';

import BaseApiService from '../services/BaseApiService';
import SliderComponent from './components/SliderComponent';
import ImageView from './ImageView';
import ChartView from './ChartView';

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

    constructor($element) { // eslint-disable-line no-useless-constructor
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
        // this._$date = this.$element.find('.js-IndexView-date');
        // this._$time = this.$element.find('.js-IndexView-time');
        //
        // setInterval(() => this._onDateTimeUpdate(), 1000);

        this._fetchData();
    }

    //--------------------------------------------------------------------------------
    // HELPER METHOD
    //--------------------------------------------------------------------------------

    /**
     * TODO: YUIDoc_comment
     *
     * @method _fetchData
     * @protected
     */
    async _fetchData() {
        // const apiService = new BaseApiService();
        // const imageList = await apiService.getRequest('/api/images');
        //
        // imageList.forEach(imagePath => {
        //    const imageView = new ImageView(imagePath);
        //     this._sliderComponent.addChild(imageView);
        // });

        this._sliderComponent.addChild(new ChartView());
    }

}

export default IndexView;
