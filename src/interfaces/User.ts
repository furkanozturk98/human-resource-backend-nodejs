import { Document } from 'mongoose';

interface User extends Document
{
    id       : string,
    name     : string,
    email    : string,
    password : string,
}

export default User;