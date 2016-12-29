import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // TODO: next receive the Post by id clicked and display... 
    // based on that post display the coments: from post => post.postId we will retrive all comments => comment.postId == post.postId

  }

}
