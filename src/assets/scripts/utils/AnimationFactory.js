/**
 * @class AnimationFactory
 * @constructor
 **/
class AnimationFactory {

    static getEndAnimationEvent() {
        const animEndEventNames = {
            'WebkitAnimation' : 'webkitAnimationEnd',
            'OAnimation' : 'oAnimationEnd',
            'msAnimation' : 'MSAnimationEnd',
            'animation' : 'animationend'
        };

        return animEndEventNames[Modernizr.prefixed('animation')];
    }

    static getAnimation(num) {

        switch (num) {
            case 1:
                return {
                    outClass: 'pt-page-moveToLeft',
                    inClass: 'pt-page-moveFromRight',
                };
                break;
            case 2:
                return {
                    outClass: 'pt-page-moveToRight',
                    inClass: 'pt-page-moveFromLeft',
                };
                break;
            case 3:
                return {
                    outClass: 'pt-page-moveToTop',
                    inClass: 'pt-page-moveFromBottom',
                };
                break;
            case 4:
                return {
                    outClass: 'pt-page-moveToBottom',
                    inClass: 'pt-page-moveFromTop',
                };
                break;
            case 5:
                return {
                    outClass: 'pt-page-fade',
                    inClass: 'pt-page-moveFromRight pt-page-ontop',
                };
                break;
            case 6:
                return {
                    outClass: 'pt-page-fade',
                    inClass: 'pt-page-moveFromLeft pt-page-ontop',
                };
                break;
            case 7:
                return {
                    outClass: 'pt-page-fade',
                    inClass: 'pt-page-moveFromBottom pt-page-ontop',
                };
                break;
            case 8:
                return {
                    outClass: 'pt-page-fade',
                    inClass: 'pt-page-moveFromTop pt-page-ontop',
                };
                break;
            case 9:
                return {
                    outClass: 'pt-page-moveToLeftFade',
                    inClass: 'pt-page-moveFromRightFade',
                };
                break;
            case 10:
                return {
                    outClass: 'pt-page-moveToRightFade',
                    inClass: 'pt-page-moveFromLeftFade',
                };
                break;
            case 11:
                return {
                    outClass: 'pt-page-moveToTopFade',
                    inClass: 'pt-page-moveFromBottomFade',
                };
                break;
            case 12:
                return {
                    outClass: 'pt-page-moveToBottomFade',
                    inClass: 'pt-page-moveFromTopFade',
                };
                break;
            case 13:
                return {
                    outClass: 'pt-page-moveToLeftEasing pt-page-ontop',
                    inClass: 'pt-page-moveFromRight',
                };
                break;
            case 14:
                return {
                    outClass: 'pt-page-moveToRightEasing pt-page-ontop',
                    inClass: 'pt-page-moveFromLeft',
                };
                break;
            case 15:
                return {
                    outClass: 'pt-page-moveToTopEasing pt-page-ontop',
                    inClass: 'pt-page-moveFromBottom',
                };
                break;
            case 16:
                return {
                    outClass: 'pt-page-moveToBottomEasing pt-page-ontop',
                    inClass: 'pt-page-moveFromTop',
                };
                break;
            case 17:
                return {
                    outClass: 'pt-page-scaleDown',
                    inClass: 'pt-page-moveFromRight pt-page-ontop',
                };
                break;
            case 18:
                return {
                    outClass: 'pt-page-scaleDown',
                    inClass: 'pt-page-moveFromLeft pt-page-ontop',
                };
                break;
            case 19:
                return {
                    outClass: 'pt-page-scaleDown',
                    inClass: 'pt-page-moveFromBottom pt-page-ontop',
                };
                break;
            case 20:
                return {
                    outClass: 'pt-page-scaleDown',
                    inClass: 'pt-page-moveFromTop pt-page-ontop',
                };
                break;
            case 21:
                return {
                    outClass: 'pt-page-scaleDown',
                    inClass: 'pt-page-scaleUpDown pt-page-delay300',
                };
                break;
            case 22:
                return {
                    outClass: 'pt-page-scaleDownUp',
                    inClass: 'pt-page-scaleUp pt-page-delay300',
                };
                break;
            case 23:
                return {
                    outClass: 'pt-page-moveToLeft pt-page-ontop',
                    inClass: 'pt-page-scaleUp',
                };
                break;
            case 24:
                return {
                    outClass: 'pt-page-moveToRight pt-page-ontop',
                    inClass: 'pt-page-scaleUp',
                };
                break;
            case 25:
                return {
                    outClass: 'pt-page-moveToTop pt-page-ontop',
                    inClass: 'pt-page-scaleUp',
                };
                break;
            case 26:
                return {
                    outClass: 'pt-page-moveToBottom pt-page-ontop',
                    inClass: 'pt-page-scaleUp',
                };
                break;
            case 27:
                return {
                    outClass: 'pt-page-scaleDownCenter',
                    inClass: 'pt-page-scaleUpCenter pt-page-delay400',
                };
                break;
            case 28:
                return {
                    outClass: 'pt-page-rotateRightSideFirst',
                    inClass: 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop',
                };
                break;
            case 29:
                return {
                    outClass: 'pt-page-rotateLeftSideFirst',
                    inClass: 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop',
                };
                break;
            case 30:
                return {
                    outClass: 'pt-page-rotateTopSideFirst',
                    inClass: 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop',
                };
                break;
            case 31:
                return {
                    outClass: 'pt-page-rotateBottomSideFirst',
                    inClass: 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop',
                };
                break;
            case 32:
                return {
                    outClass: 'pt-page-flipOutRight',
                    inClass: 'pt-page-flipInLeft pt-page-delay500',
                };
                break;
            case 33:
                return {
                    outClass: 'pt-page-flipOutLeft',
                    inClass: 'pt-page-flipInRight pt-page-delay500',
                };
                break;
            case 34:
                return {
                    outClass: 'pt-page-flipOutTop',
                    inClass: 'pt-page-flipInBottom pt-page-delay500',
                };
                break;
            case 35:
                return {
                    outClass: 'pt-page-flipOutBottom',
                    inClass: 'pt-page-flipInTop pt-page-delay500',
                };
                break;
            case 36:
                return {
                    outClass: 'pt-page-rotateFall pt-page-ontop',
                    inClass: 'pt-page-scaleUp',
                };
                break;
            case 37:
                return {
                    outClass: 'pt-page-rotateOutNewspaper',
                    inClass: 'pt-page-rotateInNewspaper pt-page-delay500',
                };
                break;
            case 38:
                return {
                    outClass: 'pt-page-rotatePushLeft',
                    inClass: 'pt-page-moveFromRight',
                };
                break;
            case 39:
                return {
                    outClass: 'pt-page-rotatePushRight',
                    inClass: 'pt-page-moveFromLeft',
                };
                break;
            case 40:
                return {
                    outClass: 'pt-page-rotatePushTop',
                    inClass: 'pt-page-moveFromBottom',
                };
                break;
            case 41:
                return {
                    outClass: 'pt-page-rotatePushBottom',
                    inClass: 'pt-page-moveFromTop',
                };
                break;
            case 42:
                return {
                    outClass: 'pt-page-rotatePushLeft',
                    inClass: 'pt-page-rotatePullRight pt-page-delay180',
                };
                break;
            case 43:
                return {
                    outClass: 'pt-page-rotatePushRight',
                    inClass: 'pt-page-rotatePullLeft pt-page-delay180',
                };
                break;
            case 44:
                return {
                    outClass: 'pt-page-rotatePushTop',
                    inClass: 'pt-page-rotatePullBottom pt-page-delay180',
                };
                break;
            case 45:
                return {
                    outClass: 'pt-page-rotatePushBottom',
                    inClass: 'pt-page-rotatePullTop pt-page-delay180',
                };
                break;
            case 46:
                return {
                    outClass: 'pt-page-rotateFoldLeft',
                    inClass: 'pt-page-moveFromRightFade',
                };
                break;
            case 47:
                return {
                    outClass: 'pt-page-rotateFoldRight',
                    inClass: 'pt-page-moveFromLeftFade',
                };
                break;
            case 48:
                return {
                    outClass: 'pt-page-rotateFoldTop',
                    inClass: 'pt-page-moveFromBottomFade',
                };
                break;
            case 49:
                return {
                    outClass: 'pt-page-rotateFoldBottom',
                    inClass: 'pt-page-moveFromTopFade',
                };
                break;
            case 50:
                return {
                    outClass: 'pt-page-moveToRightFade',
                    inClass: 'pt-page-rotateUnfoldLeft',
                };
                break;
            case 51:
                return {
                    outClass: 'pt-page-moveToLeftFade',
                    inClass: 'pt-page-rotateUnfoldRight',
                };
                break;
            case 52:
                return {
                    outClass: 'pt-page-moveToBottomFade',
                    inClass: 'pt-page-rotateUnfoldTop',
                };
                break;
            case 53:
                return {
                    outClass: 'pt-page-moveToTopFade',
                    inClass: 'pt-page-rotateUnfoldBottom',
                };
                break;
            case 54:
                return {
                    outClass: 'pt-page-rotateRoomLeftOut pt-page-ontop',
                    inClass: 'pt-page-rotateRoomLeftIn',
                };
                break;
            case 55:
                return {
                    outClass: 'pt-page-rotateRoomRightOut pt-page-ontop',
                    inClass: 'pt-page-rotateRoomRightIn',
                };
                break;
            case 56:
                return {
                    outClass: 'pt-page-rotateRoomTopOut pt-page-ontop',
                    inClass: 'pt-page-rotateRoomTopIn',
                };
                break;
            case 57:
                return {
                    outClass: 'pt-page-rotateRoomBottomOut pt-page-ontop',
                    inClass: 'pt-page-rotateRoomBottomIn',
                };
                break;
            case 58:
                return {
                    outClass: 'pt-page-rotateCubeLeftOut pt-page-ontop',
                    inClass: 'pt-page-rotateCubeLeftIn',
                };
                break;
            case 59:
                return {
                    outClass: 'pt-page-rotateCubeRightOut pt-page-ontop',
                    inClass: 'pt-page-rotateCubeRightIn',
                };
                break;
            case 60:
                return {
                    outClass: 'pt-page-rotateCubeTopOut pt-page-ontop',
                    inClass: 'pt-page-rotateCubeTopIn',
                };
                break;
            case 61:
                return {
                    outClass: 'pt-page-rotateCubeBottomOut pt-page-ontop',
                    inClass: 'pt-page-rotateCubeBottomIn',
                };
                break;
            case 62:
                return {
                    outClass: 'pt-page-rotateCarouselLeftOut pt-page-ontop',
                    inClass: 'pt-page-rotateCarouselLeftIn',
                };
                break;
            case 63:
                return {
                    outClass: 'pt-page-rotateCarouselRightOut pt-page-ontop',
                    inClass: 'pt-page-rotateCarouselRightIn',
                };
                break;
            case 64:
                return {
                    outClass: 'pt-page-rotateCarouselTopOut pt-page-ontop',
                    inClass: 'pt-page-rotateCarouselTopIn',
                };
                break;
            case 65:
                return {
                    outClass: 'pt-page-rotateCarouselBottomOut pt-page-ontop',
                    inClass: 'pt-page-rotateCarouselBottomIn',
                };
                break;
            case 66:
                return {
                    outClass: 'pt-page-rotateSidesOut',
                    inClass: 'pt-page-rotateSidesIn pt-page-delay200',
                };
                break;
            case 67:
                return {
                    outClass: 'pt-page-rotateSlideOut',
                    inClass: 'pt-page-rotateSlideIn',
                };
                break;
        }

    }

}

export default AnimationFactory;
