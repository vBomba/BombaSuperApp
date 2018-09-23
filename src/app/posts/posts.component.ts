import { Component, OnInit } from '@angular/core';
import { Todo } from './model/post';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class PostsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'surname', 'title', 'completed'];

  todoList: Todo[];
  selectedToDo: Todo;
  cloned: Todo;
  show = false;

  ngOnInit() {

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((userList: any[]) => {
        const usersMap: Map<number, string> = new Map<number, string>();
        userList.slice(0, 3).forEach(user => {
          usersMap.set(user.id, user.name);
        });
        fetch('https://jsonplaceholder.typicode.com/todos')
          .then(response => response.json())
          .then((todoData: any[]) => {
            this.todoList = [];
            todoData.forEach(item => {
              if (usersMap.has(item.userId) && this.todoList.length < 100) {
                const username = usersMap.get(item.userId).split(' ');
                const newItem = new Todo(item.id, username[0], username[1], item.title, item.completed);
                this.todoList.push(newItem);
              }
            });
          });
      });
  }

  switch(show: boolean) {
    this.show = show;
  }

  refreshCompleted(todo: Todo, event) {
    this.fetchDB(todo, 'PUT');
  }

  saveNewToDo(name: string, surname: string, title: string, table) {
    const createItem = new Todo(Math.max.apply(Math, this.todoList.map(todo => todo.id)) + 1, name, surname, title, false);
    this.todoList.unshift(createItem);
    this.show = false;
    table.renderRows();
    this.fetchDB(createItem, 'POST');
  }

  removeToDo(todoId: number, table) {
    this.todoList.splice(this.todoList.map((item) => item.id).indexOf(todoId), 1);
    this.selectedToDo = undefined;
    fetch('https://jsonplaceholder.typicode.com/todos/' + todoId, {
      method: 'DELETE'
    });
    table.renderRows();
  }

  editToDo(name: string, surname: string, title: string, table) {
    const todo: Todo = new Todo(this.cloned.id, name, surname, title, this.cloned.completed);
    const index = this.todoList.map((item) => item.id).indexOf(todo.id);
    this.todoList[index] = todo;
    this.selectedToDo = undefined;
    table.renderRows();
    this.fetchDB(todo, 'PUT');
  }

  selectItem(row) {
    this.selectedToDo = row;
    this.cloned = Todo.clone(row);
  }

  private fetchDB(todo: Todo, type: string) {
    fetch('https://jsonplaceholder.typicode.com/todos/' + todo.id, {
      method: type,
      body: JSON.stringify(todo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  }
}
