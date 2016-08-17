import EventDispatcher from 'structurejs/event/EventDispatcher';
import Util from 'structurejs/util/Util';

import DatabaseService from './DatabaseService';
import UserModel from '../models/UserModel';

/**
 * TODO: YUIDoc_comment
 *
 * @class AdminService
 * @constructor
 **/
class AdminService extends EventDispatcher {

    CHANGE = 'change';

    /**
     * A reference to the Firebase instance.
     *
     * @property _firebase
     * @type {Firebase}
     * @protected
     */
    _firebase = null;

    _currentLoggedInUser = null;

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

        this._firebase.onAuth(this._onAuthChange, this);

        super.enable();
    }

    /**
     * @overridden BaseModal.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        this._firebase.offAuth(this._onAuthChange, this);

        super.disable();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method login
     * @public
     */
    login(email, password) {
        this._firebase.authWithPassword({
            email: email,
            password: password
        }, (error, authData) => {
            if (error) {
                console.log('Login Failed!');
            }
        });
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method logout
     * @public
     */
    logout() {
        this._firebase.unauth();

        this._currentLoggedInUser = null;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method createUser
     * @public
     */
    createUser(userModel) {
        return new Promise((resolve, reject) => {

            this._firebase.createUser({
                email: userModel.email,
                password: userModel.password
            }, (error, userData) => {
                if (error) {
                    switch (error.code) {
                        case 'EMAIL_TAKEN':
                            console.log('The new user account cannot be created because the email is already in use.');
                            break;
                        case 'INVALID_EMAIL':
                            console.log('The specified email is not a valid email.');
                            break;
                        default:
                            console.log('Error creating user:', error);
                    }
                } else {
                    const model = new UserModel(userModel);
                    model.update(userData);

                    this
                        ._addUser(model)
                        .then((updatedUserModel) => {
                            resolve(updatedUserModel);
                        });
                }
            });

        });
    }


    /**
     * TODO: YUIDoc_comment
     *
     * @method resetPassword
     * @public
     */
    resetPassword(email) {
        return new Promise((resolve, reject) => {

            this._firebase.resetPassword({
                email: email
            }, (error) => {
                if (error) {
                    switch (error.code) {
                        case 'INVALID_USER':
                            console.log('The specified user account does not exist.');
                            break;
                        default:
                            console.log('Error resetting password:', error);
                    }
                    reject(error);
                } else {
                    console.log('Password reset email sent successfully!');
                    resolve();
                }
            });

        });
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method getAllUsers
     * @public
     */
    getAllUsers() {
        return DatabaseService
            .getDatabase()
            .then((data) => {

                const db = data.db;
                const table = db.getSchema().table('User');

                return db
                    .select()
                    .from(table)
                    .exec()
                    .then((datalist) => {
                        const userModels = datalist.map((item) => {
                            return new UserModel(item);
                        });

                        return userModels;
                    });
            });
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method isLoggedIn
     * @public
     */
    isLoggedIn() {
        return this._currentLoggedInUser != null;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method getLoggedInUser
     * @public
     */
    getLoggedInUser() {
        return this._currentLoggedInUser;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method updateUser
     * @param userModel {UserModel}
     * @public
     */
    updateUser(userModel) {
        return DatabaseService
            .getDatabase()
            .then((data) => {

                const db = data.db;
                const table = db.getSchema().table('User');
                const row = table.createRow(userModel.toJSON());

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
     * @param userId {number}
     * @public
     */
    delete(userId) {
        return DatabaseService
            .getDatabase()
            .then((data) => {

                // TODO: https://www.firebase.com/docs/web/api/firebase/removeuser.html
                const db = data.db;
                const table = db.getSchema().table('User');

                return db
                    .delete()
                    .from(table)
                    .where(table.userId.eq(userId))
                    .exec();

            });
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _addUser
     * @return Promise<UserModel>
     * @protected
     */
    _addUser(userModel) {
        return DatabaseService
            .getDatabase()
            .then((data) => {

                const db = data.db;
                const table = db.getSchema().table('User');
                const model = userModel.toJSON();

                Util.deletePropertyFromObject(model, ['id', 'password']);

                const row = table.createRow(model);

                return db
                    .insert()
                    .into(table)
                    .values([row])
                    .exec()
                    .then((dataList) => {
                        return new UserModel(dataList[0]);
                    });

            });
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onAuthChange
     * @param authData
     * @public
     */
    _onAuthChange(authData) {
        if (authData) {

            DatabaseService
                .getDatabase()
                .then((data) => {

                    const db = data.db;
                    const table = db.getSchema().table('User');

                    return db
                        .select()
                        .from(table)
                        .where(table.uid.eq(authData.uid))
                        .exec()
                        .then((datalist) => {
                            this._currentLoggedInUser = new UserModel(datalist[0]);

                            this.dispatchEvent(this.CHANGE);
                        });

                });

        } else {
            this._currentLoggedInUser = null;

            this.dispatchEvent(this.CHANGE);
        }
    }

}

export default new AdminService();
