import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatListModule, MatTableModule, MatInputModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { InfoComponent } from './Info/info.component';
import { TodoComponent } from './todo/todo.component';
import { PostsComponent } from './posts/posts.component';
import { MainComponent } from './main/main.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

export const modules = [BrowserModule, BrowserAnimationsModule];

const appRoutes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  { path: 'info', component: InfoComponent },
  { path: 'main', component: MainComponent },
  { path: 'main/todo', component: TodoComponent },
  { path: 'main/posts', component: PostsComponent },
  { path: '**', redirectTo: 'main' }
];

@NgModule({
  declarations: [
    AppComponent, InfoComponent, TodoComponent, PostsComponent, MainComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    // tslint:disable-next-line:max-line-length
    MatButtonModule, MatCheckboxModule, MatIconModule, MatSidenavModule, MatMenuModule, MatButtonToggleModule, MatListModule, MatTableModule, MatInputModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true }
    ),

    ...modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
