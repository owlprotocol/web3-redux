export interface IdDefined {
    id: string;
}

export type ModelWithId<T> = IdDefined & T;

export interface ORMModel<T> {
    create: (item: T) => any;
    update: (item: T) => any;
    upsert: (item: T) => any;
    withId: (id: string) => any;
}
