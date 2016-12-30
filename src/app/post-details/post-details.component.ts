import { Component, OnInit } from '@angular/core';
import { IPost } from '../posts/IPost';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { PostServices } from '../posts/posts.service';

import { CommentsServices } from '../comments/comments.service';
import { IComment } from '../comments/IComment';



@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  postTitle: string;
  post: IPost;
  comments: IComment[];
  errorMessage: string;
  private subscription: Subscription;

  private _activatedRoute : ActivatedRoute;
  private _router : Router;
  private _postService: PostServices;
  private _commentsServices: CommentsServices;

  constructor(activatedRoute : ActivatedRoute, router : Router, postService : PostServices, commentsServices: CommentsServices){
      this._activatedRoute = activatedRoute;
      this._router = router;
      this._postService = postService;
      this._commentsServices = commentsServices;
  }

  ngOnInit() {
    // TODO: next receive the Post by id clicked and display... 
    // based on that post display the coments: from post => post.postId we will retrive all comments => comment.postId == post.postId
    let id = +this._activatedRoute.snapshot.params['id']; // the + is a JS shortcut to change a string into a number 
    this.postTitle = `${id}`;
    // get product base on id
    this.subscription = this._activatedRoute.params.subscribe(
        params => {
            let id = +params['id'];
            this.getPost(id);
    });  
  }

  getPost(id: number) {
      this._postService.getById(id).subscribe(
          post => this.post = post,
          error => this.errorMessage = <any>error, 
          () =>  this.onComplete() 
      );
  }

  onComplete(){
    console.log('completed method');
    this.postTitle = this.post.title + ": " + this.post.id;
    this.getComments();
  }

  getComments(){
    this._commentsServices.getAll().subscribe(
      comments => this.comments = comments,
      error => this.errorMessage = <any>error 
    )
  }

}
