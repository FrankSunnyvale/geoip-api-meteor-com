Template['geoip-api-main'].helpers({
  ip: function(){  return Session.get('ip'); }
});

headers = {
    list: {},
    get: function(header, callback) {
        var ret = header ? this.list[header] : this.list;
        if (callback) callback(ret);
        return ret;
    }
}

Meteor.call('getReqHeaders', function(error, result) {
    if (error) {
        console.log(error);
    }
    else {
        headers.list = result;
        headers.get('x-forwarded-for', function (ip){
          Session.set('ip', ip);
        });
    }
});
