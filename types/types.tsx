export interface LoginType {
	email: string;
	password: string;
}

export interface PostType {

	postBody: PostBody,
	preview: PostPreview,
	postUser: PostUser,

}	

export interface PostUser {

	userId: string,
	username: string,
	fullName: string,
	userPhotoURL: string,
	location: string,
	occupation: string,

}

export interface PostPreview {

	postId: string;
	postTitle: string,
	postPreview: string,
	previewPhotoURL: string,

}

export interface PostBody {

	body: string,
	comments: CommentType[],
	commentsCount: number,
	likes: string[],
	likesCount: number,
	timestamp: number,
	postId: string,

}	

export interface ReplyType {

	username: string,
	userId: string,
	fullName: string,
	userPhotoURL: string,
	body: string,
	timestamp: string,
	likes: string[],
	likesCount: number,
	replyId: string,
}

export interface CommentType {

	username: string,
	userId: string,
	fullName: string,
	userPhotoURL: string,
	body: string,
	timestamp: string,
	likes: string[],
	likesCount: number,
	commentId: string,
	replies: ReplyType[]

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
