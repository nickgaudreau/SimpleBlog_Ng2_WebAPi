import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { CommentsComponent } from './comments/comments.component';
import { PostDetailsComponent } from './post-details/post-details.component';

import { PostServices } from './posts/posts.service';
import { CommentsServices } from './comments/comments.service';
import { WriteCommentComponent } from './write-comment/write-comment.component';
import { WritePostComponent } from './write-post/write-post.component';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    HomeComponent,
    CommentsComponent,
    PostDetailsComponent,
    WriteCommentComponent,
    WritePostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([   
            {
                path : 'Home', component : HomeComponent
            }, 
            {
                path : 'Posts', component : PostsComponent
            },
            {
                path : 'PostDetails/:id', component : PostDetailsComponent
            },
            { //default
                path : '', redirectTo : 'Home', pathMatch : 'full'
            },
            { // not found
                path : '**', component : HomeComponent // will have a page not found component
            }
    ])
  ],
  providers: [PostServices, CommentsServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
