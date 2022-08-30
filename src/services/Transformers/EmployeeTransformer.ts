import Employee from "../../interfaces/Employee";

export default class EmployeeTransformer
{
    static transform(resource: Employee)
    {
        return {
            id           : resource.id || '',
            first_name   : resource.first_name || '',
            last_name    : resource.last_name || '',
            email        : resource.email || '',
            phone        : resource.phone,
            company_id   : resource.company?.id,
            company_name : resource.company?.name
        }
    }

    static transformMany(resources: Employee[])
    {
        const items = [];

        resources.forEach(function (resource) {
            items.push(EmployeeTransformer.transform(resource))
        })

        return items;
    }

}