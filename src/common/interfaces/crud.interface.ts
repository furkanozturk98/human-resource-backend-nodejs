export interface CRUD {
    getPaginatedData: (limit: number, page: number) => Promise<any>,
    create: (resource: any) => Promise<any>,
    update: (id: any, resource: any) => Promise<any>,
    show: (id: any) => Promise<any>,
    delete: (id: any) => void
}