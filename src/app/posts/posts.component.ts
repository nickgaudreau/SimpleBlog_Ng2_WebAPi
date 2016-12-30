import { Component, OnInit } from '@angular/core';
import { IPost } from './IPost';
import { PostServices } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: IPost[];
  errorMessage: string;

  private _postService: PostServices;
  constructor(postService: PostServices) {
    this._postService = postService;
  }


  ngOnInit() {
    this._postService.getAll()
      .subscribe(
      data => {this.posts = data; console.log("data.length: " + data.length)}, // here
      error => this.errorMessage = <any>error // <any> is a cat ops to any data type
      );

    // testing CRUD below

    //ok
    //this._postService.getById(1).subscribe();


    let post: IPost = {
        id: 0,
        title: "From Ng2",
        createdDate: "",
        text: "THis is a new post form the lcinet ng 2 app",
        username: "admin"
    };
    // boolean -> ok
    //this._postService.create(post).subscribe();

  }

}
