const dotenv = require('dotenv');
const db = require('./queries')

dotenv.config();

const queue = 'money-task';
const open = require('amqplib').connect(process.env.AMQP_SERVER);

// Publisher
const publishMessage = payload => open.then(connection => connection.createChannel())
  .then(channel => channel.assertQueue(queue)
    .then(() => channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)))))
  .catch(error => console.warn(error));

// Consumer
const consumeMessage = () => {
  open.then(connection => connection.createChannel()).then(channel => channel.assertQueue(queue).then(() => {
    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);
    return channel.consume(queue, (msg) => {
      if (msg !== null) {
        db.moveMoney(JSON.parse(msg.content.toString()))
        // send email
      }
    });
  })).catch(error => console.warn(error));
};

module.exports = {
  publishMessage,
  consumeMessage
}
require('make-runnable');