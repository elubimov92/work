
define(['ojs/ojcore', 'knockout', 'jquery', 'moment'],
  function(oj, ko, $, moment) {

    function FamilyViewModel(params) {

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

      self.togglePanel = function() {
        self.toggleDrawer();
        var view = $('#pagePanel');
        var topPanelHeight = $('#topPanel').height();
        if ((view.height() - topPanelHeight) < 20) {
          view.height(topPanelHeight + 20);
        }
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

        var filters = [
          {
            name: 'Period',
            data: [
              {id: 'month', name: 'Month'}
            ]
          },
          {
            name: 'Format',
            data: [
              {id: 'total', name: 'TOTAL'},
              {id: 'hyper', name: 'HYPER'},
              {id: 'city', name: 'CITY'},
              {id: 'raduga', name: 'RADUGA'}
            ]
          },
          {
            name: 'Grappa',
            data: [
              {id: 'total', name: 'TOTAL'},
              {id: 'grapp', name: 'Grapp'}
            ]
          },
          {
            name: 'Store',
            data: [
              {id: 'total', name: 'TOTAL'},
              {id: 'store', name: 'Store'}
            ]
          },
          {
            name: 'Nomenclature',
            data: [
              {id: 'total', name: 'TOTAL'},
              {id: 'market', name: 'Market'},
              {id: 'segment', name: 'Segment'},
              {id: 'category', name: 'Category'},
              {id: 'family', name: 'Family'}
            ]
          }
        ];

        self.topPanelModuleParams = {
          date: self.rootData.date,
          isLocalizationLoaded: self.rootData.isLocalizationLoaded,
          toggleDrawer: self.toggleDrawer,
          filters: filters
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

    return FamilyViewModel;
  }
);
