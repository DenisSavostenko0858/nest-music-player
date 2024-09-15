export interface UserInterface {
    id: number;
    name: string;
    email: string;
    password: string;
    lastName: string;
    about: string;
    comments: [
        {
            id: number;
            music:{
                name: string;
            }
            text: string;
            rating: number;
        }
    ];
}