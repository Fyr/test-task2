To run this test task you should do the following:

1. Configure MySQL credentials in `db-config.json`
2. Install all required packages: `npm install`
3. Populate database with dataG: `npm run db:populate`
4. Run a task and check logs: `npm run start`. It should create a file `run.log`

Some notes about task implementation...
According to official Node.js docs:

*Workers (threads) are useful for performing CPU-intensive JavaScript operations. They will not help much with I/O-intensive work. Node.js’s built-in asynchronous I/O operations are more efficient than Workers can be.*

Source: https://nodejs.org/api/worker_threads.html

That's why I decided to reject from using native Workers and implement my own that is more simple to complete and easier to dive in.

I also rejected to use sequalize migrations (though I used it on a couple of projects) as it requires a bit more time to set it up. So I implemented more simple populating script.
Logs in console are not much comfortable to analyse so for me it was a good idea to implement both file and console logs. So after execution you can find that despite jobs are run in the order of creation, they are finished in the order of its completion (IDs differs). To prove it I used `reqres.in` that allows to process requests with delays
Also I ommited such good ideas of restricting a number of active jobs and MySQL locking of records against clinches. It consumes much more time, however I believe that test task is not for doing all ideally but just to demonstrate my programming skills. I hope that my comments for it are enough to show that I'm aware of such problems
