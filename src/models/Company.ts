import * as mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import Company from "../interfaces/Company";

const schema = new mongoose.Schema({
    name    : String,
    address : String,
    phone   : String,
    email   : String,
    logo    : String,
    website : String
},{
    versionKey : false
});

schema.plugin(paginate);

const model = mongoose.model<Company, mongoose.PaginateModel<Company>>('Company', schema);

export default model;