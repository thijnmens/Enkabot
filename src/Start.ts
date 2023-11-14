import readline from 'readline';
import process from 'process';
import * as dotenv from 'dotenv';
import RevoltBot from './Revolt/Revolt.ts';
import Bot from '@Types/Bot.ts';

dotenv.config();

const Bots: Bot[] = [];

if (process.argv.includes('--revolt') || process.argv.includes('-R')) {
	createRevoltBot();
} else if (process.argv.includes('--discord') || process.argv.includes('-D')) {
	createDiscordBot();
} else if (process.argv.includes('--all') || process.argv.includes('-A')) {
	createRevoltBot();
	createDiscordBot();
} else {
	startWithInput();
}

function createRevoltBot() {
	new RevoltBot(process.env.REVOLT_TOKEN || '', 'e!')
		.Start()
		.then(bot => Bots.push(bot));
}

function createDiscordBot() {
	throw Error('Not yet implemented');
}

function startWithInput() {
	const stdIn = process.stdin;
	const stdOut = process.stdout;

	readline
		.createInterface(stdIn, stdOut)
		.question(
			'Which bot should be started, [revolt, discord, all]',
			(answer: string) => {
				switch (answer.trim().toLowerCase()) {
					case 'revolt':
						createRevoltBot();
						break;

					case 'discord':
						createDiscordBot();
						break;

					case 'all':
						createRevoltBot();
						createDiscordBot();
						break;

					default:
						console.error(`Unknown bot: ${answer}`);
						break;
				}
			}
		);
}
