import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    company_id: Number
});

const model = mongoose.model('Employee', schema);

export default model;