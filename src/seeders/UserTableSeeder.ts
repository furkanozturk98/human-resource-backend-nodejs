import User from "../models/User";

export default class UserTableSeeder
{
    async seed(): Promise<void>
    {
        const count = await User.where('email')
            .equals('admin@admin.com')
            .count();

        if(count) {
            return;
        }

        await User.create({
            'name'     : 'Admin',
            'email'    : 'admin@admin.com',
            'password' : 'password'
        });
    }
}