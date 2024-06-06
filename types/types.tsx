export interface LoginType {
	email: string;
	password: string;
}

export interface FollowerType {
	username: string,
	userPhotoURL: string,
	followName: string,
	followPhotoURL: string,
}

export interface WalletType {
	username: string,
	address: string,
	privateKey: string,
	publicKey: string,
	seedPhrase: string,
}

export interface PostType {

	postId: string,
	userId: string,
	username: string,
	fullName: string,
	userPhotoURL: string,
	postTitle: string,
	postPreview: string,
	previewPhotoURL: string,
	commentsCount: number,
	likesCount: number,
	timestamp: number,

}	

export interface ReplyType {

	commentId: string,
	username: string,
	userId: string,
	userPhotoURL: string,
	body: string,
	timestamp: number,
	likesCount: number,
	replyId: string,
}

export interface CommentType {

	postId: string,
	username: string,
	userId: string,
	userPhotoURL: string,
	body: string,
	timestamp: number,
	likesCount: number,
	commentId: string,
	replies: number

}

export interface FriendsType {

	username: string,
	userPhotoURL: string,
	friendName: string,
	friendPhotoURL: string,
	dateAdded: number,
	friendId: string,
	
}

export interface GroupType {

	groupId: string,
	groupName: string,
	groupPhotoURL: string,
	participants: number,
	users: UserProfileType[],

}

export interface UserRegistrationType {

	id: string;
	email: string;
	username: string;
	firstName: string;
	lastName: string;
	fullName: string;
	occupation: string;
	location: string;
	links?: string[];
	bio: string;
	postCount: number;

}


export interface UserProfileType {

	id: string;
	email: string;
	username: string;
	firstName: string;
	lastName: string;
	fullName: string;
	occupation: string;
	location: string;
	links?: string[];
	bio: string;
	profilePhotoURL: string;
	postCount: number;
	friendsCount: number;
	followersCount: number;
	followingCount: number;
}

export interface UserIDType {

	uid: string;
	username: string;

}
