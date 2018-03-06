var has = require('lodash.has');
const BASE_URL = ecommerceConfig.site_url + '/' + ecommerceConfig.api_prefix + '/';
const SERVER_ERROR_MESSAGE = "We could not access the server at this time. Please try again. If the issue persists, please open a support ticket.";
const SERVER_UNAUTH_MESSAGE = "We could not complete the request, because you are not authorised to do so.";



export default {

  get(data)
  {
      if(!has(data, 'params')) {
          data.params = {};
      }

      if(!has(data, 'url') || has(data, 'url') && !data.url) {
          data.url = BASE_URL + data.path;
      }

      data.params.limit = has(data, 'params.limit') ? data.params.limit : 15;
      data.params.ascending = has(data, 'params.ascending') ? data.params.ascending : 0;
      data.params.orderBy = has(data, 'params.orderBy') ? data.params.orderBy : 'id';

      console.log('API Get: ' + data.url);

      return new Promise(function(resolve, reject) {
          axios.get(data.url, { params: data.params })
              .then(function (response) {
                  resolve(response.data);
              }.bind(this))
              .catch(function (error) {
                  reject(this.errorAdapter(error));
              }.bind(this));
      }.bind(this));
  },

  /**
   * Delete data on the server.
   *
   * @param Object data
   *
   * @return Promise | resolve() or reject()
   */
  delete(data)
  {
      if(!has(data, 'url') || has(data, 'url') && !data.url) {
        data.url = BASE_URL + data.path;
      }

      console.log('API Delete: ' + data.url);

      return new Promise(function(resolve, reject) {
          axios.delete(data.url, has(data, 'params') ? {params: data.params} : '')
              .then(function (response) {
                  resolve(response.data);
              }.bind(this))
              .catch(function (error) {
                  reject(this.errorAdapter(error));
              }.bind(this));
      }.bind(this));
  },


  /**
   * Persist data to the server using the method supplied.
   *
   * @param String method
   * @param Object data
   *
   * @return Promise | resolve() or reject()
   */
  persist(method, data)
  {
      if(!has(data, 'params')) {
          data.params = {};
      }

      if(!has(data, 'url') || has(data, 'url') && !data.url) {
          data.url = BASE_URL + data.path;
      }

      console.log('API ' + method + ': ' + data.url);

      return new Promise(function(resolve, reject) {
          axios[method](data.url, data.object, data.params)
              .then(function (response) {
                  resolve(response.data);
              }.bind(this))
              .catch(function (error) {
                  reject(this.errorAdapter(error));
              }.bind(this));
      }.bind(this));
  },

  /**
   * Turn the response from the server into something we can work with.
   *
   * @param Object error
   *
   * @return Object
   */
  errorAdapter(error)
  {
      error = has(error, 'response.status') ? error.response : error;
      var data = has(error, 'data') ? error.data : error.message;

      console.error('API Error:');
      console.log(error);
      console.error('API Error Data');
      console.log(data);

      return error ? (
          (typeof data === 'object' && error.status === 422) ?
          data :
          (error.status === 403) ?
          {
              message: SERVER_UNAUTH_MESSAGE,
              code: error.status
          } :
          {
              message: SERVER_ERROR_MESSAGE,
              errors: {
                  'server': ['Please use this error code in any suppot queries. Error Code: ' + error.status],
              },
              code: error.status
          }
      ) : {
              message: SERVER_ERROR_MESSAGE,
              errors: {
                  'server': error.message
              },
              code: error.status
          }
  },




}
