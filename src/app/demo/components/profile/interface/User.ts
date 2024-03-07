export interface User{
    name: string;
    usernameForDto: string;
    email: string;
    password?: string;
    birthdate?: string;
    person: {
        name: string;
        birthday: string;
        phone: string;
      };
}