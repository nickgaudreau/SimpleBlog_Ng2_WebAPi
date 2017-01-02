import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { IComment } from './IComment';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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

  private _activatedRoute: ActivatedRoute;
  private _commentsServices: CommentsServices;
  private _formBuilder: FormBuilder;

  saveCommentForm: FormGroup;

  commentSaved : boolean = false;

  //@Output() childReadyEvent: EventEmitter<IComment[]> = new EventEmitter();

  constructor(activatedRoute: ActivatedRoute, commentsServices: CommentsServices, formBuilder: FormBuilder) {
    this._activatedRoute = activatedRoute;
    this._commentsServices = commentsServices;
    this._formBuilder = formBuilder;
    
    this.buildForm();
  }

  buildForm() {
    this.saveCommentForm = this._formBuilder.group({
      comment_text: [null, Validators.required]
    })
  }

  ngOnInit() {
    console.log('init child commments');
    // this enough on load
    let id = +this._activatedRoute.snapshot.params['id']; // the + is a JS shortcut to change a string into a number
    console.log("comments ts " + id); // the + is a JS shortcut to change a string into a number)
    this.getCommentsWhere(id);

  }

  // TODO listener on success comments added
  ngOnChanges() {
    // observable required on changes... kind of
    console.log("CommentsComponent.ngOnChanges()");
    // this.subscription = this._activatedRoute.params.subscribe(
    //     params => {
    //         let id = +params['id'];
    //         this.getCommentsWhere(id);
    // });  
  }

  getCommentsWhere(id: number) {
    console.log("CommentsComponent.getCommentsWhere()");
    this._commentsServices.getAllWhere(id).subscribe(
      comments => this.comments = comments,
      error => this.errorMessage = <any>error,
      () => { console.log(this.comments); }
    )
  }


  saveComment(event) {
    console.log(event);
    let txt = this.saveCommentForm.value;
    console.log(txt.comment_text);
    if (this.comments != null && this.comments.length > 0) {
      let comment: IComment = {
        id: 0,
        createdDate: "", // server side
        text: txt.comment_text,
        username: this.comments[0].username, // for now
        postId: this.comments[0].postId
      }
      this._commentsServices.create(comment).subscribe(
        obj => { this.onSuccessCommentSaved(obj, comment) },
        error => this.errorMessage = <any>error,
        () => { }
      )

    }
    else {
      // display error page or something
      console.error("comments length 0 or null");
      this.commentSaved = false;
    }
  }

  onSuccessCommentSaved(data : IComment, userComment : IComment){
      userComment.postId = data.postId;
      userComment.createdDate = data.createdDate;
      this.comments.push(userComment);
      this.commentSaved = true;
      setTimeout(() => this.commentSaved = false, 500);
  }

}
