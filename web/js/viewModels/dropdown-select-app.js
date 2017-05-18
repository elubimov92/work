define(['ojs/ojcore', 'knockout', 'jquery'],
  function(oj, ko, $) {

    function DropdownSelectAppViewModel() {
      var self = this;

      function app(name, img) {
        this.name = name;
        this.img = 'css/images/' + img;
      }

      self.apps = [
        new app('', 'app_image.png'),
        new app('', 'app_image.png'),
        new app('', 'app_image.png')
      ];

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

    return new DropdownSelectAppViewModel();
  }
);
