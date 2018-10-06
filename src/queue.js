import Promise from 'bluebird';

class Queue {

	constructor({concurrency}) {
		this.jobs = [];
		this.running = 0;
		this.concurrency = concurrency || 1;
	}

	async flush() {
		if(this.running < this.concurrency && this.jobs.length) {
		  ++this.running;

		  let job = this.jobs.shift();
		  job.resolve(await job.job());

		  --this.running;
		  this.flush();
		}
	}

	async run(job) {
		let resolve;
		let deferred = new Promise(res => {
			  resolve = res;
		});

		this.jobs.push({job, resolve});
		this.flush();

		return deferred;
	}

};

export default Queue;
