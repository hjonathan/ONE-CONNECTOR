var NGSharedKernel = require('NGSharedKernel');
var broker = require('./config/config.json').broker;

var NGOrchestration = function () {
    this.kernel = new NGSharedKernel();
    this.logger = this.kernel.create('Logger');
    this.messageReceiver = null;
    this.messageDispatcher = null;
};

NGOrchestration.prototype.start = function (done) {
    var that = this;

    this.messageDispatcher = this.createMessageDispatcher('channel03', broker);
    this.messageReceiver = this.startMessageReceiver('channel04', broker, function (err, data) {
        that.logger.log('debug', "[x] - Message Received.");
        that.messageDispatcher.sendMessage(data.toString(), function () {
            that.logger.log('debug', "[x] - Message Sent");
        });
    });
};

NGOrchestration.prototype.createMessageDispatcher = function (channel, brokeramqp) {
    var kernel = new NGSharedKernel();
    var connection = {
        'amqp': 'amqp://' + brokeramqp.host + ':' + brokeramqp.port,
        'channel': channel,
        'exchange': 'direct'
    };
    var dispatcher = kernel.create('MessageDispatcher', connection);
    return dispatcher;
};

NGOrchestration.prototype.startMessageReceiver = function (channel, brokeramqp, done) {
    var kernel = new NGSharedKernel();
    var connection = {
        'type': 'rabbitmq',
        'connection': {
            'amqp': 'amqp://' + brokeramqp.host + ':' + brokeramqp.port,
            'type': 'SUB',
            'channel': channel
        }
    };

    var eventReceiver = kernel.create('MessageReceiver', connection);
    eventReceiver.subscribe(function (err, data) {
        done(err, data);
    });
    return eventReceiver;
};

module.exports = NGOrchestration;
