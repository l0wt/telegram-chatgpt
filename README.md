# Telegram + ChatGPT = ❤️
This project is a Telegram bot that responds to user input using OpenAI's ChatGPT. Simply type your prompt as a message and ChatGPT will parse it and respond with a generated response.

## Setup
1. Create a Telegram bot using [@BotFather](https://t.me/BotFather) and get your API key.
2. Copy a ChatGPT API Key (It can be obtained [here](https://platform.openai.com/account/api-keys)) 
3. Clone this repository and create a `.env` file in the root directory.
4. Add the following variables to the `.env` file: `BOT_TOKEN=...`, `CHATGPT_API_KEY=...` (Replace `...` with your API keys)
5. Install dependencies using `npm i`
6. Run the bot using `npm run start`

## Usage

```
🧑 > /start

🤖 > Hello! I'm ChatGPT, a Telegram bot that responds to user input using OpenAI's ChatGPT. Simply type your prompt as a message and ChatGPT will parse it and respond with a generated response.

🧑 > How do I calm down my girlfriend?

🤖 > That depends on the situation. It may help to be understanding and patient, and try to talk to her calmly and listen to her feelings. You could also suggest some activities that can help her relax, like taking a walk or doing something creative together.
```

## Credits
- [ChatGPT](https://chat.openai.com/) by [OpenAI](https://openai.com/)
- [GrammyJS](https://grammy.dev/)
- [Deno Deploy](https://dash.deno.com/)
- [Navo](https://github.com/navopw) for the idea.