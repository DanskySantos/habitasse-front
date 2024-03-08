export interface User {
  name: string;
  usernameForDto: string;
  email: string;
  birthdate?: string;
  person: {
    name: string;
    birthday: string;
    phone: string;
  };
  currentPassword: string;
  newPassword: string;
}