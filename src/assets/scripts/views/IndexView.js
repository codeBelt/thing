import DOMElement from 'structurejs/display/DOMElement';
import Timer from 'structurejs/util/Timer';
import TimerEvent from 'structurejs/event/TimerEvent';

import BeerView from './index/BeerView';
import AnnouncementsView from './index/AnnouncementsView';
import AnimationFactory from '../utils/AnimationFactory';
import AnnouncementsAction from '../actions/AnnouncementsAction';

/**
 * TODO: YUIDoc_comment
 *
 * @class IndexView
 * @extends DOMElement
 * @constructor
 **/
class IndexView extends DOMElement {

    /**
     * TODO: YUIDoc_comment
     *
     * @property TOTAL_ANIMATIONS
     * @type {number}
     * @private
     */
    TOTAL_ANIMATIONS = 67;

    /**
     * @property _timer
     * @type {Timer}
     * @protected
     */
    _timer = null;

    /**
     * @property _views
     * @type {Array<DOMElement>}
     * @protected
     */
    _views = [];

    /**
     * TODO: YUIDoc_comment
     *
     * @property _currentViewIndex
     * @type {int}
     * @protected
     */
    _currentViewIndex = 0;


    _isAnimating = false;
    _endCurrPage = false;
    _endNextPage = false;
    _currentAnimationIndex = 1;
    _currentSlide = 0;
    _endAnimationEvent = null;
    _$currPage = null;
    _$nextPage = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _$date
     * @type {jQuery}
     * @protected
     */
    _$date = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _slideContainer
     * @type {DOMElement}
     * @protected
     */
    _slideContainer = null;

    constructor($element) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        this._endAnimationEvent = AnimationFactory.getEndAnimationEvent();

        this._$date = this.$element.find('.js-IndexView-date');
        this._$time = this.$element.find('.js-IndexView-time');

        this._slideContainer = this.getChild('.js-IndexView-slidesContainer');

        const beerView = new BeerView(this.$element.find('.js-BeerView'));
        this._slideContainer.addChild(beerView);

        const announcementsView = new AnnouncementsView(this.$element.find('.js-AnnouncementsView'));
        this._slideContainer.addChild(announcementsView);

        this._$pages = this.$element.find('.js-IndexView-slidesContainer').children();
        this._$pages.each( function() {
            var $page = $( this );
            $page.data('originalClassList', $page.attr('class'));
        } );

        this._$pages.eq(this._currentSlide).addClass('pt-page-current');



        // Timer for how often the slides should change.
        const seconds = 1000 * 15;
        this._timer = new Timer(seconds, 0);

        // Update date and time displayed
        setInterval(() => this._onDateTimeUpdate(), 1000);
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

    nextPage() {
        if(this._isAnimating === true) { return; }
        this._isAnimating = true;


        this._$currPage = this._slideContainer
            .getChildAt(this._currentSlide)
            .$element;

        this._currentSlide = (this._currentSlide === this._slideContainer.numChildren - 1) ? 0 : ++this._currentSlide;

        this._$nextPage = this._slideContainer
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

    onEndAnimation($currentPage, $nextPage) {
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
     * TODO: YUIDoc_comment
     *
     * @method _onCurrentPageAnimationEnd
     * @protected
     */
    _onCurrentPageAnimationEnd(event) {
        this._$currPage.removeEventListener(this._endAnimationEvent, this._onCurrentPageAnimationEnd, this);

        this._endCurrPage = true;

        if( this._endNextPage ) {
            this.onEndAnimation(this._$currPage, this._$nextPage);
        }
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onNextPageAnimationEnd
     * @protected
     */
    _onNextPageAnimationEnd(event) {
        this._$nextPage.removeEventListener(this._endAnimationEvent, this._onNextPageAnimationEnd, this);

        this._endNextPage = true;

        if(this._endCurrPage) {
            this.onEndAnimation(this._$currPage, this._$nextPage);
        }
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onTick
     * @protected
     */
    _onTick(event) {
        const isBeerTime = this._isBeerTime();

        if (isBeerTime === false || this._currentSlide !== 0) {
            AnnouncementsAction.load();

            this.nextPage();
        }
    }

    /**
     * TODO: YUIDoc_comment
     *
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
     * @method _isBeerTime
     * @protected
     */
    _isBeerTime() {
        const beerTimeStart = window.SETTINGS.BEER_TIME.START;
        const beerTimeEnd = window.SETTINGS.BEER_TIME.END;

        const startOfBeerTime = moment().hours(beerTimeStart.hours).minutes(beerTimeStart.minutes).seconds(0);
        const endOfBeerTime = moment().hours(beerTimeEnd.hours).minutes(beerTimeEnd.minutes).seconds(0);

        return moment().isBetween(startOfBeerTime, endOfBeerTime);
    }

}

export default IndexView;
