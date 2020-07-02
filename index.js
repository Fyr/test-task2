const seq = require("./modules/connect");
const Logger = require("./modules/logger");
const jobModel = require("./models/job")(seq);
const Dispatcher = require("./modules/dispatcher");

(async () => {
  // check DB connection before execution
  try {
    console.log('Check DB connection...');
    await seq.authenticate();
    console.log('Connected');
  } catch (e) {
    console.error('Unable to connect', e);
    process.exit(1);
  }

  // Run all jobs via dispatcher. Be sure to populate DB first
  const dispatcher = new Dispatcher(new Logger(), jobModel);
  await dispatcher.dispatch();

})();

