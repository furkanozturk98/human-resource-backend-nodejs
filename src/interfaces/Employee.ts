import { Document } from 'mongoose';

interface Employee extends Document
{
    firstName: string;
    lastName: string;
    email?: string;
    phone: string;
    company_id: number
}

export default Employee;