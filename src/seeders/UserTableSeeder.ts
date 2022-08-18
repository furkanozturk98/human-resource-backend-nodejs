import Employee from "../models/Employee";
import * as argon2 from "argon2";
import User from "../models/User";

export default class UserTableSeeder
{
    async seed()
    {
        let count = await User.where('email')
            .equals('admin@admin.com')
            .count();

        if(count) {
            return;
        }

        await User.create({
            'name': 'Admin',
            'email': 'admin@admin.com',
            'password': await argon2.hash('password')
        });
    }
}