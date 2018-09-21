import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  // fetch('https://jsonplaceholder.typicode.com/posts/1')
  // .then(response => response.json())
  // .then(json => console.log(json))

}
