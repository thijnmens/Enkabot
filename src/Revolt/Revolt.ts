import { Client, Message } from 'revolt.js';
import * as console from 'console';
import Commands from '../Commands/Commands.ts';
import Bot from '@Types/Bot.ts';

export default class RevoltBot implements Bot {
	private client: Client;
	private readonly prefix: string = 'e!';
	private readonly token: string;

	constructor(token: string, prefix: string) {
		if (token.length !== 64) throw Error('Invalid revolt token');
		if (prefix.length === 0) throw Error('Invalid prefix');

		this.token = token;
		this.prefix = prefix;

		this.client = new Client();

		this.client.on('ready', () => this.onReady());
		this.client.on('message', message => this.onMessage(message));
	}

	public async Start(): Promise<RevoltBot> {
		await this.client.loginBot(this.token);
		return this;
	}

	private async onReady() {
		console.log(`Logged in`);
	}

	private async onMessage(message: Message) {
		if (!message.content) return;
		if (!message.content.trimStart().startsWith(this.prefix)) return;

		const splitMessage: string[] = message.content.trim().split(' ');
		const command: string = splitMessage[0].slice(this.prefix.length);
		const args: string[] = splitMessage.slice(1);

		switch (command.toLowerCase()) {
			/**
			 *		Ping
			 *		---
			 *		Responds with `Pong!`, used to test if the bot is correctly recieving messages
			 */
			case 'ping':
				message.reply(Commands.Ping().message, false);
				break;

			/**
			 * 		Info [username]
			 * 		---
			 * 		Get enka info for a given username
			 */
			case 'info':
				if (!RequiredArgs(1)) return;
				Commands.UserInfo(args[0]).then(res =>
					message.reply(res.message, false)
				);
				break;

			default:
				message.channel?.sendMessage(`Unknown command: ${command}`);
		}

		function RequiredArgs(amount: number): boolean {
			if (args.length < amount) {
				message.reply(
					`Not enough args, required: ${amount}, provided: ${args.length}`
				);
				return false;
			}
			return true;
		}
	}
}
