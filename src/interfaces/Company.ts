import { Document } from 'mongoose';

interface Company extends Document
{
    name: string;
    adress?: string;
    phone?: string;
    email?: string;
    logo?: string,
    address?: string
    website?: string
}

export default Company;