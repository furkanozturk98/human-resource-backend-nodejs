import * as mongoose from 'mongoose';
import employees from "../schemas/EmployeeSchema";

class EmployeeController {
    // user = mongoose.model('user', userSchema);

    public static fetch(id, callback) {
        employees.findById(id, callback)
    }

    public static store(posts, callback) {
        employees.create(posts, callback)
    }
}

export default EmployeeController;