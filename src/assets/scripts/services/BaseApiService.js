/**
 * A base Class that handles ajax requests.
 *
 * @class BaseApiService
 * @extends Map
 * @constructor
 **/
class BaseApiService extends Map {

    constructor() { // eslint-disable-line no-useless-constructor
        super();
    }

    /**
     * Method to make ajax request.
     *
     * @method getRequest
     * @param {string} endpoint
     * @param {any} [obj=null]
     * @return {Promise<any>}
     * @public
     */
    async getRequest(endpoint, obj = null) {
        const options = Object.assign({}, obj, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const response = await this._fetch(endpoint, options);

        return await response.json();
    }

    /**
     * Method to make ajax request.
     *
     * @method postRequest
     * @param {string} endpoint
     * @param {any} [obj=null]
     * @return {Promise<any>}
     * @public
     */
    async postRequest(endpoint, obj = {}) {
        const response = await this._fetch(endpoint, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        });

        return await response.json();
    }

    /**
     * Method to make ajax request.
     *
     * @method putRequest
     * @param {string} endpoint
     * @param {any} [obj=null]
     * @return {Promise<any>}
     * @public
     */
    async putRequest(endpoint, obj = {}) {
        const response = await this._fetch(endpoint, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        });

        return await response.json();
    }

    /**
     * Method to make ajax request.
     *
     * @method patchRequest
     * @param {string} endpoint
     * @param {any} [obj=null]
     * @return {Promise<any>}
     * @public
     */
    async patchRequest(endpoint, obj = {}) {
        const response = await this._fetch(endpoint, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        });

        return await response.json();
    }

    /**
     * Method to make ajax request.
     *
     * @method patchFormDataRequest
     * @param {string} endpoint
     * @param {any} formData
     * @return {Promise<any>}
     * @public
     */
    async patchFormDataRequest(endpoint, formData) {
        const response = await this._fetch(endpoint, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        });

        return await response.json();
    }

    /**
     * Method to make ajax request.
     *
     * @method deleteRequest
     * @param {string} endpoint
     * @param {any} [obj=null]
     * @return {Promise<any>}
     * @public
     */
    async deleteRequest(endpoint, obj = {}) {
        const options = Object.assign({}, obj, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const response = await this._fetch(endpoint, options);

        return await response.json();
    }

    /**
     * @method _fetch
     * @param {string} endpoint
     * @param {any} options
     * @protected
     * @returns {void}
     */
    async _fetch(endpoint, options = {}) {
        try {
            // Using fetch - https://github.com/github/fetch
            const response = await fetch(endpoint, options);
            return response;
        } catch (error) { console.error(error.stack); }
    }

}

export default BaseApiService;
