export interface IProfile {
    email: string;
    uid: string;
    createdAt: Date;
    updatedAt: Date;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    shops: string[];
    roles: string;
    picture: string;
    googleName: string;
}

export interface IProfileResponse extends Omit<IProfile, 'shops'> {
    shops: string;
}

export interface IResponseTokenFromRefreshToken {
    access_token: string;
    expires_in: string;
    id_token: string;
    project_id: string;
    refresh_token: string;
    token_type: string;
    user_id: string;
}
