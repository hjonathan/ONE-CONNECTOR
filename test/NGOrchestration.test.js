var rewire = require('rewire');
var sinonChai = require('sinon-chai');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
chai.use(sinonChai);

var NGOrchestration = rewire('../NGOrchestration.js');
var orchestration;

describe('NGOrchestration', function () {
    describe('#startMessageReceiver()', function () {

        var SharedKernel,
            ReceiverStub,
            DispatcherStub,
            brokerStub;

        beforeEach(function () {
            brokerStub = {
                "host": "127.0.0.1",
                "port": "56789"
            };
            NGOrchestration.__set__('broker', brokerStub);

            SharedKernel = sinon.spy();
            ReceiverStub = sinon.stub();
            ReceiverStub.subscribe = function (done) {
                done(null, {});
            };
            ReceiverStub.subscribe = sinon.spy(ReceiverStub.subscribe);
            SharedKernel.prototype.create = sinon.stub();
            SharedKernel.prototype.create.withArgs('MessageReceiver').returns(ReceiverStub);
            DispatcherStub = sinon.stub();
            DispatcherStub.sendMessage = sinon.spy();
            SharedKernel.prototype.create.withArgs('MessageDispatcher').returns(DispatcherStub);
            NGOrchestration.__set__('NGSharedKernel', SharedKernel);

            orchestration = new NGOrchestration();
        });

        it('This method starts the receiver and also redirects any message sent to this container again into the message queue', function () {
            orchestration.start();
            expect(ReceiverStub.subscribe.called).to.be.true;
            expect(DispatcherStub.sendMessage.called).to.be.true;
        });

    });
});