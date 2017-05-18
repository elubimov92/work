
define(['ojs/ojcore', 'knockout', 'jquery', 'moment'],
  function(oj, ko, $, moment) {

    function ReportsViewModel(params) {

      var self = this;

      self.rootData = params;

      self.reportTitle = ko.observable(oj.Translations.getTranslatedString('reportSegmentTitle'));

      self.rootData.isLocalizationLoaded.subscribe(function(value) {
        console.log(value);
        self.reportTitle(oj.Translations.getTranslatedString('reportSegmentTitle'));
      });

      self.topDrawerParams = {
        displayMode: 'overlay',
        selector: '#topPanel',
        content: '#report-container'
      };

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
          mode: 'bySegment',
          store: self.rootData.store,
          stores: self.rootData.stores,
          storeChangeHandler: self.rootData.storeChangeHandler,
          isLocalizationLoaded: self.rootData.isLocalizationLoaded,
          report: self.rootData.report,
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

    return ReportsViewModel;
  }
);
