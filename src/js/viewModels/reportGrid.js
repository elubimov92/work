
define(['ojs/ojcore', 'knockout', 'jquery', 'dx.custom'],
  function(oj, ko, $) {

    function ReportGridViewModel(params) {

      var self = this;

      self.rootData = params;

      console.log(params);

      self.rootData.isLocalizationLoaded.subscribe(function(value) {
        if (value) {
          // Render grid each time locale is changed
          createDxGrid(self.rootData.gridData(), self.rootData.gridColumnHeaders());
        }
      });

      function createDxGrid(gridData, gridColumnHeaders) {
        $("#grid").dxDataGrid({
          dataSource: gridData,
          editing: {
            allowAdding: true,
            allowUpdating: true,
            mode: "batch"
          },
          "export": {
            enabled: true,
            fileName: "Orders"
          },
          grouping: {
            contextMenuEnabled: true
          },
          columnAutoWidth: true,
          scrolling: {
            mode: 'virtual'
          },
          showScrollbar: 'always',
          columnChooser: {
            enabled: true,
            mode: "select"
          },
          onCellPrepared: function(options) {
            var value = options.value;
            if (typeof value === 'number' && value < 0) {
              options.cellElement[0].style.color = '#ed1c24';
            }
          },
          columns: gridColumnHeaders,
          summary: {
            totalItems: [{
              column: "APRICE_ART_V",
              summaryType: "sum"
            }, {
              column: "PNT_RATE_DIFF",
              summaryType: "count"
            }],
            groupItems: [{
              column: "APURCH_LP",
              summaryType: "max",
              alignByColumn: true
            }]
          }
        });
      };

      self.handleActivated = function(info) {
        // Implement if needed;
      };

      self.handleAttached = function(info) {

        createDxGrid(self.rootData.gridData(), self.rootData.gridColumnHeaders());

      };

      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    return ReportGridViewModel;
  }
);
