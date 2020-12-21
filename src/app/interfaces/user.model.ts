import { IShop } from "./shop.model";

export interface FirebaseUser {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    myCustomData?: string;
}

export interface IUser extends FirebaseUser{
    shops: IShop[]
}