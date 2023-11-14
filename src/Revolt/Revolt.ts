import { Client, Message } from 'revolt.js';
import Bot from '@Types/Bot';
import * as console from 'console';
import ICommand from '@Types/ICommand.ts';
import Commands from '../Commands/Commands.ts';

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
			case 'ping':
				message.reply(Commands.Ping().message, true);
				break;

			case 'whoami':
				let res: ICommand;
				args.length > 0
					? (res = Commands.WhoAmI(args[0]))
					: (res = Commands.WhoAmI(
							message.username || this.client.user!.username
					  ));
				message.reply(res.message);
				break;

			default:
				message.channel?.sendMessage(`Unknown command: ${command}`);
		}
	}
}
