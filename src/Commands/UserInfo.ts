import RequestHandler from '../Utils/RequestHandler.ts';
import EmbedBuilder from '../Utils/EmbedBuilder.ts';
import ICommand from '../Types/ICommand.ts';
import { Color, ColorGenerator } from '../Types/Color.ts';
import EnkaProfileResponse from '../Types/Api/EnkaProfileResponse';
import EnkaHoyosResponse from '../Types/Api/EnkaHoyosResponse';
import * as console from 'console';

export async function UserInfo(username: string): Promise<ICommand> {
	try {
		const userInfo = await RequestHandler.Get<EnkaProfileResponse>(
			`profile/${username}`
		);

		const linkedAccounts = await RequestHandler.Get<EnkaHoyosResponse>(
			`profile/${username}/hoyos`
		);

		let isGenshinLinked = ColorGenerator.SetColor('Unlinked', Color.red);
		let isHsrLinked = ColorGenerator.SetColor('Unlinked', Color.red);

		for (let account in linkedAccounts) {
			if (linkedAccounts[account].hoyo_type === 0)
				isGenshinLinked = ColorGenerator.SetColor(
					'Linked',
					Color.green
				);
			if (linkedAccounts[account].hoyo_type === 1)
				isHsrLinked = ColorGenerator.SetColor('Linked', Color.green);
		}

		const embed = new EmbedBuilder()
			.AddTitle(userInfo.username)
			.AddColoredText(userInfo.profile.bio, Color.grey)
			.AddQuote(`Level: ${userInfo.profile.level}`)
			.AddNewLine()
			.AddTableRow(['Genshin', 'HSR'], true)
			.AddTableRow([isGenshinLinked, isHsrLinked])
			.RemoveLastLine()
			.Finish();

		return {
			message: embed,
		};
	} catch (e) {
		console.error(e);
		return {
			message: new EmbedBuilder()
				.AddTitle('Something went wrong!')
				.AddText('Does the user exist?')
				.Finish(),
		};
	}
}
