export interface CRUD {
    list: (limit: number, page: number) => Promise<any>,
    create: (resource: any) => Promise<any>,
    update: (resourceId: any) => Promise<string>,
    show: (resourceId: any) => Promise<any>,
    delete: (resourceId: any) => Promise<string>,
}