var System = require('es6-module-loader').System;
var net = require('net');
var di = require('./di6');

var showError = function (err) {
  console.log(err);
};

System.import('./config.js').then(function (ConfigM) {
  System.import('./server.js').then(function (ServerM) {
    var DI = new di.DI();
    var server = DI.forClass(ServerM.Server)
                   .inject(DI.applyParams(ConfigM.serverConfig, [net]))
                   .inject({
                     fn_data: (d, cli) => {
                       cli.write('>> ' + d);
                     }
                   })
                   .inject({
                     fn_end: () => {
                       console.log('-- one client down...');
                     }
                   })
                   .construct(['hello'])
                   .getObject();
    server.makeServer();
    server.start();
  }).catch(function (err) {
    showError(err);
  });
}).catch(function (err) {
  showError(err);
});
