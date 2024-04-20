import * as fs from "fs";
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config";

import { fileURLToPath } from "url";
import * as path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    import(fileUrl(filePath)).then((command) => {
      command = command.default;
      // Set a new item in the Collection with the key as the command name and the value as the exported module
      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    });
  }
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  import(fileUrl(filePath)).then((event) => {
    event = event.default;
    if (event.once) {
      client.once(event.name, (...args) => {
        event.execute(...args);
      });
    } else {
      client.on(event.name, (...args) => {
        event.execute(...args);
      });
    }
  });
}
client.on(Events.GuildCreate, (created) => {
  // TODO: Create a boat when joining a server
  console.log("Created: ", created);
});

client.once(Events.ClientReady, (readyClient) => {
  // TODO: Restart activity jobs dropped after restart
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);

function fileUrl(filePath, options = {}) {
  if (typeof filePath !== "string") {
    throw new TypeError(`Expected a string, got ${typeof filePath}`);
  }

  const { resolve = true } = options;

  let pathName = filePath;
  if (resolve) {
    pathName = path.resolve(filePath);
  }

  pathName = pathName.replace(/\\/g, "/");

  // Windows drive letter must be prefixed with a slash.
  if (pathName[0] !== "/") {
    pathName = `/${pathName}`;
  }

  // Escape required characters for path components.
  // See: https://tools.ietf.org/html/rfc3986#section-3.3
  return encodeURI(`file://${pathName}`).replace(/[?#]/g, encodeURIComponent);
}
