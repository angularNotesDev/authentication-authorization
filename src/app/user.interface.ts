// Current user
export interface UserInterface {
    email: string;
    username: string;
    token: string; // This is the JWT from the server
    image?: string;
}

// Sign In form data
export interface signInFormInterface {
    email: string | null;
    password: string | null;
}

// Sign Up form data
export interface signUpFormInterface extends signInFormInterface{
    username: string | null;
}