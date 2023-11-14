import { Color } from '../Types/Color.ts';

export default class EmbedBuilder {
	private embed: string;

	constructor() {
		this.embed = '';
	}

	AddNewLine(): EmbedBuilder {
		this.embed += '\n';
		return this;
	}

	AddTitle(title: string): EmbedBuilder {
		this.embed += `# ${title}\n`;
		return this;
	}

	AddText(title: string): EmbedBuilder {
		this.embed += `${title}\n`;
		return this;
	}

	AddQuote(quote: string, indentLevel: number = 1): EmbedBuilder {
		this.embed += '>'.repeat(indentLevel) + quote + '\n';
		return this;
	}

	AddSingleCodeBlock(text: string): EmbedBuilder {
		this.embed += `\`${text}\``;
		return this;
	}

	AddTableRow(row: string[], seperator: boolean = false): EmbedBuilder {
		this.embed += '|';
		for (let text in row) {
			this.embed += ` ${row[text]} |`;
		}

		this.embed += '\n';

		if (seperator) this.embed += '| :-: |'.repeat(row.length) + '\n';

		return this;
	}

	AddColoredText(text: string, color: Color): EmbedBuilder {
		this.embed += `$\\color{${Color[color]}}\\textsf{${text}}$\n`;
		return this;
	}

	RemoveLastLine(): EmbedBuilder {
		this.embed = this.embed.substring(0, this.embed.lastIndexOf('\n'));
		return this;
	}

	Finish(): string {
		return this.embed;
	}
}
