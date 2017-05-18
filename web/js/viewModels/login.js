/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery',
    'ojs/ojinputtext'],
 function(oj, ko, $) {
  
    function LoginViewModel(params) {

      var self = this;

      self.router = oj.Router.rootInstance;

      self.rootData = params;

      self.api = params.api;
      self.error = params.api.error;

      self.error.subscribe(function(newValue) {
        if (newValue === false) {
          $('#login-form').removeClass('face');
        } else {
          $('#login-form').addClass('face');
        }
      });

      self.user = params.user;
      self.languages = params.languages;
      self.activeLanguage = params.lang;
      self.activeLanguageName = params.langName;

      self.login = function() {
        if (self.requiredFieldsFilled()) {
          const successCallback = function() {
          };
          const errorCallback = function () {
            self.router.go('login');
          };
          if (!!self.user.authId() && !!self.user.tokenId()) {
            self.api.validateToken(successCallback, errorCallback);
          } else {
            self.api.getAuthToken(self.user.name(), self.user.password(), successCallback, errorCallback);
          }
        }
      };

      self.formPlaceholders = {
        username: ko.observable(),
        password: ko.observable(),
        login: ko.observable()
      };

      function setFormPlaceholders() {
        $.each(self.formPlaceholders, function(key, value) {
          value(oj.Translations.getTranslatedString(key));
        });
      };

      setFormPlaceholders();

      self.isLocalizationLoaded = params.isLocalizationLoaded;

      self.isLocalizationLoaded.subscribe(function(value) {
        if (value) {
          setFormPlaceholders();
        }
      });

      self.tracker = ko.observable();

      // Todo
      self.requiredFieldsFilled = ko.computed(function() {
        return self.user.name().length;
      });

      self.handleActivated = function(info) {

      };

      self.handleAttached = function() {

        $('.btn-container.btn-dropdown').hover(function() {
          $(this).addClass('hover');
        }, function() {
          $(this).removeClass('hover');
        });

        // Close dropdown on language update
        self.activeLanguage.subscribe(function() {
          $('.btn-container.btn-dropdown.hover').removeClass('hover');
        });

      };

      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    return LoginViewModel;
  }
);
