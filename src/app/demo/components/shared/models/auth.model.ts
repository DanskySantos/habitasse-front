export class AuthModel {
    access_token!: string;
    refresh_token!: string;
    username!: string;
    userId!: string;
    userRole!: string;
    remainingDays!: number;

    constructor() {
    }
}
