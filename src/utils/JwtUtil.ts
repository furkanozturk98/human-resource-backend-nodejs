import {sign, SignOptions, verify, VerifyOptions} from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';
import UserInterface from "../interfaces/User";
import User from "../models/User";
import {logger} from "../services/Logger";

/**
 * generates JWT used for local testing
 */
export async function generateToken(user?: UserInterface): Promise<string>
{
    if(!user){
        user = await User.findOne({email : 'admin@admin.com'})
    }

    // information to be encoded in the JWT
    const payload = {
        name        : user.name,
        userId      : user.id,
        accessTypes : [
            'employee.manage',
            'company.manage',
        ]
    };

    // read private key value
    const privateKey = {
        key        : fs.readFileSync(path.join(__dirname, './../../private.key')),
        passphrase : process.env.PASS_PHRASE
    };
    
    const signInOptions: SignOptions = {
        // RS256 uses a public/private key pair. The API provides the private key
        // to generate the JWT. The client gets a public key to validate the
        // signature
        algorithm : 'RS256',
        expiresIn : '1d',
    };

    // generate JWT
    const jwt = sign(payload, privateKey, signInOptions);
    logger.info(jwt);

    return jwt;
}

interface TokenPayload {
    exp: number;
    accessTypes: string[];
    name: string;
    userId: number;
}

/**
 * checks if JWT token is valid
 *
 * @param token the expected token payload
 */
export function validateToken(token: string): Promise<TokenPayload> {
    const publicKey = fs.readFileSync(path.join(__dirname, './../../public.key'));

    const verifyOptions: VerifyOptions = {
        algorithms : ['RS256'],
    };

    return new Promise((resolve, reject) => {
        verify(token, publicKey, verifyOptions, (error, decoded: TokenPayload) => {
            if (error) return reject(error);

            resolve(decoded);
        })
    });
}