export class Todo {
    constructor(public id: number,
        public name: string,
        public surname: string,
        public title: string,
        public completed: boolean) { }

    static clone(original: Todo) {
        return new Todo(original.id,
            original.name,
            original.surname,
            original.title,
            original.completed);
    }
}
