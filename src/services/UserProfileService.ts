import User from "../models/User";

class UserProfileService
{
    /**
     * @param id
     */
    async show(id: string)
    {
        return User.findById(id);
    }
}

export default new UserProfileService();