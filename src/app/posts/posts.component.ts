import { Component, OnInit } from '@angular/core';
import { Post } from './model/post';
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

  displayedColumns: string[] = ['name', 'surname', 'title', 'body'];

  postList: Post[];
  selectedPost: Post;
  cloned: Post;
  show = false;

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

  saveNewPost(name: string, surname: string, title: string, body: string, table) {
    const createItem = new Post(Math.max.apply(Math, this.postList.map(post => post.id)) + 1, name, surname, title, body);
    this.postList.unshift(createItem);
    this.show = false;
    table.renderRows();
    this.fetchDB(createItem, 'POST');
  }

  removePost(postId: number, table) {
    this.postList.splice(this.postList.map((item) => item.id).indexOf(postId), 1);
    this.selectedPost = undefined;
    fetch('https://jsonplaceholder.typicode.com/posts/' + postId, {
      method: 'DELETE'
    });
    table.renderRows();
  }

  editPost(name: string, surname: string, title: string, body: string, table) {
    const post: Post = new Post(this.cloned.id, name, surname, title, body);
    const index = this.postList.map((item) => item.id).indexOf(post.id);
    this.postList[index] = post;
    this.selectedPost = undefined;
    table.renderRows();
    this.fetchDB(post, 'PUT');
  }

  selectItem(row) {
    this.selectedPost = row;
    this.cloned = Post.clone(row);
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
