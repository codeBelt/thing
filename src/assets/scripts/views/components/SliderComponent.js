import DOMElement from 'structurejs/display/DOMElement';
import Timer from 'structurejs/util/Timer';
import TimerEvent from 'structurejs/event/TimerEvent';

import AnimationFactory from '../../utils/AnimationFactory';

/**
 * @class SliderComponent
 * @extends DOMElement
 * @constructor
 **/
class SliderComponent extends DOMElement {

    /**
     * @property TOTAL_ANIMATIONS
     * @type {number}
     * @private
     */
    TOTAL_ANIMATIONS = 67;

    _isAnimating = false;
    _endCurrPage = false;
    _endNextPage = false;
    _currentAnimationIndex = 1;
    _currentSlide = 0;
    _endAnimationEvent = null;
    _$currPage = null;
    _$nextPage = null;
    // _$pages = null;

    constructor($element) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        this._endAnimationEvent = AnimationFactory.getEndAnimationEvent();

        const seconds = 1000 * 2;
        this._timer = new Timer(seconds, 0);
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        this._timer.addEventListener(TimerEvent.TIMER, this._onTick, this);
        this._timer.start();

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        this._timer.removeEventListener(TimerEvent.TIMER, this._onTick, this);
        this._timer.stop();

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
    }

    /**
     * @overridden DOMElement.destroy
     */
    destroy() {
        this.disable();

        // Call destroy on any child objects.
        // This super method will also null out your properties for garbage collection.

        super.destroy();
    }

    /**
     * @overridden DOMElement.addChild
     */
    addChild(child) {
        super.addChild(child);

        child.$element.data('originalClassList', child.$element.attr('class'));

        const $currentPage = this.$element.find('.pt-page-current');
        if ($currentPage.length === 0) {
            this
                .$element
                .children()
                .eq(this._currentSlide)
                .addClass('pt-page-current');
        }
    }

    //--------------------------------------------------------------------------------
    // HELPER METHOD
    //--------------------------------------------------------------------------------

    /**
     * @method nextPage
     * @public
     */
    nextPage() {
        if(this._isAnimating === true) { return; }
        this._isAnimating = true;

        this._$currPage = this
            .getChildAt(this._currentSlide)
            .$element;

        this._currentSlide = (this._currentSlide === this.numChildren - 1) ? 0 : ++this._currentSlide;

        this._$nextPage = this
            .getChildAt(this._currentSlide)
            .$element
            .addClass('pt-page-current');


        this._currentAnimationIndex = (this._currentAnimationIndex === this.TOTAL_ANIMATIONS) ? 1 : ++this._currentAnimationIndex;
        const animationData = AnimationFactory.getAnimation(this._currentAnimationIndex);

        this._$currPage
            .addClass(animationData.outClass)
            .addEventListener(this._endAnimationEvent, this._onCurrentPageAnimationEnd, this);

        this._$nextPage
            .addClass( animationData.inClass )
            .addEventListener(this._endAnimationEvent, this._onNextPageAnimationEnd, this);
    }

    /**
     * @method _onEndAnimation
     * @protected
     */
    _onEndAnimation($currentPage, $nextPage) {
        this._endCurrPage = false;
        this._endNextPage = false;

        $currentPage.attr('class', $currentPage.data( 'originalClassList' ));
        $nextPage.attr('class', $nextPage.data( 'originalClassList' ) + ' pt-page-current');

        this._isAnimating = false;
    }

    //--------------------------------------------------------------------------------
    // EVENT HANDLERS
    //--------------------------------------------------------------------------------

    /**
     * @method _onCurrentPageAnimationEnd
     * @protected
     */
    _onCurrentPageAnimationEnd(event) {
        this._$currPage.removeEventListener(this._endAnimationEvent, this._onCurrentPageAnimationEnd, this);

        this._endCurrPage = true;

        if( this._endNextPage ) {
            this._onEndAnimation(this._$currPage, this._$nextPage);
        }
    }

    /**
     * @method _onNextPageAnimationEnd
     * @protected
     */
    _onNextPageAnimationEnd(event) {
        this._$nextPage.removeEventListener(this._endAnimationEvent, this._onNextPageAnimationEnd, this);

        this._endNextPage = true;

        if(this._endCurrPage) {
            this._onEndAnimation(this._$currPage, this._$nextPage);
        }
    }

    /**
     * @method _onTick
     * @protected
     */
    _onTick(event) {
        if (this.numChildren > 1) {
            this.nextPage();
        }
    }

}

export default SliderComponent;
