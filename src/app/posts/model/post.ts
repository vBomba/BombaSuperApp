export class Post {
    constructor(public id: number,
        public name: string,
        public surname: string,
        public title: string,
        public body: string) { }

    static clone(original: Post) {
        return new Post(original.id,
            original.name,
            original.surname,
            original.title,
            original.body);
    }
}
