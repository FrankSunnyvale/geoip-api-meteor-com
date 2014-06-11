if (Meteor.isClient) {
  Template.hello.greeting = function () {

    return "Welcome to geoip-api.";
  };

  Template.hello.rendered = function(){
    Meteor.call("getip", function (error, result) {
      Session.set("ip", result);
    } );
  };

  Template.hello.helpers(
  {
      ip: function(){  return Session.get('ip'); }
  });

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });

  Meteor.methods({
    "getip": function(){
      console.log(this.connection);
      return  this.connection.httpHeaders['x-forwarded-for'];
    }
  })
}

Router.map(function() {
  this.route('methodExample', {
    path: '/lookup/:ip',
    where: 'server',
    action: function() {
      var ip = this.params.ip;
      this.response.writeHead(200, {'Content-Type': 'application/json'});
      this.response.end(          JSON.stringify(GeoIP.lookup(ip))      );
    }
  });

  this.route("hello", {path: "/" });
});
