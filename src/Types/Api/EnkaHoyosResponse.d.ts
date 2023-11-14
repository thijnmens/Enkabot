export default interface EnkaHoyosResponse {
	[key: string]: GenshinHoyoData | HsrHoyoData;
}

interface GenshinHoyoData {
	uid: number;
	uid_public: boolean;
	public: boolean;
	live_public: boolean;
	verified: boolean;
	player_info: {
		level: number;
		nickname: string;
		signature: string;
		nameCardId: number;
		worldLevel: number;
		profilePicture: {
			avatarId: number;
			costumeId: number;
		};
		towerFloorIndex: number;
		towerLevelIndex: number;
		showAvatarInfoList: {
			level: number;
			avatarId: number;
			costumeId?: number;
		}[];
		showNameCardIdList: number[];
		finishAchievementNum: number;
	};
	hash: string;
	region: string;
	order: number;
	avatar_order: {
		[key: string]: number;
	};
	hoyo_type: number;
}

interface HsrHoyoData {
	uid: number;
	uid_public: boolean;
	public: boolean;
	live_public: boolean;
	verified: boolean;
	player_info: {
		level: number;
		headIcon: number;
		nickname: string;
		platform: string;
		signature: string;
		recordInfo: {
			avatarCount: number;
			challengeInfo: {
				noneScheduleMaxLevel: number;
			};
			equipmentCount: number;
			achievementCount: number;
			maxRogueChallengeScore: number;
		};
		worldLevel: number;
		friendCount: number;
		isDisplayAvatar: boolean;
		avatarDetailList: {
			rank?: number;
			level: number;
			avatarId: number;
			equipment: {
				tid: number;
				rank: number;
				_flat: {
					name: number;
					props: {
						type: string;
						value: number;
					}[];
				};
				level: number;
				promotion: number;
			};
			promotion: number;
			relicList: {
				tid: number;
				type: number;
				_flat: {
					props: {
						type: string;
						value: number;
					}[];
					setID: number;
					setName: number;
				};
				level?: number;
				mainAffixId: number;
				subAffixList?: {
					cnt: number;
					step?: number;
					affixId: number;
				}[];
				exp?: number;
			}[];
			skillTreeList: {
				level: number;
				pointId: number;
			}[];
			_assist?: boolean;
			pos?: number;
		}[];
	};
	hash: string;
	region: string;
	order: number;
	avatar_order: any;
	hoyo_type: number;
}
