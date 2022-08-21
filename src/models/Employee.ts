import * as mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import Employee from "../interfaces/Employee";

const schema = new mongoose.Schema({
    firstName  : String,
    lastName   : String,
    email      : String,
    phone      : String,
    company_id : String
},{
    versionKey : false
});

schema.plugin(paginate);

const model = mongoose.model<Employee, mongoose.PaginateModel<Employee>>('Employee', schema);

export default model;