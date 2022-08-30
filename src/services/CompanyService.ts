import {CRUD} from "../common/interfaces/crud.interface";
import CompanyInterface from "../interfaces/Company";
import Company from "../models/Company";
import {logger} from "./Logger";

class CompanyService implements CRUD
{
    /**
     * @param limit
     * @param page
     */
    async getPaginatedData(limit: number, page: number)
    {
        return await Company.paginate({}, {
            page         : page,
            limit        : limit,
            customLabels : {
                docs : 'data',
            }
        });
    }

    async list()
    {
        return await Company.paginate({}, {
            customLabels : {
                docs : 'data',
            }
        });
    }

    /**
     * @param id
     */
    async show(id: string)
    {
        return Company.findById(id);
    }

    /**
     * @param resource
     */
    async create(resource: CompanyInterface)
    {
        try{
            const company = await Company.create(resource);
            logger.info("Company Created : ", resource);

            return company;
        }
        catch (e) {
            logger.error("Error On Creating Company : ", {
                error : e
            });
        }
    }

    /**
     * @param id
     * @param resource
     */
    async update(id: string, resource: CompanyInterface)
    {
        try {
            const company = await Company.findByIdAndUpdate(id, resource, {new : true});
            logger.info("Company Updated : ", resource);

            return company;
        }
        catch (e) {
            logger.error("Error On Updating Company : ", {
                error : e
            });
        }
    }

    /**
     * @param id
     */
    async delete(id: string): Promise<void>
    {
        try {
            await Company.findByIdAndDelete(id);
            logger.info("Company Deleted : ", id);
        }
        catch (e) {
            logger.error("Error On Deleting Company : ", {
                error : e
            });
        }
    }

    /**
     * @param name
     */
    async getCompanyByName(name: string)
    {
        const query = Company.findOne({name : name})
        await query.clone();

        return query;
    }
}

export default new CompanyService();