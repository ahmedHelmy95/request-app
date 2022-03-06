import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs';

import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.onCreatePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = false;
    this.postService.onFetchPosts().subscribe(
      (res) => {
        this.isFetching = true;
        this.loadedPosts = res;
      },
      (err) => {
        this.error = err.error.error;
      }
    );
  }
  onHandllError() {
    this.error = null;
  }
  onClearPosts() {
    this.postService.deletePosts().subscribe(
      (res) => {
        this.loadedPosts = [];
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
