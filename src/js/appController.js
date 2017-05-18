/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'moment', 'promise', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
    'ojs/ojoffcanvas', 'ojs/ojtabs', 'ojs/ojconveyorbelt', 'ojs/ojtable', 'ojs/ojselectcombobox',
    'ojs/ojaccordion', 'ojs/ojcollapsible', 'ojs/ojradioset', 'ojs/ojdatetimepicker'],
  function(oj, ko, $, moment) {
    function ControllerViewModel() {
      var self = this;

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

      // Keeps track if content is loaded
      self.isLoaded = ko.observable(false);

      self.date = {};
      self.date.first = ko.observable(moment().subtract(1, 'day').startOf('day').toDate());
      self.date.second = ko.observable(self.date.first());

      // Language options
      self.lang = ko.observable('ru-RU');
      self.languages = [
        {name: 'ru', id: 'ru-RU'},
        {name: 'fr', id: 'fr-FR'},
        {name: 'en', id: 'en-US'}
      ];
      self.langName = ko.computed(function() {
        for (i in this.languages) {
          var language = this.languages[i];
          if (language.id === this.lang()) {
            return language.name;
          }
        }
      }, self);
      self.isLocalizationLoaded = ko.observable(false);

      self.routeName = ko.observable('login');
      self.tabs = [
        {id: 'nomenclature', iconClass: ''},
        {id: 'tier', iconClass: ''},
        {id: 'family', iconClass: ''},
        {id: 'ctm', iconClass: ''}
      ];

      // This is only "placeholder" for navigation data. The real data is received from .json file
      self.navDataSource = ko.observable(new oj.ArrayTableDataSource([], {idAttribute: 'id'}));

      self.applyLocalization = function() {

        // Localization for tabs
        var navData = [];
        for (var i = 0; i < self.tabs.length; i++) {
          var tab = self.tabs[i];
          navData.push({ name: oj.Translations.getTranslatedString(tab.id), id: tab.id, iconClass: tab.iconClass });
        }
        self.navDataSource(new oj.ArrayTableDataSource(navData, {idAttribute: 'id'}));
      };

      function mapSegmentData() {
        $.each(self.Segments, function(key, value) {
          for (i in self.segments()) {
            var item = self.segments()[i];
            if (value.RAY === item.code.split('S')[1]) {
              return;
            }
          }
          var newSegment = {};
          newSegment.code = 'M' + value.SEC + 'S' + value.RAY;
          newSegment.name = '(' + value.RAY + ') ' + value.RAYDSC;
          self.segments.push(newSegment);
        });
      };

      function mapStoreData() {
        $.each(self.Store, function(key, value) {
          var newStore = {};
          newStore.code = value.CODE;
          newStore.name = '(' + value.CODE + ') ' + value.DESCRIPTION;
          self.stores.push(newStore);
        });
      };

      // Drawer
      // Called by nav drawer option change events so we can close drawer after selection
      self.navChangeHandler = function (event, data) {
        if ((data.option === 'selection' && data.value && data.value !== self.router.stateId()) && self.smScreen()) {
          self.toggleDrawer();
        }
        console.log(self.routeName());
        self.router.stateId(self.routeName());
      };

      self.languageChangeHandler = function(event, data) {
        if (data.option === 'selection') {
          localize();
        }
      };

      function localize() {
        self.isLocalizationLoaded(false);
        oj.Config.setLocale(self.lang(), function () {
          $('html').attr('lang', self.lang());
          moment.locale(self.lang());
          self.applyLocalization();
          self.isLocalizationLoaded(true);
        });
        self.updateRoute();
      };

      function selectFirstDropdownTab() {
        // Select first tab by default
        var tabs = $('#dropdown-tabs').find('li');
        if (tabs) {
          tabs.removeClass('oj-selected');
          tabs.first().addClass('oj-selected');
        }
      };

      // Close offcanvas on medium and larger screens
      self.mdScreen.subscribe(function() {
        // Dropdowns adjusting. Always show both on screen with less than 768px and only show one on wider screens
        if ($(window).width() >= 768 && (self.dropdownStates.appSelectDropdown() && self.dropdownStates.userInfoDropdown())) {
          self.dropdownStates.appSelectDropdown(false);
        }
        else if ($(window).width() < 768 && (self.dropdownStates.appSelectDropdown() || self.dropdownStates.userInfoDropdown())) {
          self.dropdownStates.appSelectDropdown(true);
          self.dropdownStates.userInfoDropdown(true);
        }
      });

      self.navDrawerParams = {
        displayMode: 'push',
        selector: '#navDrawer',
        content: '#pageContent'
      };
      self.sideDrawerParams = {
        edge: 'start',
        displayMode: 'overlay',
        selector: '#sidePanel',
        content: '#pageContent',
        "query": mdQuery
      };

      oj.OffcanvasUtils.setupResponsive(this.sideDrawerParams);

      self.showSidePanel = function() {
        var stateId = self.router.stateId();
        return false;
      };

      self.isTopPanelToggled = ko.observable(false);

      // Called by navigation drawer toggle button and after selection of nav drawer item
      self.toggleDrawer = function(edge) {
        return oj.OffcanvasUtils.toggle(self.navDrawerParams);
      };

      self.localService = false;

      self.api = {
        protocol: 'http',
        server: self.localService === false ? 'cockpit.navitek.com.ru' : '146.240.224.205',
        port: '2222',
        connection: 'restapi/v.1/auth',
        service: 'restapi/v.1/performance'
      };

      const tokenId = localStorage.getItem('tokenId');

      // User Info used in Global Navigation area
      self.user = {
        name: ko.observable(''),
        email: ko.observable(''),
        info: ko.observable(''),
        password: ko.observable(''),
        authId: ko.observable(null),
        secret: ko.observable(null),
        tokenId: ko.observable(!!tokenId ? tokenId : null),
        securityContext: ko.observable(null)
      };

      self.developMode = true;

      self.api.url = self.api.protocol + '://' + self.api.server + ':' + self.api.port + '/' + self.api.connection;
      self.api.report = self.api.protocol + '://' + self.api.server + ':' + self.api.port + '/' + self.api.service;
      self.api.authenticate = self.api.url + '/authenticate';
      self.api.secretcode = self.api.url + '/secretcode';
      self.api.validate = self.api.url + '/validate';
      self.api.security = self.api.url + '/securitycontext';
      self.api.logout = self.api.url + '/logout';

      self.api.unifiedreport = self.api.report + '/unifiedreport';

      self.api.error = new ko.observable(false);
      self.api.xhrError = function (xhr) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.error(xhr.responseText);
          } else {
            console.error(xhr.statusText);
          }
        }
      };
      self.api.getAuthToken = function (username, password, successCallback, errorCallback) {
        console.log('getAuthToken');
        self.api.error(false);
        try {
          const _api = self.api.authenticate;
          const _url = _api + '?' + 'login=' + username + '&' + 'password=' + password;
          console.log(_api);
          $.ajax({
            url: _url,
            type: 'GET',
            dataType: 'json',
            error: self.api.xhrError
          }).done(function (result) {
            var data = result;
            if (!!data && data.Error === 0) {
              console.log('done');
              console.log(data);
              self.user.secret(null);
              if (!!data.authId) {
                console.log(data.authId);
                self.user.authId(data.authId);
              } else {
                self.user.authId(null);
              }
              if (!!data.tokenId) {
                console.log(data.tokenId);
                self.user.tokenId(data.tokenId);
                localStorage.setItem('tokenId', data.tokenId);
                afterAuthentication();
              } else {
                if (tokenId) {
                  self.user.tokenId(tokenId);
                  afterAuthentication();
                }
                // Only for working with test WS
                else if (!!data.authId) {
                  self.user.tokenId(data.authId);
                  localStorage.setItem('tokenId', data.authId);
                  afterAuthentication();
                }
                else {
                  self.user.tokenId(null);
                }
              }
              successCallback();
            } else {
              console.log('error');
              self.user.authId(null);
              self.user.tokenId(null);
              self.api.error(true);
              errorCallback();
            }
          }).fail(function (/*jqXHR, textStatus, errorThrown*/) {
            console.log('fail');
            self.user.authId(null);
            self.user.tokenId(null);
            self.api.error(true);
            errorCallback();
          });
        } catch(e) {
          self.api.error(true);
        }
      };
      self.api.getSecretToken = function (succesCallback, errorCallback) {
        console.log('getSecretToken');
        self.api.error(false);
        try {
          if (!!self.user.authId() && !!self.user.secret()) {
            const _api = self.api.secretcode;
            const _url = _api + '?' + 'authid=' + self.user.authId() + '&' + 'secret=' + self.user.secret();
            console.log(_api);
            $.ajax({
              url: _url,
              type: 'GET',
              dataType: 'json',
              error: self.api.xhrError
            }).done(function (result) {
              var data = result;
              //noinspection JSValidateTypes
              if (!!data && data.Error === 0 && !!data.tokenId && data.tokenId.length > 0) {
                console.log('done');
                localStorage.setItem('tokenId', data.tokenId);
                self.user.tokenId(data.tokenId);
                succesCallback();
              } else {
                console.log('error');
                self.user.authId(null);
                self.user.tokenId(null);
                self.api.error(true);
                errorCallback();
              }
            }).fail(function (/*jqXHR, textStatus, errorThrown*/) {
              console.log('fail');
              self.user.authId(null);
              self.user.tokenId(null);
              self.api.error(true);
              errorCallback();
            });
          }
        } catch(e) {
          self.api.error(true);
        }
      };
      self.api.validateToken = function (successCallback, errorCallback) {
        console.log('validateToken');
        self.api.error(false);
        try {
          if (!!self.user.tokenId()) {
            const _api = self.api.validate;
            const _url = _api + '?' + 'tokenid=' + self.user.tokenId();
            //console.log(_api);
            $.ajax({
              url: _url,
              type: 'GET',
              dataType: 'json',
              error: self.api.xhrError
            }).done(function (result) {
              var data = result;
              //noinspection JSValidateTypes
              console.log(JSON.stringify(data));
              if (!!data && data.Error === 0 && !!data.Validate && data.Validate === true) {
                console.log('done');
                return successCallback();
              } else {
                console.log('error');
                self.user.tokenId(null);
                self.api.error(true);
                errorCallback();
              }
            }).fail(function () {
              console.log('fail');
              self.user.tokenId(null);
              self.api.error(true);
              errorCallback();
            });
          }
        } catch(e) {
          self.api.error(true);
        }
      };
      self.api.securityContext = function (successCallback, errorCallback) {
        self.api.error(false);
        try {
          if (!!self.user.tokenId()) {
            const _api = self.api.security;
            const _url = _api + '?' + 'tokenid=' + self.user.tokenId();
            console.log(_api);
            $.ajax({
              url: _url,
              type: 'GET',
              dataType: 'json',
              error: self.api.xhrError
            }).done(function (result) {
              var data = result;
              //noinspection JSValidateTypes
              //console.log(JSON.stringify(data));
              if (!!data && data.Error === 0) {
                console.log('done');
                const _data = {
                  Segments: data.Segments,
                  Store: data.Store,
                  Applications: data.Applications
                };
                self.user.info(data.UserInfo[0]);
                self.user.email(data.UserInfo[0].EMAIL);
                successCallback(_data);
              } else {
                console.log('error');
                self.user.tokenId(null);
                self.api.error(true);
                errorCallback();
              }
            }).fail(function (/*jqXHR, textStatus, errorThrown*/) {
              console.log('fail');
              self.user.tokenId(null);
              self.api.error(true);
              errorCallback();
            });
          }
        } catch(e) {
          self.api.error(true);
        }
      };

      oj.OffcanvasUtils.setupResponsive(self.navDrawerParams);

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("Offer");

      // Segments

      self.segment = ko.observable({code: 'TOTAL', name: '(000) ALL SEGMENTS'});

      self.segments = ko.observableArray([
        {code: 'TOTAL', name: '(000) ALL SEGMENTS'}
      ]);

      self.segmentChangeHandler = function(event, data) {
        if (data.option === 'value') {
          for (i in self.segments()) {
            var segment = self.segments()[i];
            if (segment.code === data.value[0]) {
              self.segment(segment);
              self.category({code: 'TOTAL', name: '(000) ALL CATEGORY'});
              self.family({code: 'TOTAL', name: '(000) ALL FAMILY'});
              self.categories([
                {code: 'TOTAL', name: '(000) ALL CATEGORY'}
              ]);
              self.families([
                {code: 'TOTAL', name: '(000) ALL FAMILY'}
              ]);
              $.each(self.Segments, function(key, value) {
                for (i in self.categories()) {
                  var item = self.categories()[i];
                  if (value.FAM === item.code.split('C')[1]) {
                    return;
                  }
                }
                if (value.RAY === self.segment().code.split('S')[1]) {
                  var newCategory = {};
                  newCategory.code = 'M' + value.SEC + 'S' + value.RAY + 'C' + value.FAM;
                  newCategory.name = '(' + value.FAM + ') ' + value.FAMDSC;
                  self.categories.push(newCategory);
                }
              });
              console.log(self.categories());
              break;
            }
          }
        }
      };

      // Categories

      self.category = ko.observable({code: 'TOTAL', name: '(000) ALL CATEGORY'});

      self.categories = ko.observableArray([
        {code: 'TOTAL', name: '(000) ALL CATEGORY'}
      ]);

      self.categoryChangeHandler = function(event, data) {
        if (data.option === 'value') {
          for (i in self.categories()) {
            var category = self.categories()[i];
            if (category.code === data.value[0]) {
              self.category(category);
              self.family({code: 'TOTAL', name: '(000) ALL FAMILY'});
              self.families([
                {code: 'TOTAL', name: '(000) ALL FAMILY'}
              ]);
              $.each(self.Segments, function(key, value) {
                if (value.FAM === self.category().code.split('C')[1]) {
                  var newFamily = {};
                  newFamily.code = 'M' + value.SEC + 'S' + value.RAY + 'C' + value.FAM + 'F' + value.SFA;
                  newFamily.name = '(' + value.SFA + ') ' + value.SFADSC;
                  self.families.push(newFamily);
                }
              });
              break;
            }
          }
        }
      };

      // Families

      self.family = ko.observable({code: 'TOTAL', name: '(000) ALL FAMILY'});

      self.families = ko.observableArray([
        {code: 'TOTAL', name: '(000) ALL FAMILY'}
      ]);

      self.familyChangeHandler = function(event, data) {
        if (data.option === 'value') {
          for (i in self.families()) {
            var family = self.families()[i];
            if (family.code === data.value[0]) {
              self.family(family);
              break;
            }
          }
        }
      };

      // Stores

      self.store = ko.observable({code: 'TOTAL', name: '(000) ALL STORES'});

      self.stores = ko.observableArray([
        {code: 'TOTAL', name: '(000) ALL STORES'}
      ]);

      console.log(self.stores());

      self.storeChangeHandler = function(event, data) {
        if (data.option === 'value') {
          for (i in self.stores()) {
            var store = self.stores()[i];
            if (store.code === data.value[0]) {
              self.store(store);
              break;
            }
          }
        }
      };

      self.segmentGridData = ko.observable([]);
      self.segmentGridColumnHeaders = ko.observableArray();
      self.segmentDataLoaded = ko.observable(false);
      self.storeGridData = ko.observable([]);
      self.storeGridColumnHeaders = ko.observableArray();
      self.storeDataLoaded = ko.observable(false);

      self.moduleParams = {};
      self.moduleParams.main = {
        lang: self.lang,
        date: self.date,
        isLocalizationLoaded: self.isLocalizationLoaded,
        isTopPanelToggled: self.isTopPanelToggled
      };
      self.moduleParams.dropdownUserInfo = {
        user: self.user,
        logout: self.logout
      };
      self.moduleParams.login = {
        api: self.api,
        user: self.user,
        languages: self.languages,
        lang: self.lang,
        langName: self.langName,
        isLocalizationLoaded: self.isLocalizationLoaded,
        developMode: self.developMode,
        devLaunch: devLaunch
      };

      /*function setReportModuleParams(gridData, gridColumnHeaders, dataLoaded) {
        self.moduleParams.report({
          lang: self.lang,
          date: self.date,
          segment: self.segment,
          segments: self.segments,
          segmentChangeHandler: self.segmentChangeHandler,
          category: self.category,
          categories: self.categories,
          categoryChangeHandler: self.categoryChangeHandler,
          family: self.family,
          families: self.families,
          familyChangeHandler: self.familyChangeHandler,
          store: self.store,
          stores: self.stores,
          storeChangeHandler: self.storeChangeHandler,
          isLocalizationLoaded: self.isLocalizationLoaded,
          gridData: gridData,
          gridColumnHeaders: gridColumnHeaders,
          dataLoaded: dataLoaded,
          report: self.report,
          isTopPanelToggled: self.isTopPanelToggled,
          promise: self.dataPromise
        });
      };*/

      self.api.callReportWS = function (mode) {
        var nomenclature = self.family().code === 'TOTAL' ?
          (self.category().code === 'TOTAL' ? self.segment().code : self.category().code) : self.family().code ;
        const _tokenid = self.user.tokenId();
        const _api = self.api.unifiedreport;
        const _data = mode === 'byStore' ? {
          id: 100,
          p1: 'PARAM_NOMA',
          p2: nomenclature,
          p3: 'PARAM_DATE',
          p4: 'DAY_' + moment(self.date.first()).format('YYYYMMDD'),
          p5: 'PARAM_COMP_DATE',
          p6: 'DAY_' + moment(self.date.first()).subtract(364, 'days').format('YYYYMMDD'),
          p7: 'PARAM_PERIOD_FROM',
          p8: 0,
          p9: 'PARAM_PERIOD_TO',
          p10: 0
        } : (mode === 'bySegment' ? {
              id: 101,
              p1: 'PARAM_STORE',
              p2: self.store().code,
              p3: 'PARAM_DATE',
              p4: 'DAY_' + moment(self.date.first()).format('YYYYMMDD'),
              p5: 'PARAM_COMP_DATE',
              p6: 'DAY_' + moment(self.date.first()).subtract(364, 'days').format('YYYYMMDD'),
              p7: 'PARAM_PERIOD_FROM',
              p8: 0,
              p9: 'PARAM_PERIOD_TO',
              p10: 0,
              p11: 'PARAM_STORE_2',
              p12: "'" + self.store().code + "'" //%2C%20'COMPARABLE_HYPER'%2C%20'BUSINESS_HYPER'%2C%20'TOTAL'"
        } : null);
        var _params = '';
        console.log(_data);
        for (var property in _data) {
          _params = _params + '&' + property + '='+ _data[property];
        }
        const _url = _api + '?' + 'tokenid=' + _tokenid + _params;
        console.log(_url);
        try {
          return $.ajax({
            cache: false,
            type: 'GET',
            url: _url,
            dataType: 'json',
            success: function (result) {
              if (!!result && !!result.id_token) {
                id_token = result.id_token;
              } else {
                if (result && result.Error) {
                  console.log(JSON.stringify(result));
                }
              }
            },
            error: self.xhrError
          }).then(function (response) {
            console.log(response);
            if (mode === 'byStore') {
              saveGridData(response.Query, self.segmentGridData, self.segmentGridColumnHeaders, segmentGridGroupingColumns);
              self.segmentDataLoaded(true);
            }
            else if (mode === 'bySegment') {
              saveGridData(response.Query, self.storeGridData, self.storeGridColumnHeaders);
              self.storeDataLoaded(true);
            }
            //$('#mainTable').ojTable('refresh');
          }, function (reason, xhr, msg) {
            console.log(xhr);
            console.log(msg);
            //cancelCallback(reason);
          });
        } catch (e) {
          console.log(e);
        }
      };

      // Router setup

      self.router = oj.Router.rootInstance;
      self.router.configure({
        'login': {label: 'Login', isDefault: true},
        'nomenclature': {label: 'Nomenclature', enter: function() {}},
        'tier': {label: 'Tier', enter: function() {}},
        'family': {label: 'Family', enter: function() {}},
        'ctm': {label: 'CTM', enter: function() {}}
      });
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      self.firstPage = 'nomenclature';

      self.updateRoute = function() {
        self.router.stateId(self.routeName());
        // Refresh nav selection
        self.setRouteName(self.router.stateId());
      };

      // Better set route name this way, so the navigation will be refreshed
      self.setRouteName = function(name) {
        self.routeName('');
        self.routeName(name);
      };

      self.langDataSource = new oj.ArrayTableDataSource(self.languages, {idAttribute: 'id'});
      localize();
      // Wait until the model is set
      setTimeout(function() {
        self.isLoaded(true);
        // Don't add background color to side panel until data is loaded
        $('#sidePanel').addClass('oj-panel oj-panel-alt1');
      }, 100);

      self.sidePanelParams = {
        isTopPanelToggled: self.isTopPanelToggled,
        navChangeHandler: self.navChangeHandler,
        routeName: self.routeName
      };

      // Remove user data on login page enter
      self.router.getState('login').enter = function() {
        self.user.name('');
        self.user.password('');
      };

      // Callback on route change
      self.router.stateId.subscribe(function(value) {
        selectFirstDropdownTab();
        self.setRouteName(value);
      });

      function afterAuthentication() {
        if (!!self.user.tokenId() && self.user.tokenId().length > 0) {
          const successSecurityContextCallback = function (data) {
            self.Segments = data.Segments;
            self.Store = data.Store;
            mapSegmentData();
            mapStoreData();

            self.router.go(self.firstPage);
          };
          const successCallback = function () {
            return self.api.securityContext(successSecurityContextCallback, errorCallback);
          };
          const errorCallback = function () {
            self.router.go('login');
          };
          if (self.developMode) {
            devLaunch();

          }
          else {
            self.api.validateToken(successCallback, errorCallback);
          }
        }
      };

      function devLaunch() {
        self.router.go(self.firstPage);
      };

      afterAuthentication();

      self.isLangActive = function(language) {
        return language === self.lang();
      };

      self.logout = function() {
        self.user.authId(null);
        self.user.tokenId(null);
        self.router.go('login');
      };

      self.showReportArea = function() {
        return self.isLoaded && self.router.stateId() !== 'login';
      }

      // Dropdown toggles
      self.userInfoDropdown = ko.observable(true);
      self.dropdownStates = {appSelectDropdown: ko.observable(false), userInfoDropdown: ko.observable(false)};
      self.toggle = function(dropdown) {
        // Wrap it into timeout so it will be executed after the hiding all the dropdowns as reaction on click
        setTimeout(function() {
          // Toggle both dropdowns in responsive mode
          if ($(window).width() < 768 && (dropdown === 'appSelectDropdown' || dropdown === 'userInfoDropdown')) {
            self.dropdownStates.appSelectDropdown(!self.dropdownStates.userInfoDropdown());
            self.dropdownStates.userInfoDropdown(!self.dropdownStates.userInfoDropdown());
          }
          else {
            self.dropdownStates[dropdown](!(self.dropdownStates[dropdown]()));
          }
        }, 30);
      }

      // Hiding dropdowns on outside click
      $("body").on("click", function(){
        $.each(self.dropdownStates, function(key, value) {
          value(false);
        });
      });

    }

    return new ControllerViewModel();
  }
);
