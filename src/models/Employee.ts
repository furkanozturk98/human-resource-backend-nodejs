import * as mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import Employee from "../interfaces/Employee";

const schema = new mongoose.Schema({
    first_name : String,
    last_name  : String,
    email      : String,
    phone      : String,
    company    : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'Company'
    }
},{
    versionKey : false
});

schema.plugin(paginate);

const model = mongoose.model<Employee, mongoose.PaginateModel<Employee>>('Employee', schema);

export default model;