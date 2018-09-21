import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoData = [];
  userData = [];

  constructor() { }

  ngOnInit() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((data) => {
        this.userData = data;
      });

      fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then((data) => {
        this.todoData = data;
      });
  }


}
