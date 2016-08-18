import StringUtil from 'structurejs/util/StringUtil';

import Handlebars from 'Handlebars';

/**
 * Hamburger helpers, makes a great meal
 *
 * @class HandlebarsHelpers
 * @constructor
 **/
class HandlebarsHelpers {

    constructor() { // eslint-disable-line no-useless-constructor
    }

    static init() {
        /**
         * Outputs raw json
         *
         * @param object {any}
         * @return Handlebars
         */
        Handlebars.registerHelper('toJSON', JSON.stringify);

        /**
         * Removes spaces and sets string to lowercase
         *
         * @param object {any}
         * @return Handlebars
         */
        Handlebars.registerHelper('lowerCaseAndConcat', object => {
            return new Handlebars.SafeString(object.replace(/\s+/g, '').toLowerCase());
        });

        /**
         * Removes spaces and sets string to lowercase
         *
         * @param object {any}
         * @return Handlebars
         */
        Handlebars.registerHelper('truncate', string => {
            return new Handlebars.SafeString(StringUtil.truncate(string, 100, '&hellip;'));
        });

        /**
         * Outputs the data context
         *
         * @param optionalValue {any}
         */
        Handlebars.registerHelper('debug', optionalValue => {
            console.log('////////////');
            console.log(this);
            console.log('////////////');

            if (optionalValue) {
                console.log('++++++++++++++');
                console.log('optionalValue: ', optionalValue);
                console.log('++++++++++++++');
            }
        });
    }

}

export default HandlebarsHelpers;
