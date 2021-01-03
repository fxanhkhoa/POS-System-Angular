import { IShop } from "./shop.model";

export interface FirebaseUser {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    myCustomData?: string;
    idToken?: string;
}

export interface IAddress {
    street: string;
    ward: string;
    district: string;
    city: string;
    nation: string;
}

export interface IUser extends FirebaseUser{
    shops: IShop[],
    phone: string,
    address: IAddress;
}