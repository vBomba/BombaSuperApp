export class Todo {
    id: number;
    name: string;
    surname: string;
    title: string;
    completed: boolean;
    static clone(original: Todo) {
        const a = new Todo();
        a.id = original.id;
        a.name = original.name;
        a.surname = original.surname;
        a.title = original.title;
        a.completed = original.completed;
        return a;
    }
}
