import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // TODO: next receive the Post by id clicked and display... 
    // based on that post display the coments: from post => post.postId we will retrive all comments => comment.postId == post.postId

  }

}
