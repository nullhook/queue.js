# Queue.js

An asynchronous queue system

### install and run

`npm install`
`npm run start`

### queue.run()

```javascript
const queue = new Queue({concurrency: 5});
await queue.run(async () => { });
```
