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
  // GetBlogPosts(): Observable<BlogPost[]> 
  // {
  //   return this.http.get<BlogPost[]>(this.apiUrl);
  // }

  //Blog Creation
  CreateBlogPost(blogPost: BlogPost): Observable<void> 
  {
    return this.http.post<void>(this.apiUrl, blogPost).pipe(
      catchError(this.handleError)
    );
  }

  // CreateBlogPost(blogPost: BlogPost): Observable<void> 
  // {
  //   return this.http.post<void>(this.apiUrl, blogPost)
    
  // }

  //Blog Updation
 UpdateBlogPost(post: BlogPost): Observable<void> 
  {
    return this.http.put<void>(`${this.apiUrl}/${post.id}`, post).pipe(
      catchError(this.handleError)
    );
  }

  // UpdateBlogPost(post: BlogPost): Observable<void> 
  // {
  //   return this.http.put<void>(`${this.apiUrl}/${post.id}`, post);
    
  // }
  
  //Blog deletion
//  deleteBlogPost(id: number): Observable<void> 
//   {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
    
//   }

  deleteBlogPost(id: number): Observable<void> 
  {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  
  // private handleError(error: HttpErrorResponse) 
  // {
  //   let errorMessage = 'Unknown error!';
    
  //   if (error.error instanceof Error) 
  //     {
  //     // Client-side error
  //     console.error('Client-side error:', error.error.message);
  //     errorMessage = `Client-side error: ${error.error.message}`;
  //     } else 
  //     {
  //     // Backend error
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //     errorMessage = `Backend error: ${error.status}, body was: ${error.error}`;
  //     }
    
  //   // Additional detailed logging
  //   console.error('Full error details:', error);
  //   alert(errorMessage);
  
  //   return throwError(errorMessage);
  // }


//   private handleError(error: HttpErrorResponse) {
//     if (error.error instanceof Error) {
//       // Client-side error
//       console.error('An error occurred:', error.error.message);
//     } else {
//       // Server-side error
//       console.error(`Backend returned code ${error.status}, ` +
//                     `body was: ${JSON.stringify(error.error)}`);
//     }
//     // Return an observable with a user-facing error message
//     return throwError('Something bad happened; please try again later.');
//   }
// private handleError(error: HttpErrorResponse): Observable<never> {
//   console.error('An error occurred:', error);
//   return throwError(() => new Error('An error occurred. Check the console for more details.'));
// }

private handleError(error: HttpErrorResponse): Observable<never> {
  let errorMessage = '';
  if (error.error instanceof Error) {
    // Client-side error
    console.error('Client-side error:', error.error.message);
    errorMessage = `Client-side error: ${error.error.message}`;
  } else {
    // Server-side error
    console.error(`Server-side error: ${error.status} ${error.message}`);
    errorMessage = `Server-side error: ${error.status} ${error.message}`;
  }
  return throwError(() => new Error(errorMessage));
}
}




