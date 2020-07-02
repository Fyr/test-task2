const axios = require("axios");

// Import constants for jobs
const JOB_STATUS = require("../models/job").STATUS;

/**
 * Class responsible to run a job and create a logs about job execution
 */
class Worker {

  /**
   * Accepts services to be injected
   * @param {Logger} log
   */
  constructor(log) {
    this.log = log;
  }

  /**
   * Set a status for a given job (with possible http_code)
   * @param {JobModel} job - JobModel entity
   * @param {string} status
   * @param {number} http_code
   */
  async setStatus(job, status, http_code = 0) {
    this.log.info(`START jobID: "${job.id}" SET status`, { status, http_code });
    if (status) {
      job.status = status;
    }
    if (http_code) {
      job.http_code = http_code;
    }
    await job.save();
    this.log.info(`END jobID: "${job.id}" SET status`);
  }

  /**
   * Runs a given job. Updates job status depending upon job result
   * @param {JobModel} job - JobModel entity
   */
  async run(job) {
    let status, http_code;

    this.log.info(`START jobID: "${job.id}" RUN`, { url: job.url });
    try {
      const res = await axios.get(job.url);
      http_code = res.status;
      status = JOB_STATUS.DONE;
      this.log.info(`END jobID: "${job.id}" RUN`, { status, http_code });
    } catch(e) {
      // got an error with bad status
      http_code = e.response.status;
      status = JOB_STATUS.ERR;
      this.log.error(`FAIL jobID: "${job.id}" RUN`, { status, http_code });
    }

    await this.setStatus(job, status, http_code);
  }
}
module.exports = Worker;