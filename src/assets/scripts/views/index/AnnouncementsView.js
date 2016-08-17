import DOMElement from 'structurejs/display/DOMElement';
import TemplateFactory from 'structurejs/util/TemplateFactory';

import AnnouncementsStore from '../../stores/AnnouncementsStore';
import AnnouncementsAction from '../../actions/AnnouncementsAction';

/**
 * TODO: YUIDoc_comment
 *
 * @class AnnouncementsView
 * @extends DOMElement
 * @constructor
 **/
class AnnouncementsView extends DOMElement {

    constructor($element) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        AnnouncementsAction.load();
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        AnnouncementsStore.addEventListener(AnnouncementsStore.CHANGE_EVENT, this._onStoreChange, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        AnnouncementsStore.removeEventListener(AnnouncementsStore.CHANGE_EVENT, this._onStoreChange, this);

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        const announcements = AnnouncementsStore.getAll();

        const weekItems = [];
        const today = moment().day();
        const monday = 1;
        const friday = 5;

        for (let i = monday; i <= friday; i++) {
            const weekday = moment().weekday(i);
            const weekDayName = weekday.format('dddd');
            const monthName = weekday.format('MMM');
            const date = weekday.format('D');

            const dayItems = announcements.filter((model) => model.getDayOfWeek() === i);

            const viewModel = {
                title: `${weekDayName}, ${monthName} ${date}`,
                isToday: today === i,
                calendarItems: dayItems
            };

            weekItems.push(viewModel);
        }

        const html = TemplateFactory.create('templates/jst/index/announcementsview/WeekItems', weekItems);
        this.$element.html(html);
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

    //--------------------------------------------------------------------------------
    // EVENT HANDLERS
    //--------------------------------------------------------------------------------

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onStoreChange
     * @protected
     */
    _onStoreChange(event) {
        this.layout();
    }

}

export default AnnouncementsView;
