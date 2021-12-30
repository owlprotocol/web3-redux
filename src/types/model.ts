export default interface Model<T = any> {
    create: (item: T) => any;
    update: (item: T) => any;
    upsert: (item: T) => any;
    withId: (id: string) => any;
}
