import { Document } from 'mongoose';

interface Employee extends Document
{
    first_name: string;
    last_name: string;
    email?: string;
    phone: string;
    company_id: string,
    company: {
        id: string,
        name: string,
        address: string,
        phone: string,
        email: string,
        logo: string,
        website: string
    }
}

export default Employee;