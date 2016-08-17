import EventDispatcher from 'structurejs/event/EventDispatcher';

import EndPoint from '../constants/EndPoint';

/**
 * TODO: YUIDoc_comment
 *
 * @class DatabaseService
 * @constructor
 **/
class DatabaseService extends EventDispatcher {

    READY = 'ready';
    CHANGE = 'change';

    /**
     * A reference to the Firebase.
     *
     * @property _firebase
     * @type {Firebase}
     * @protected
     */
    _firebase = null;

    /**
     * Google Lovefield schema builder.
     *
     * @property _schemaBuilder
     * @type {lf.schema.Builder}
     * @protected
     */
    _schemaBuilder = null;

    /**
     * A reference to the database.
     *
     * @property _db
     * @type {lf.Database}
     * @protected
     */
    _db = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _databasePromise
     * @type {Promise<lf.Database>}
     * @protected
     */
    _databasePromise = null;

    constructor() {
        super();

        this._firebase = new Firebase(EndPoint.BEER);

        const schemaBuilder = lf.schema.create('NerderyBeer', 1);

        schemaBuilder
            .createTable('Beer')
            .addColumn('beerId',                lf.Type.INTEGER)
            .addColumn('company',               lf.Type.STRING)
            .addColumn('name',                  lf.Type.STRING)
            .addColumn('description',           lf.Type.STRING)
            .addColumn('imagePath',             lf.Type.STRING)
            .addColumn('isTapEmpty',            lf.Type.BOOLEAN)
            .addColumn('isActive',              lf.Type.BOOLEAN)
            .addColumn('tapOrder',              lf.Type.INTEGER)
            .addColumn('abv',                   lf.Type.NUMBER)
            .addPrimaryKey(['beerId'], true);

        schemaBuilder
            .createTable('User')
            .addColumn('userId',                lf.Type.INTEGER)
            .addColumn('name',                  lf.Type.STRING)
            .addColumn('email',                 lf.Type.STRING)
            .addColumn('uid',                   lf.Type.STRING)
            .addPrimaryKey(['userId'], true);

        // schemaBuilder
        //     .createTable('Keg')
        //     .addColumn('kegId',                 lf.Type.INTEGER)
        //     .addColumn('volume',                lf.Type.INTEGER)
        //     .addColumn('currentVolume',         lf.Type.INTEGER);

        // schemaBuilder
        //     .createTable('UserRole')
        //     .addColumn('userRoleId',                lf.Type.INTEGER)
        //     .addColumn('name',                  lf.Type.STRING)
        //     .addColumn('description',           lf.Type.STRING)
        //     .addColumn('value',                  lf.Type.INTEGER)
        //     .addPrimaryKey(['userId'], true);

        // https:// www.npmjs.com/package/acl-firebase
        // https:// www.npmjs.com/package/connect-roles
        // https:// www.npmjs.com/package/express-roles
        // https:// www.npmjs.com/package/authorizator
        // https:// scotch.io/quick-tips/route-middleware-to-check-if-a-user-is-authenticated-in-node-js
        // https:// gist.github.com/sararob/331760829a9dcb4be3e7
        // https:// www.airpair.com/firebase/posts/yatodo-guide
        // https:// github.com/ajlopez/SimplePermissions
        // https:// www.npmjs.com/package/acl
        // https:// parse.com/docs/js/api/classes/Parse.ACL.html
        /*
        superAdmin    // Developer
        admin           // Manage everything
        manager         // Manage most aspects of the site
        editor          // Scheduling and managing content
        author          // Write important content
        contributors    // Authors with limited rights
        moderator       // Moderate user content
        member          // Special user access
        subscriber      // Paying Average Joe
        user            // Average Joe
        */

        // https://www.firebase.com/docs/security/guide/indexing-data.html

        const connectOptions = {
            storeType: lf.schema.DataStoreType.FIREBASE,
            firebase: this._firebase,
            onUpgrade: (rawDb) => this._onUpgrade(rawDb)
        };

        this._databasePromise = new Promise((resolve, reject) => {
            schemaBuilder
                .connect(connectOptions)
                .then((db) => {
                    this._db = db;

                    resolve({
                        db: this._db,
                        firebase: this._firebase
                    });

                    this.dispatchEvent(this.READY, this._firebase);
                });
        });

        // WHERE do I put this?
        const $error = $('.js-error');

        this._firebase.child('.info/connected').on('value', (connectedSnap) => {
          if (connectedSnap.val() === true) {
            $error.removeClass('isActive');
          } else {
            $error.addClass('isActive');
          }
        });
    }

    //--------------------------------------------------------------------------------
    // HELPER METHOD
    //--------------------------------------------------------------------------------

    /**
     * Return the database instance to other services can use it.
     *
     * @method getDatabase
     * @return {Promise<lf.Database>}
     * @public
     */
    getDatabase() {
        return this._databasePromise;
    }

    //--------------------------------------------------------------------------------
    // UPGRADE
    //--------------------------------------------------------------------------------

    /**
     * Helper method to update the database schema when something has changed.
     *
     * @method _onUpgrade
     * @param rawDb {lf.raw.BackStore}
     * @protected
     */
    _onUpgrade(rawDb) {
        const databaseVersion = rawDb.getVersion();
        // https://github.com/google/lovefield/blob/master/docs/spec/03_life_of_db.md

        console.log('databaseVersion', databaseVersion);

        let promises = [];

        // //  Add column agent (type string) to Purchase with default value 'Smith'.
        // const p1 = rawDb.addTableColumn('Product', 'video', '');
        //
        //  Delete column metadata from Photo.
        // const p1 = rawDb.dropTableColumn('Product', 'video');
        //
        // //  Rename Photo.isLocal to Photo.local.
        // const p3 = rawDb.renameTableColumn('Photo', 'isLocal', 'local');
        //
        // //  Transformations are not supported because of IndexedDB auto-commit: Firefox
        // //  immediately commits the transaction when Lovefield tries to return a
        // //  promise from scanning existing object stores. Users are supposed to do a
        // //  dump and make the transformation outside of onUpgrade routine.
        //
        // //  DUMP the whole DB into a JS object.
        // const p4 = rawDb.dump();

        return Promise.all(promises);
    }

}

export default new DatabaseService();
