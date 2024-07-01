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

export interface StoreCategoryType {

	categoryName: string,
	categoryPhotoURL: string,

}

export interface ProductDetails {

	detailTitle: string,
	detailDescription: string,

}

export interface StoreProductType {

	productName: string,
	productPhotoURL: string,
	productDescription: string,
	productQuantity: string,
	productDetails: ProductDetails[],

}

export interface StoreType {

	storeName: string,
	username: string,
	storeLogoURL: string,
	categories: StoreCategoryType[],
	products: StoreProductType[],

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

export interface BlogPostType {

	postId: string,
	userId: string,
	username: string,
	fullName: string,
	userPhotoURL: string,
	postTitle: string,
	postPreview: string,
	previewPhotoURL: string,
	value: string,
	commentsCount: number,
	likesCount: number,
	timestamp: number,

}	

export interface StoreContentType {

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

export interface H3XclusivePostType {

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

export interface ChatType {

	chatId: string,
	recipientName: string,
	recipientId: string,
	recipientPhotoURL: string,
	
}

export interface ToDoType {

	todo: string,
	checked: boolean,
	timestamp: number,
	dueTimestamp?: number,

}

export interface MessageType {

	username: string,
	userPhotoURL: string,
	timestamp: number,
	message: string,

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
	blogPostCount: number;
	h3XclusivePostCount: number;
	friendsCount: number;
	followersCount: number;
	followingCount: number;
}

export interface UserIDType {

	uid: string;
	username: string;

}
