import BaseModel from 'structurejs/model/BaseModel';

/**
 * TODO: YUIDoc_comment
 *
 * @class AnnouncementModel
 * @extends BaseModel
 * @constructor
 **/
class AnnouncementModel extends BaseModel {

    /**
     * @property summary
     * @type {string}
     * @public
     */
    summary = null;

    /**
     * @property description
     * @type {string}
     * @public
     */
    description = null;

    /**
     * @property dateTimeStart
     * @type {string}
     * @public
     */
    dateTimeStart = null;

    /**
     * @property dateTimeEnd
     * @type {string}
     * @public
     */
    dateTimeEnd = null;

    /**
     * @property date
     * @type {string}
     * @public
     */
    date = null;

    /**
     * @property displayTime
     * @type {string}
     * @protected
     */
    displayTime = null;

    constructor(data) {
        super();

        if (data) {
            this.update(data);
        }
    }

    /**
     * @overridden BaseModel.update
     */
    update(data) {
        super.update(data);

        // Override any values after the default super update method has set the values.

        this.displayTime = this.getDisplayTime();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method getDayOfWeek
     * @public
     */
    getDayOfWeek() {
        const date = this.dateTimeStart || this.date;

        return moment(date).day();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method getDisplayTime
     * @public
     */
    getDisplayTime() {
        if (this.date) {
            return 'All Day';
        } else {
            const start = moment(this.dateTimeStart).format('h:mma');
            const end = moment(this.dateTimeEnd).format('h:mma');

            return `${start} - ${end}`
        }
    }

}

export default AnnouncementModel;
