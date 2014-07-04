/**
 * @class Analytics
 * A wrapper around Google Analytics
 */
/*globals ga*/

var Analytics = function (category) {

  this.active = (ga) ? true : false;
  this.category = category;
};

Analytics.prototype.trackEvent = function (action, label, value) {
  if (!this.active) {
    return;
  }

  if (!action) {
    throw new this.exception("No action defined");
  }

  if (value) {
    ga('send', this.category, action, label, value);
  } else if (label) {
    ga('send', this.category, action, label);
  } else {
    ga('send', this.category, action);
  }

};

Analytics.prototype.exception = function (message) {
  this.message = message;
  this.name = "AnalyticsException";
};

module.exports = Analytics;
