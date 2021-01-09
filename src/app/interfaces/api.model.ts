import { IShop } from "./shop.model";
import { IAddress } from "./user.model";

export interface IResponse {
    result: boolean;
    msg: string;
}

export interface IUserDTO {
    email: string | undefined;
    name: string | undefined;
    shops: IShop[],
    phone: string,
    address: IAddress;
}