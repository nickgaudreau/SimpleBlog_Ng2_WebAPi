import { Injectable } from '@angular/core';
import { IPost } from '../posts/IPost';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class PostsService {

    private _webApiBaseUrl = "http://localhost:62806/v1/Posts/all"
    private _http : Http;

    constructor(http : Http){
        this._http = http;
    }

    getApiPosts(): Observable<IPost[]>{
        let headers = new Headers();
        headers.append("Authorization", "Basic YWRtaW46QWRtaW5XZWJBcGlEaQ=="); 
        headers.append("Content-Type", "application/x-www-form-urlencoded");

        return this._http.get(this._webApiBaseUrl, {headers : headers})
            .map( (response: Response) => <IPost[]> response.json() )
            .do(data => console.log(`All Data: \n ${ JSON.stringify(data) }`))
            .catch(this.handleError);
    }

    getApiPost(id: number): Observable<IPost> {
        return this.getApiPosts()
            .map((posts: IPost[]) => posts.find(p => p.id === id));
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }    

}