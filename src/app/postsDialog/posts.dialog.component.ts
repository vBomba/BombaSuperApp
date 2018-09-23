import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Post } from '../posts/model/post';

@Component({
  selector: 'app-posts-dialog',
  templateUrl: './posts.dialog.component.html',
  styleUrls: ['./posts.dialog.component.css']
})

export class PostsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PostsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  saveNewPost(name: string, surname: string, title: string, body: string) {
    this.data.name = name;
    this.data.surname = surname;
    this.data.title = title;
    this.data.body = body;
    this.dialogRef.close(this.data);
  }
}
