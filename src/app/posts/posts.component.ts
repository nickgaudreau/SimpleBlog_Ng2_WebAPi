import { Component, OnInit } from '@angular/core';
import { IPost } from './IPost';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: IPost[];
  errorMessage: string;

  private _postService: PostsService;
  constructor(productService: PostsService) {
    this._postService = productService;
  }


  ngOnInit() {
    this._postService.getAll()
      .subscribe(
      data => this.posts = data, // here
      error => this.errorMessage = <any>error // <any> is a cat ops to any data type
      );

    // testing CRUD below

    //ok
    this._postService.getById(1).subscribe();


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
