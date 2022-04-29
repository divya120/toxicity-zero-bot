const { Client, Intents } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

require("@tensorflow/tfjs");
const toxicity = require("@tensorflow-models/toxicity");
// The minimum prediction confidence.
const threshold = 0.9;
let model;
const sentences = ["you suck"];

// Load the model. Users optionally pass in a threshold and an array of
// labels to include.
// toxicity.load(threshold).then((model) => {
// });

client.on("ready", async () => {
  model = await toxicity.load(threshold);
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;

  let text = msg.content;
  let predictions = await model.classify(text);
  predictions.forEach((predictions) => {
    if (predictions.results[0].match) {
      msg.reply(`Warning! ${predictions.label} found in your message. Please Delete.`,{tts:true});
    }
  });
});

client.login("OTY5NDczMDExNzQyODE0MjQ4.Ymt6GQ.3jpoocTFJGxB5Muej4J7JB7LFnc");
