angular.module('mainApp')
.factory('formValidationService', function ($http, $window, url) {

  function ApiFormValidationService() {
    return {
      errors: errors,
      reset: reset,
      setInvalid: setInvalid,
      setValid: setValid
    };
   }

    function errors (form, reason) {
      var data = reason.data;

      if (!form.$api) {
        reset(form);
      }

      // no data returned, fallback to system error
      if (!data) {
        form.$api.$error['systemError'] = true;
        setInvalid(form);
        return;
      }
      else {

        // this is general error not connected to any field
        if (data.code) {
          form.$api.$error[data.code] = true;
          setInvalid(form);
        }

        angular.forEach(data.fieldErrors, applyError.bind(null, form));
      }
    }


    function applyError (form, error) {
      var code = error.code,
        field = error.field,
        api;

      if (!form.$api) {
        reset(form);
      }

      api = form.$api;

      // field does is not able to handle API errors
      if (!form[field] || !form[field].$registerApiError) {
        if (!api.$error[code]) {
          api.$error[code] = [];
        }

        api.$error[code].push(field);
        setInvalid(form);
      }
      // field exists and is able to handle API errors
      else {
        form[field].$registerApiError(code);
      }
    }


    function reset (form){
      form.$api = {
        $error: {},
        $invalid: false,
        $valid: true
      };
    }


    function setInvalid (form){
      if (!form.$api){
        reset(form);
      }

      form.$api.$invalid = true;
      form.$api.$valid = false;
    }


    function setValid (form){
      if (!form.$api){
        reset(form);
      }

      form.$api.$invalid = false;
      form.$api.$valid = true;
    }
});
