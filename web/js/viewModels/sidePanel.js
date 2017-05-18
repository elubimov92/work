define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojnavigationlist', 'ojs/ojjsontreedatasource'],
 function(oj, ko, $) {
  
    function SidePanelViewModel(params) {

      var self = this;

      self.router = oj.Router.rootInstance;

      self.rootData = params;

      self.toggleTopPanel = function() {
        self.rootData.isTopPanelToggled(!self.rootData.isTopPanelToggled());
      };

      self.search = ko.observableArray();

      self.handleActivated = function(info) {
        // Implement if needed
      };

      self.handleAttached = function(info) {
        // Implement if needed
      };

      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    return SidePanelViewModel;
  }
);
