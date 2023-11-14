import ICommand from '@Types/ICommand.ts';

export function Ping(): ICommand {
	return {
		message: 'Pong!',
	};
}
