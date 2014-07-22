describe('Analytics', function () {

  var Analytics = require('./Analytics'),
    analytics = new Analytics('test-name');

  it('should have an active value based on GA being defined', function () {
    expect(typeof analytics.active).toEqual('boolean');
  });

  it('should have a category', function () {
    expect(analytics.category).toEqual('test-name');
  });

});
