
define(['ojs/ojcore', 'knockout', 'jquery', 'moment'],
  function(oj, ko, $, moment) {

    function TasksViewModel(params) {

      var self = this;

      self.rootData = params;

      self.reportTitle = ko.observable(oj.Translations.getTranslatedString('reportSegmentTitle'));

      self.rootData.isLocalizationLoaded.subscribe(function(value) {
        self.reportTitle(oj.Translations.getTranslatedString('reportSegmentTitle'));
      });

      self.topDrawerParams = {
        displayMode: 'overlay',
        selector: '#topPanel',
        content: '#report-container'
      };

      // Grid

      self.tableColumns = [{headerText: '№',
        field: 'id'},
        {headerText: 'Дата отправления',
          field: 'departureDate'},
        {headerText: 'Название',
          field: 'name'},
        {headerText: 'Фаза',
          field: 'phase'},
        {headerText: 'Статус',
          field: 'state'},
        {headerText: 'Параметры',
          field: 'params'},
        {headerText: 'Отм.',
          field: 'cancel'},
        {headerText: 'Лог',
          field: 'log'}];

      var deptArray = [
        {id: 1001, name: 'ADFPM 1001 neverending', phase: 200, state: 300},
        {id: 556, name: 'BB', phase: 200, state: 300},
        {id: 10, name: 'Administration', phase: 200, state: 300},
        {id: 20, name: 'Marketing', phase: 200, state: 300},
        {id: 30, name: 'Purchasing', phase: 200, state: 300},
        {id: 40, name: 'Human Resources1', phase: 200, state: 300},
        {id: 50, name: 'Administration2', phase: 200, state: 300},
        {id: 60, name: 'Marketing3', phase: 200, state: 300},
        {id: 70, name: 'Purchasing4', phase: 200, state: 300},
        {id: 80, name: 'Human Resources5', phase: 200, state: 300},
        {id: 90, name: 'Human Resources11', phase: 200, state: 300},
        {id: 100, name: 'Administration12', phase: 200, state: 300},
        {id: 110, name: 'Marketing13', phase: 200, state: 300},
        {id: 120, name: 'Purchasing14', phase: 200, state: 300},
        {id: 130, name: 'Human Resources15', phase: 200, state: 300}
      ];

      self.datasource = new oj.ArrayTableDataSource(deptArray, {idAttribute: 'id'});

      /// Grid

      self.toggleDrawer = function() {
        return oj.OffcanvasUtils.toggle(self.topDrawerParams);
      };

      function formatForDisplay(firstDate, secondDate, isComparative) {
        var date1 = moment(firstDate), date2 = moment(secondDate);
        if (isComparative) {
          date1 = date1.subtract(364, 'days');
          date2 = date2.subtract(364, 'days');
        }
        if (firstDate === secondDate) {
          return date1.format('DD.MM.YYYY');
        }
        else {
          return "from " + date1.format('DD.MM.YYYY') + " to " + date2.format('DD.MM.YYYY');
        }
      }

      self.handleActivated = function(info) {
        // Implement if needed;
        console.log(self.rootData);
        return self.rootData.promise;
      };

      self.handleAttached = function(info) {

        self.displayDate = ko.computed(function() {
          return formatForDisplay(this.date.first(), this.date.second(), false);
        }, self.rootData);

        self.displayDateComparative = ko.computed(function() {
          return formatForDisplay(this.date.first(), this.date.second(), true);
        }, self.rootData);

        self.topPanelModuleParams = {
          date: self.rootData.date,
          isLocalizationLoaded: self.rootData.isLocalizationLoaded,
          toggleDrawer: self.toggleDrawer
        };

        self.topPanelToggleSubscription = self.rootData.isTopPanelToggled.subscribe(function() {
          self.toggleDrawer();
        });

      };

      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      self.handleDetached = function(info) {
        self.topPanelToggleSubscription.dispose();
      };
    }

    return TasksViewModel;
  }
);
