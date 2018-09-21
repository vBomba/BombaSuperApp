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

  gotoInfo() {
    this.router.navigate(['info']);
    this.show = false;
  }

  gotoMain() {
    this.router.navigate(['main']);
    this.show = true;
  }

}
