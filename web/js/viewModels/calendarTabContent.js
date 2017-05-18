/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'moment'],
  function(oj, ko, $, moment) {

    function CalendarTabContentViewModel(params) {

      var self = this;

      self.calendar = params;

      self.state = {};

      self.state.firstDate = ko.computed(function() {
        return moment(self.calendar.firstDate()).date();
      });

      self.state.secondDate = ko.computed(function() {
        return moment(self.calendar.secondDate()).date();
      });

      self.state.firstMonth = ko.computed(function() {
        return self.calendar.formatDate(self.calendar.firstDate, 'MMM');
      });

      self.state.firstYear = ko.computed(function() {
        return self.calendar.formatDate(self.calendar.firstDate, 'YYYY');
      });

      self.state.secondMonth = ko.computed(function() {
        return self.calendar.formatDate(self.calendar.secondDate, 'MMM');
      });

      self.state.secondYear = ko.computed(function() {
        return self.calendar.formatDate(self.calendar.secondDate, 'YYYY');
      });

      self.state.fullMonth = ko.computed(function() {
        return self.calendar.formatDate(self.calendar.firstDate, 'MMMM');
      });

      self.isDayOrWeekCalendar = function() {
        var type = self.calendar.info.type();
        return type === 'day' || type === 'week';
      };

      self.togglePopup = function(selectPeriod) {
        var popup = self.calendar.popup;
        if (popup.isOpen()) {
          popup.close();
        }
        else {
          popup.open(selectPeriod);
        }
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

    return CalendarTabContentViewModel;
  }
);
