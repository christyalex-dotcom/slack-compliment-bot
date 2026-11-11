require('dotenv').config();
const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  port: process.env.PORT || 3000
});

const compliments = [
  "You're doing an amazing job today! 🌟",
  "Your positive energy is contagious! 🔥",
  "You have brilliant ideas and fantastic problem-solving skills! 💡",
  "Slack is lucky to have you around! 🎉",
  "You make hard work look effortless! ⭐"
];

function getRandomCompliment() {
  return compliments[Math.floor(Math.random() * compliments.length)];
}

// Log all incoming events for debugging
app.use(async ({ logger, client, payload, next }) => {
  console.log("--> Incoming Slack Event Payload Received!");
  await next();
});

// Listen for @ComplimentBot mentions in channels
app.event('app_mention', async ({ event, say }) => {
  console.log("Mentioned in channel!");
  const compliment = getRandomCompliment();
  await say(`Hey <@${event.user}>! ${compliment}`);
});

// Listen for direct messages
app.message(async ({ message, say }) => {
  if (message.subtype === 'bot_message' || message.bot_id) return;
  console.log("Direct message received!");
  const compliment = getRandomCompliment();
  await say(`Hi <@${message.user}>! ${compliment}`);
});

(async () => {
  await app.start();
  console.log('⚡️ Slack compliment bot is running!');
})();  
