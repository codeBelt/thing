import EventDispatcher from 'structurejs/event/EventDispatcher';

import DatabaseService from './DatabaseService';
import BeerModel from '../models/BeerModel';

/**
 * TODO: YUIDoc_comment
 *
 * @class BeerService
 * @constructor
 **/
class BeerService extends EventDispatcher {

    CHANGE = 'change';

    /**
     * A reference to the Firebase instance.
     *
     * @property _firebase
     * @type {lf.Database}
     * @protected
     */
    _firebase = null;

    constructor() {
        super();

        DatabaseService
            .getDatabase()
            .then((data) => {
                this._firebase = data.firebase;

                this.enable();
            });
    }

    /**
     * @overridden BaseModal.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        this._firebase.on('value', this._onFirebaseChange, this);

        super.enable();
    }

    /**
     * @overridden BaseModal.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        this._firebase.off('value', this._onFirebaseChange, this);

        super.disable();
    }

    //--------------------------------------------------------------------------------
    // HELPER METHOD
    //--------------------------------------------------------------------------------

    /**
     * TODO: YUIDoc_comment
     *
     * @method add
     * @param beerModel {BeerModel}
     * @return Promise<BeerModel>
     * @public
     */
    async add(beerModel) {
        return DatabaseService
            .getDatabase()
            .then((data) => {

                const db = data.db;
                const table = db.getSchema().table('Beer');
                const row = table.createRow(beerModel.toJSON());

                return db
                    .insert()
                    .into(table)
                    .values([row])
                    .exec()
                    .then((dataList) => {
                        return new BeerModel(dataList[0]);
                    });

            });
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method update
     * @param beerModel {BeerModel}
     * @public
     */
    async update(beerModel) {
        return DatabaseService
            .getDatabase()
            .then((data) => {

                const db = data.db;
                const table = db.getSchema().table('Beer');
                const row = table.createRow(beerModel.toJSON());

                return db
                    .insertOrReplace()
                    .into(table)
                    .values([row])
                    .exec();

            });
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method delete
     * @param beerId {number}
     * @public
     */
    async delete(beerId) {
        return DatabaseService
            .getDatabase()
            .then((data) => {

                const db = data.db;
                const table = db.getSchema().table('Beer');

                return db
                    .delete()
                    .from(table)
                    .where(table.beerId.eq(beerId))
                    .exec();

            });
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method getAllBeerModels
     * @public
     */
    async getAllBeerModels() {
        return DatabaseService
            .getDatabase()
            .then((data) => {

                const db = data.db;
                const table = db.getSchema().table('Beer');

                return db
                    .select()
                    .from(table)
                    .exec()
                    .then((datalist) => {
                        const beerModels = datalist.map((item) => {
                            return new BeerModel(item);
                        });

                        return beerModels;
                    });

            });
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onFirebaseChange
     * @protected
     */
    _onFirebaseChange(snapshot) {
        // const data = snapshot.val();
        // console.log("_onFirebaseChange", data);

        this.dispatchEvent(this.CHANGE);
    }

}

export default new BeerService();
