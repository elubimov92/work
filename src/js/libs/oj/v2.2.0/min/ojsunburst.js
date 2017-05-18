/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore","jquery","ojs/ojcomponentcore","ojs/ojdvt-base","ojs/internal-deps/dvt/DvtTreeView"],function(a,g,b,c,d){a.Pa("oj.ojSunburst",g.oj.dvtBaseComponent,{widgetEventPrefix:"oj",options:{optionChange:null,rotateInput:null},Eg:function(a,b,c){return d.Sunburst.newInstance(a,b,c)},Hk:function(a){var b=a.subId;"oj-sunburst-node"==b?b="node"+this.Qu(a.indexPath):"oj-sunburst-tooltip"==b&&(b="tooltip");return b},Qh:function(a){var b={};0==a.indexOf("node")?(b.subId="oj-sunburst-node",b.indexPath=
this.Sm(a)):"tooltip"==a&&(b.subId="oj-sunburst-tooltip");return b},Kf:function(){var a=this._super();a.push("oj-sunburst");return a},Ik:function(){var a=this._super();a["oj-sunburst-attribute-type-text"]={path:"styleDefaults/_attributeTypeTextStyle",property:"CSS_TEXT_PROPERTIES"};a["oj-sunburst-attribute-value-text"]={path:"styleDefaults/_attributeValueTextStyle",property:"CSS_TEXT_PROPERTIES"};a["oj-sunburst-node"]={path:"nodeDefaults/labelStyle",property:"CSS_TEXT_PROPERTIES"};a["oj-sunburst-node oj-hover"]=
{path:"nodeDefaults/hoverColor",property:"border-top-color"};a["oj-sunburst-node oj-selected"]=[{path:"nodeDefaults/selectedOuterColor",property:"border-top-color"},{path:"nodeDefaults/selectedInnerColor",property:"border-bottom-color"}];return a},Gj:function(){return["optionChange","rotateInput"]},Si:function(){var a=this.options.translations,b=this._super();b["DvtSunburstBundle.COLOR"]=a.labelColor;b["DvtSunburstBundle.SIZE"]=a.labelSize;b["DvtUtilBundle.SUNBURST"]=a.componentName;return b},Gl:function(a){"rotation"===
a.type?a.complete?this.ge("startAngle",a.startAngle):this._trigger("rotateInput",null,{value:a.startAngle}):this._super(a)},po:function(){null==this.options._resources&&(this.options._resources={});this.options._resources.rotateCursor=a.ga.hb("resources/internal-deps/dvt/sunburst/rotate.cur")},getNode:function(a){a=this.xa.getAutomation().getNode(a);this.Qi(a);return a},getContextByNode:function(a){return(a=this.getSubIdByNode(a))&&"oj-sunburst-tooltip"!==a.subId?a:null},Jk:function(){return{root:["nodes"]}}});
a.Components.Wa("ojSunburst","dvtBaseComponent",{properties:{animationDuration:{type:"number"},animationOnDataChange:{type:"string"},animationOnDisplay:{type:"string"},animationUpdateColor:{type:"string"},colorLabel:{type:"string"},hiddenCategories:{type:"Array\x3cstring\x3e"},highlightedCategories:{type:"Array\x3cstring\x3e"},highlightMatch:{type:"string"},hoverBehavior:{type:"string"},hoverBehaviorDelay:{type:"number|string"},nodeDefaults:{type:"object"},nodes:{type:"Array\x3cobject\x3e"},rotation:{type:"string"},
selection:{type:"Array\x3cstring\x3e"},selectionMode:{type:"string"},sizeLabel:{type:"string"},sorting:{type:"string"},startAngle:{type:"number"},tooltip:{type:"object"},touchResponse:{type:"string"}},methods:{getContextByNode:{},getNode:{}},extension:{_widgetName:"ojSunburst"}});a.Components.register("oj-sunburst",a.Components.getMetadata("ojSunburst"))});