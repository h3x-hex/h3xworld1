export interface LoginType {
	email: string;
	password: string;
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
	timestamp: string,
	likesCount: number,
	replyId: string,
}

export interface CommentType {

	postId: string,
	username: string,
	userId: string,
	userPhotoURL: string,
	body: string,
	timestamp: string,
	likesCount: number,
	commentId: string,
	replies: number

}

export interface FriendsType {

	userId: string,
	fullname: string,
	username: string,
	userPhotoURL: string,
	dateAdded: string,

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
	friends: FriendsType[];

}

export interface UserIDType {

	uid: string;
	username: string;

}
