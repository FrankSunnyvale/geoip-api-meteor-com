Template['geoip-api-main'].helpers({
  ip: function () {
    return Session.get('ip');
  }
});

headers = {
  list: {},
  get: function (header, callback) {
    var ret = header ? this.list[header] : this.list;
    if (callback) callback(ret);
    return ret;
  }
};

Meteor.call('getIp', function (error, ip) {
  if (error) {
    console.log(error);
  }
  else {
    Session.set('ip', ip);
  }
});
