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
    this._postService.getApiPosts()
      .subscribe(
      data => this.posts = data, // here
      error => this.errorMessage = <any>error // <any> is a cat ops to any data type
      );

  }

}
