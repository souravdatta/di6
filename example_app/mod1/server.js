export class Server {
  constructor(name) {
    this.name = name;
  }

  makeServer() {
    this.server = this.net.createServer();

    this.server.on('connection', (socket) => {
      socket.on('data', (data) => {
        if (this.fn_data && typeof this.fn_data === 'function') {
          this.fn_data(data, socket);
        }
      });
      socket.on('end', (arg) => {
        if (this.fn_end && typeof this.fn_end === 'function') {
          this.fn_end(arg);
        }
      });
    });

  }

  start() {
    console.log('Server %s listening on %s', this.name, this.port);
    this.server.listen(this.port);
  }
}
