export enum Color {
	red,
	green,
	grey,
}

export class ColorGenerator {
	static SetColor(text: string, color: Color): string {
		return `$\\color{${Color[color]}}\\bf{${text}}$`;
	}
}
