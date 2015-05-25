Meteor.methods({
  'getIp': function (header) {
    return this.connection.clientAddress
  }
});

GeoIP = Meteor.npmRequire('geoip-lite');

Router.route('lookupIP', {
  path: '/lookup/:ip',
  where: 'server',
  action: function () {
    var ip = this.params.ip;
    this.response.writeHead(200, {'Content-Type': 'application/json'});
    this.response.end(JSON.stringify(GeoIP.lookup(ip)));
  }
});
