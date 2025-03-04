declare module "db-local" {
    export interface DBLocalOptions {
        path: string;
    }

    export class DBLocal {
        constructor(options: DBLocalOptions);
        insert<T>(table: string, data: T): Promise<T>;
        find<T>(table: string, query: Partial<T>): Promise<T[]>;
        update<T>(table: string, query: Partial<T>, data: Partial<T>): Promise<void>;
        delete<T>(table: string, query: Partial<T>): Promise<void>;
    }

    export default DBLocal;
}
