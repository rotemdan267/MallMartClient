import { UserImage } from "./UserImage";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    username: string;
    hashedPassword: string;
    image: UserImage;
    authorization: string;
}