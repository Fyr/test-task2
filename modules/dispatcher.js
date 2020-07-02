const Worker = require("./worker");

// Import constants for jobs
const JOB_STATUS = require("../models/job").STATUS;

/**
 * Class responsible to check and run available jobs
 */
class Dispatcher {

  /**
   * Accepts services to be injected
   * @param {Logger} log
   * @param {JobModel} jobModel - JobModel entity
   */
  constructor(log, jobModel) {
    this.log = log;
    this.jobModel = jobModel;
  }

  /**
   * Returns a model that is used to get a data
   * @return {JobModel}
   */
  getModel() {
    return this.jobModel;
  }

  /**
   * Returns a list of jobs available for execution
   */
  async getJobAvail() {
    return this.getModel().findAll({ where: { status: JOB_STATUS.NEW }});
  }

  /**
   * Dispatches existing jobs
   */
  async dispatch() {
    let jobs;
    this.log.info(`START Dispatching`);

    while ((jobs = await this.getJobAvail()) && jobs.length) { // check jobs available to execute
      this.log.info(`GOT new jobID: ${jobs[0].id}`);
      let wrk = new Worker(this.log);

      // immediately set another status to prevent the same job run twice
      await wrk.setStatus(jobs[0], JOB_STATUS.RUN);

      // run job asynchronously
      wrk.run(jobs[0]);
    }

    this.log.info(`END Dispatching`);
  }
}
module.exports = Dispatcher;