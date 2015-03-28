

headers = {
    list: {},
    get: function(header) {
        return header ? this.list[header] : this.list;
    }
};

var app = typeof WebApp != 'undefined' ? WebApp.connectHandlers : __meteor_bootstrap__.app;
app.use(function(req, res, next) {
    reqHeaders = req.headers;
    return next();
});

Meteor.methods({
    'getReqHeader': function(header) {
        return reqHeaders[header];
    },
    'getReqHeaders': function () {
        return reqHeaders;
    },
});

GeoIP = Meteor.npmRequire('geoip-lite')

Router.route('lookupIP', {
  path: '/lookup/:ip',
  where: 'server',
  action: function() {
    var ip = this.params.ip;
    this.response.writeHead(200, {'Content-Type': 'application/json'});
    this.response.end(          JSON.stringify(GeoIP.lookup(ip))      );
  }
});
