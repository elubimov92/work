/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore","jquery","ojs/ojcomponentcore","ojs/ojtime-base","ojs/internal-deps/dvt/DvtGantt"],function(a,g,b,c,d){a.Pa("oj.ojGantt",g.oj.dvtTimeComponent,{widgetEventPrefix:"oj",options:{viewportChange:null},Eg:function(a,b,c){a.styleClasses={databody:"oj-gantt-container",nodata:"oj-gantt-no-data-message",hgridline:"oj-gantt-horizontal-gridline",vgridline:"oj-gantt-vertical-gridline",majorAxis:"oj-gantt-major-axis",majorAxisTicks:"oj-gantt-major-axis-separator",majorAxisLabels:"oj-gantt-major-axis-label",
minorAxis:"oj-gantt-minor-axis",minorAxisTicks:"oj-gantt-minor-axis-separator",minorAxisLabels:"oj-gantt-minor-axis-label",row:"oj-gantt-row",rowLabel:"oj-gantt-row-label",task:"oj-gantt-task",taskLabel:"oj-gantt-task-label",selected:"oj-selected",hover:"oj-hover",focus:"oj-focus"};return d.Gantt.newInstance(a,b,c)},Kf:function(){var a=this._super();a.push("oj-gantt");return a},fMa:function(){return{databody:"oj-gantt-container",nodata:"oj-gantt-no-data-message",hgridline:"oj-gantt-horizontal-gridline",
vgridline:"oj-gantt-vertical-gridline",majorAxis:"oj-gantt-major-axis",majorAxisTicks:"oj-gantt-major-axis-separator",majorAxisLabels:"oj-gantt-major-axis-label",minorAxis:"oj-gantt-minor-axis",minorAxisTicks:"oj-gantt-minor-axis-separator",minorAxisLabels:"oj-gantt-minor-axis-label",row:"oj-gantt-row",rowLabel:"oj-gantt-row-label",task:"oj-gantt-task",taskLabel:"oj-gantt-task-label",selected:"oj-selected",hover:"oj-hover",focus:"oj-focus"}},Hk:function(a){var b=a.subId;"oj-gantt-taskbar"==b?b="taskbar["+
a.rowIndex+"]["+a.index+"]":"oj-gantt-row-label"==b&&(b="rowLabel["+a.index+"]");return b},Qh:function(a){var b={};0==a.indexOf("taskbar")?(a=this.Sm(a),b.subId="oj-gantt-taskbar",b.rowIndex=a[0],b.index=a[1]):0==a.indexOf("rowLabel")&&(a=this.Sm(a),b.subId="oj-gantt-row-label",b.index=a[0]);return b},Ik:function(){var a=this._super();a["oj-gantt"]={path:"_resources/animationDuration",property:"animation-duration"};a["oj-gantt-zoomin-icon"]=[{path:"_resources/zoomIn",property:"CSS_URL"},{path:"_resources/zoomIn_bgc",
property:"background-color"},{path:"_resources/zoomIn_bc",property:"border-color"}];a["oj-gantt-zoomin-icon oj-hover"]=[{path:"_resources/zoomIn_h",property:"CSS_URL"},{path:"_resources/zoomIn_h_bgc",property:"background-color"},{path:"_resources/zoomIn_h_bc",property:"border-color"}];a["oj-gantt-zoomin-icon oj-active"]=[{path:"_resources/zoomIn_a",property:"CSS_URL"},{path:"_resources/zoomIn_a_bgc",property:"background-color"},{path:"_resources/zoomIn_a_bc",property:"border-color"}];a["oj-gantt-zoomin-icon oj-disabled"]=
[{path:"_resources/zoomIn_d",property:"CSS_URL"},{path:"_resources/zoomIn_d_bgc",property:"background-color"},{path:"_resources/zoomIn_d_bc",property:"border-color"}];a["oj-gantt-zoomout-icon"]=[{path:"_resources/zoomOut",property:"CSS_URL"},{path:"_resources/zoomOut_bgc",property:"background-color"},{path:"_resources/zoomOut_bc",property:"border-color"}];a["oj-gantt-zoomout-icon oj-hover"]=[{path:"_resources/zoomOut_h",property:"CSS_URL"},{path:"_resources/zoomOut_h_bgc",property:"background-color"},
{path:"_resources/zoomOut_h_bc",property:"border-color"}];a["oj-gantt-zoomout-icon oj-active"]=[{path:"_resources/zoomOut_a",property:"CSS_URL"},{path:"_resources/zoomOut_a_bgc",property:"background-color"},{path:"_resources/zoomOut_a_bc",property:"border-color"}];a["oj-gantt-zoomout-icon oj-disabled"]=[{path:"_resources/zoomOut_d",property:"CSS_URL"},{path:"_resources/zoomOut_d_bgc",property:"background-color"},{path:"_resources/zoomOut_d_bc",property:"border-color"}];a["oj-gantt-container"]={path:"_resources/chartArea/strokeWidth",
property:"stroke-width"};a["oj-gantt-horizontal-gridline"]={path:"_resources/horizontalGridlineWidth",property:"stroke-width"};a["oj-gantt-task-label"]={path:"_resources/taskLabelFontProp",property:"CSS_TEXT_PROPERTIES"};a["oj-gantt-row-label"]={path:"_resources/rowLabelFontProp",property:"CSS_TEXT_PROPERTIES"};return a},Gj:function(){return["optionChange","viewportChange"]},Si:function(){var a=this.options.translations,b=this._super();b["DvtUtilBundle.GANTT"]=a.componentName;b["DvtUtilBundle.ZOOM_IN"]=
a.tooltipZoomIn;b["DvtUtilBundle.ZOOM_OUT"]=a.tooltipZoomOut;return b},po:function(){this._super();this.options._resources.firstDayOfWeek=a.$a.mF()},Gl:function(a){if("viewportChange"===a.type){var b=(new Date(a.viewportStart)).toISOString(),c=(new Date(a.viewportEnd)).toISOString(),d=a.majorAxisScale;a=a.minorAxisScale;var g={viewportStart:b,viewportEnd:c,majorAxisScale:d,minorAxisScale:a};this.ge("viewportStart",b);this.ge("viewportEnd",c);this.ge("majorAxis.scale",d);this.ge("minorAxis.scale",
a);this._trigger("viewportChange",null,g)}else this._super(a)},Jk:function(){return{root:["rows"]}}});a.Components.Wa("ojGantt","dvtTimeComponent",{properties:{animationOnDataChange:{type:"string"},animationOnDisplay:{type:"string"},axisPosition:{type:"string"},end:{type:"string|number"},gridlines:{type:"object"},majorAxis:{type:"object"},minorAxis:{type:"object"},rows:{type:"Array\x3cobject\x3e"},selection:{type:"Array\x3cstring\x3e"},selectionMode:{type:"string"},start:{type:"string|number"},taskDefaults:{type:"object"},
viewportEnd:{type:"string|number"},viewportStart:{type:"string|number"}},methods:{whenReady:{}},extension:{_widgetName:"ojGantt"}});a.Components.register("oj-gantt",a.Components.getMetadata("ojGantt"))});