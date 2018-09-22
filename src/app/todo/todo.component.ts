import { Component, OnInit } from '@angular/core';
import { Todo } from './model/todo';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class TodoComponent implements OnInit {

  displayedColumns: string[] = ['name', 'surname', 'title', 'completed'];

  todoList: Todo[];
  selectedToDo: Todo;
  cloned: Todo;

  constructor() { }
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
                const newItem = new Todo();
                newItem.id = item.id;
                const username = usersMap.get(item.userId).split(' ');
                newItem.name = username[0];
                newItem.surname = username[1];
                newItem.title = item.title;
                newItem.completed = item.completed;
                this.todoList.push(newItem);
              }
            });
            console.log(this.todoList);
            // }).filter( function(elem) {
            //   return elem;
            // });
          });
      });
  }

  refreshCompleted(todo: Todo, event) {
    console.log(todo, event);
  }

  createToDo() {
  }

  removeToDo(todo: Todo) {
    this.todoList = this.todoList.splice(this.todoList.indexOf(todo));
    this.selectedToDo = undefined;
  }

  saveToDo(todo: Todo, table) {
    const index = this.todoList.indexOf(todo);
    this.todoList[index] = this.cloned;
    this.selectedToDo = undefined;
    table.renderRows();
  }

  selectItem(row) {
    this.selectedToDo = row;
    this.cloned = Todo.clone(row);
    // console.log(this.selectedToDo);
  }
}
