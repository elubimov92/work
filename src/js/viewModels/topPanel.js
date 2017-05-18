define(['ojs/ojcore', 'knockout', 'jquery'],
 function(oj, ko, $) {
  
    function TopPanelViewModel(params) {
      var self = this;

      self.dataParent = params;

      self.type = '0';

      self.types = ko.observableArray([
        {name: '0', code: '0'},
        {name: '1', code: '1'},
        {name: '2', code: '2'},
        {name: '3', code: '3'},
        {name: '4', code: '4'},
        {name: '5', code: '5'}
      ]);

      self.selectType = function(type, key) {
        console.log(type);
        console.log(key);
      };

      self.operations = [
        {name: '0', code: '0'},
        {name: '1', code: '1'},
        {name: '2', code: '2'},
        {name: '3', code: '3'},
        {name: '4', code: '4'},
        {name: '5', code: '5'}
      ];

      self.calendarParams = {
        date: self.dataParent.date,
        isLocalizationLoaded: self.dataParent.isLocalizationLoaded
      };

      self.handleActivated = function(info) {
      };


      self.handleAttached = function(info) {
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View. 
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return TopPanelViewModel;
  }
);
