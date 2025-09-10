export interface User {
    image: string | undefined;
    uid: string;
    email: string;
    password: string;
    name?: string;
    phoneNumber?: string;
    address?: string;
    bio? : string;
    createdAt: string;  
    photoURL?: string | null;
}