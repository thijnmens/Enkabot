export default interface EnkaProfileResponse {
	username: string;
	profile: {
		bio: string;
		level: number;
		signup_state: number;
		avatar: string;
	};
	id: number;
}
