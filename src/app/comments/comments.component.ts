import { Component, OnInit, OnChanges } from '@angular/core';
import { IComment } from './IComment';
import { ActivatedRoute } from '@angular/router';

import { CommentsServices } from '../comments/comments.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnChanges {
  title: string = "Comments API";
  comments: IComment[];
  errorMessage: string;
  private subscription: Subscription;

  private _activatedRoute : ActivatedRoute;
  private _commentsServices: CommentsServices;

  constructor(activatedRoute : ActivatedRoute, commentsServices: CommentsServices){
      this._activatedRoute = activatedRoute;
      this._commentsServices = commentsServices;
  }

  ngOnInit() {
    // this enough on load
    let id = +this._activatedRoute.snapshot.params['id']; // the + is a JS shortcut to change a string into a number
    console.log("comments ts " + id); // the + is a JS shortcut to change a string into a number)
    this.getCommentsWhere(id);
     
  }

  // TODO listener on success comments added
  ngOnChanges(){
    // observable required on changes... kind of
    console.log("CommentsComponent.ngOnChanges()");
    this.subscription = this._activatedRoute.params.subscribe(
        params => {
            let id = +params['id'];
            this.getCommentsWhere(id);
    });  
  }

  getCommentsWhere(id: number){
    console.log("CommentsComponent.getCommentsWhere()");
    this._commentsServices.getAllWhere(id).subscribe(
      comments => this.comments = comments,
      error => this.errorMessage = <any>error, 
      () => console.log(`comments all where id  length: ${this.comments.length}`) 
    )
  }

}
