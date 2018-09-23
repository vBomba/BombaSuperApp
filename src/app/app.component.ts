import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  show = true;

  constructor(private route: ActivatedRoute, private router: Router) { }

  switch(show: boolean) {
    this.show = show;
  }

}
