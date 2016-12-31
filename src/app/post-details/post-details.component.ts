import { Component, OnInit } from '@angular/core';
import { IPost } from '../posts/IPost';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { PostServices } from '../posts/posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  postTitle: string;
  post: IPost;
  errorMessage: string;
  private subscription: Subscription;

  private _activatedRoute : ActivatedRoute;
  private _router : Router;
  private _postService: PostServices;

  constructor(activatedRoute : ActivatedRoute, router : Router, postService : PostServices){
      this._activatedRoute = activatedRoute;
      this._router = router;
      this._postService = postService;
  }

  ngOnInit() {
    // snapshot is static and get id from generated page url
    let id = +this._activatedRoute.snapshot.params['id']; // the + is a JS shortcut to change a string into a number 
    this.postTitle = `${id}`;
    // .params use observable, this can be useful if url params change without moving from the page
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
    //this.getComments();
  }
  

}
