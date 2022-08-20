import {DocumentDefinition} from "mongoose";
import UserInterface from "../interfaces/User";
import User from "../models/User";
import bcrypt from "bcrypt";
import {generateToken} from "../utils/JwtUtil";

class AuthService
{
    static async register(user: DocumentDefinition<UserInterface>): Promise<void>
    {
        try {
            await User.create(user);
        } catch (error) {
            throw error;
        }
    }

    static async login(user: DocumentDefinition<UserInterface>): Promise<{ user: { name: string; email: string }; token: string }>
    {
        const foundUser: UserInterface = await User.findOne({email : user.email});

        if (foundUser) {
            const isMatch = bcrypt.compareSync(user.password, foundUser.password);

            if (isMatch) {
                const token = await generateToken(foundUser);

                return {
                    user : {
                        name  : foundUser.name,
                        email : foundUser.email
                    },
                    token : token
                };
            }
        }

        throw new Error('Email or password or is not correct');
    }
}

export default AuthService;