import User from "../../interfaces/User";

export default class UserProfileTransformer
{
    static transform(resource: User)
    {
        return {
            id    : resource.id || '',
            name  : resource.name || '',
            email : resource.email || '',
        }
    }

    static transformMany(resources: User[])
    {
        const items = [];

        resources.forEach(function (resource) {
            items.push(UserProfileTransformer.transform(resource))
        })

        return items;
    }
}