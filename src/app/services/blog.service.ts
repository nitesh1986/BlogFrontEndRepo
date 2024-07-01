import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BlogPost } from '../models/blog-post.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  
  GetBlogPosts(): Observable<BlogPost[]> 
  {
    return this.http.get<BlogPost[]>(this.apiUrl).pipe(
      catchError(this.handleError));
  }

  //Blog Creation
  CreateBlogPost(blogPost: BlogPost): Observable<void> 
  {
    return this.http.post<void>(this.apiUrl, blogPost).pipe(
      catchError(this.handleError)
    );
  }

  //Blog Updation
 UpdateBlogPost(post: BlogPost): Observable<void> 
  {
    return this.http.put<void>(`${this.apiUrl}/${post.id}`, post).pipe(
      catchError(this.handleError)
    );
  }
  
  //Blog deletion
 deleteBlogPost(id: number): Observable<void> 
  {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  
  private handleError(error: HttpErrorResponse) 
  {
    let errorMessage = 'Unknown error!';
    
    if (error.error instanceof ErrorEvent) 
      {
      // Client-side error
      console.error('Client-side error:', error.error.message);
      errorMessage = `Client-side error: ${error.error.message}`;
      } else 
      {
      // Backend error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      errorMessage = `Backend error: ${error.status}, body was: ${error.error}`;
      }
    
    // Additional detailed logging
    console.error('Full error details:', error);
    alert(errorMessage);
  
    return throwError(errorMessage);
  }

}
