import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  onCreatePost(title: string, content: string) {
    // Send Http request
    const postData = { title: title, content: content };
    this.http
      .post<{ name: string }>(`${environment.appUrl}/posts.json`, postData, {
        observe: 'body',
      })
      .subscribe((posts) => {
        console.log(posts);
      });
  }

  onFetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(`${environment.appUrl}/posts.json`, {
        headers: new HttpHeaders({ heheheh: 'heheheh' }),
        params: new HttpParams().set('sss', 'ddd'),
      })
      .pipe(
        map((res: { [key: string]: Post }) => {
          const data: Post[] = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              data.push({ ...res[key], id: key });
            }
          }
          return data;
        })
      );
  }

  deletePosts() {
    return this.http.delete(`${environment.appUrl}/posts.json`);
  }
}
