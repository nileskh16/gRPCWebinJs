let grpc = require('grpc');
let protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(__dirname + '/ping_pong.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

var pingPongProto = grpc.loadPackageDefinition(packageDefinition);
var server = new grpc.Server();

server.addService(pingPongProto.pingpong.PingPongService.service, {
    pingPong: function (call, callback) {
        console.log("Request")
        return callback(null, { pong: "Pong" });
    }
});

server.bind('0.0.0.0:8080', grpc.ServerCredentials.createInsecure());
server.start();

console.log('gRPC server is started now!!!');

// setTimeout(() => {
//     let client = new pingPongProto.pingpong.PingPongService("localhost:8080", grpc.credentials.createInsecure());
//     client.pingPong({ name: "CR7", ping: "Ping" }, (err, resp) => {
//         console.log(`Response received ${resp.pong} => ${resp.name}`);
//     });
// }, 4000);