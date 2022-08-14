import * as mongoose from 'mongoose';

export interface Employee {
    id: number | null;
    firstName: string;
    lastName: string;
    email?: string;
    phone: string;
    company_id: number
}

const schema = new mongoose.Schema({
    firstName: String,
    content: String,
    title: String,
    class: String
});

class employee {

    user = mongoose.model('employee', schema);

    public saveUser(posts, callback) {
        this.user.create(posts, callback)
    }

    public fetchUser(id, callback) {
        this.user.findById(id, callback)
    }
}

export default employee;