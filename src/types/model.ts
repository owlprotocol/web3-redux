export interface IdDefined {
    id: string;
}

export type ModelWithId<T> = IdDefined & T;
export interface Model<T> {
    create: (item: ModelWithId<T>) => any;
    update: (item: ModelWithId<T>) => any;
    upsert: (item: ModelWithId<T>) => any;
    withId: (id: string) => any;
}

export default Model;
