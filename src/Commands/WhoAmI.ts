import ICommand from '@Types/ICommand.ts';

export function WhoAmI(username: string): ICommand {
	return {
		message: username,
	};
}
