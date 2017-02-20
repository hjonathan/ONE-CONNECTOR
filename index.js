var NGOrchestration = require('./NGOrchestration.js');
var instance = new NGOrchestration();
instance.start(function (){
    console.log("[x] - Orchestration used");
});
