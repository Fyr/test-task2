/**
 * This is a module to populate DB.
 * DB is populated with URLs that accepts delay as GET-parameter
 */

const seq = require("./modules/connect");
const Logger = require("./modules/logger");
const jobModel = require("./models/job")(seq);

const MAX_JOBS = 10; // setting for a jobs amount

function getRnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

(async () => {
  // check DB connection
  try {
    console.log('Check DB connection...');
    await seq.authenticate();
    console.log('Connected');
  } catch (e) {
    console.error('Unable to connect', e);
    process.exit(1);
  }

  const log = new Logger();
  log.info('START Clear DB');
  await seq.query('DELETE FROM links');
  log.info('END Clear DB');

  log.info('START Populate DB');
  // generate 10 jobs with random delay
  for (let i = 0; i < MAX_JOBS; i++) {
    const delay = getRnd(1, 5);
    const url = `https://reqres.in/api/users/?delay=${delay}`;
    log.info(`Add to DB URL ${url}`);
    await jobModel.create({ url });
  }
  log.info('END Populate DB');
})();

