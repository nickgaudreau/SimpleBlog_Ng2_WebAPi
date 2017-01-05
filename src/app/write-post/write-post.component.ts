import { Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import { IPost } from '../posts/IPost';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { PostServices } from '../posts/posts.service';
import { Subscription } from 'rxjs/Subscription';

declare var $: any;

@Component({
  selector: 'app-write-post',
  templateUrl: './write-post.component.html',
  styleUrls: ['./write-post.component.css']
})
export class WritePostComponent implements OnInit {
  posts: IPost[];
  errorMessage: string;
  postSaved : boolean = false;
  private postId : number;
  private postUser : string;
  private subscription: Subscription;

  private _activatedRoute: ActivatedRoute;
  private _postServices: PostServices;
  private _formBuilder: FormBuilder;

  savePostForm: FormGroup;  

  //@Output() childReadyEvent: EventEmitter<IPost[]> = new EventEmitter();

  constructor(activatedRoute: ActivatedRoute, postServices: PostServices, formBuilder: FormBuilder) {
    this._activatedRoute = activatedRoute;
    this._postServices = postServices;
    this._formBuilder = formBuilder;
    
    this.buildForm();
  }

  buildForm() {
    this.savePostForm = this._formBuilder.group({
      post_title: [null, Validators.required],
      post_text: [null, Validators.required]
    })
  }

  ngOnInit() {
    //let username = this._activatedRoute.snapshot.params['username']; 
    this.postUser = "admin";//username; // for now until have membership pro

    // $ for summernote to load
    $('#summernote').summernote();
  }

  // TODO listener on success posts added
  ngOnChanges() {
    // observable required on changes... kind of
    console.log("WritePostCompo.ngOnChanges()");  
  }

  // on submit method
  savePost(event) {
    console.log(event);
    let form = this.savePostForm.value;
    if (this.postUser != null && this.postUser != '') {
      let post: IPost = {
        id: 0,
        title: form.post_title,
        createdDate: new Date().toLocaleDateString(), // server side, but need it here too due to async issue
        text: $('#summernote').summernote('code'),
        username: this.postUser
      }
      this._postServices.create(post).subscribe(
        data => { this.onSuccessPostSaved(data) },
        error => this.errorMessage = <any>error,
        () => { }
      )

    }
    else {
      // display error page or something
      console.error("posts length 0 or null");
      this.postSaved = false;
    }
  }

  onSuccessPostSaved(data : IPost){
      if(this.posts == null)
        this.posts = [data]
      else
        this.posts.push(data);
        
      this.postSaved = true;
      setTimeout(() => this.postSaved = false, 2000);
  }

}
