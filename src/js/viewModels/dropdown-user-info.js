define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojrouter'],
  function(oj, ko, $) {

    function DropdownUserInfoViewModel(params) {
      var self = this;

      self.user = params.user;

      self.logout = params.logout;

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

    return DropdownUserInfoViewModel;
  }
);
