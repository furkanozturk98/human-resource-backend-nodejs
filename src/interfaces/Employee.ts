import { Document } from 'mongoose';

interface Employee extends Document
{
    firstName: string;
    lastName: string;
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