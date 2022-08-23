import Company from "../../interfaces/Company";

export default class CompanyTransformer
{
    static transform(resource: Company)
    {
        return {
            id      : resource.id || '',
            name    : resource.name || '',
            phone   : resource.phone || '',
            email   : resource.email || '',
            logo    : resource.logo,
            website : resource.website,
        }
    }

    static transformMany(resources: Company[])
    {
        const items = [];

        resources.forEach(function (resource) {
            items.push(CompanyTransformer.transform(resource))
        })

        return items;
    }

}