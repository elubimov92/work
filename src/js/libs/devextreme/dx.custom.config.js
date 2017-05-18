/* Core (dx.module-core.js) */

var $ = require("jquery/dist/jquery");
var DevExpress = require("devextreme/bundles/modules/core");
/* Integrations (dx.module-core.js) */
require("devextreme/integration/knockout");
/* UI core (dx.module-core.js) */
var ui = DevExpress.ui = require("devextreme/bundles/modules/ui");
ui.dialog = require("devextreme/ui/dialog");
/* Base widgets (dx.module-widgets-base.js) */
ui.dxDataGrid = require("devextreme/ui/data_grid");
ui.dxChart = require("devextreme/viz/chart");
ui.dxPieChart = require("devextreme/viz/pie_chart");