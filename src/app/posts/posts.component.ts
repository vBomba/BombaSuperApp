import { Component, OnInit } from '@angular/core';
import { Post } from './model/post';
import {MatDialog} from '@angular/material';

import { PostsDialogComponent } from '../postsDialog/posts.dialog.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {

  postList: Post[];
  cloned: Post;
  show = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((userList: any[]) => {
        const usersMap: Map<number, string> = new Map<number, string>();
        userList.slice(0, 3).forEach(user => {
          usersMap.set(user.id, user.name);
        });
        fetch('https://jsonplaceholder.typicode.com/posts')
          .then(response => response.json())
          .then((postData: any[]) => {
            this.postList = [];
            postData.forEach(item => {
              if (usersMap.has(item.userId) && this.postList.length < 100) {
                const username = usersMap.get(item.userId).split(' ');
                const newItem = new Post(item.id, username[0], username[1], item.title, item.body);
                this.postList.push(newItem);
              }
            });
          });
      });
  }

  switch(show: boolean) {
    this.show = show;
  }

  saveNewPost(name: string, surname: string, title: string, body: string) {
    const createItem = new Post(Math.max.apply(Math, this.postList.map(post => post.id)) + 1, name, surname, title, body);
    this.postList.unshift(createItem);
    this.show = false;
    this.fetchDB(createItem, 'POST');
  }

  removePost(postId: number) {
    this.postList.splice(this.postList.map((item) => item.id).indexOf(postId), 1);
    fetch('https://jsonplaceholder.typicode.com/posts/' + postId, {
      method: 'DELETE'
    });
  }

  openDialog(post: Post): void {
   this.dialog.open(PostsDialogComponent, {
      width: '450px',
      data: post
    });
  }

  private fetchDB(post: Post, type: string) {
    fetch('https://jsonplaceholder.typicode.com/posts/' + post.id, {
      method: type,
      body: JSON.stringify(post),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  }
}
