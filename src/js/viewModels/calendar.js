/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'moment'],
  function(oj, ko, $, moment) {

    function CalendarViewModel(params) {

      var self = this;

      self.report = params;

      console.log(params);

      self.periods = ['day', 'week', 'month', 'year'];

      self.info = {};

      self.info.type = ko.observable('day');
      self.info.isPeriodSelector = ko.observable(false);

      function formatDate(date, format) {
        // Call this property each time to make sure that values recomputes on language change
        self.report.isLocalizationLoaded();
        return moment(date()).format(format);
      };

      self.firstDate = params.date.first;
      self.secondDate = params.date.second;

      // Contains state of calendar popup
      self.popup = {};

      self.popup.isOpen = ko.observable(false);

      self.popup.open = function(selectPeriod) {
        self.info.isPeriodSelector(selectPeriod);
        $('#calendarPopup').ojPopup('open', '#calendar');
        self.popup.isOpen(true);
      };

      self.popup.close = function() {
        $('#calendarPopup').ojPopup('close', '#calendar');
        self.popup.isOpen(false);
      };

      self.calendarPopupModuleParams = {
        firstDate: self.firstDate,
        secondDate: self.secondDate,
        info: self.info,
        formatDate: formatDate,
        popup: self.popup
      };

      self.calendarTabContentModuleParams = {
        firstDate: self.firstDate,
        secondDate: self.secondDate,
        info: self.info,
        formatDate: formatDate,
        popup: self.popup
      };

      self.handleActivated = function(info) {
      };

      self.handleAttached = function() {

      };

      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    return CalendarViewModel;
  }
);
