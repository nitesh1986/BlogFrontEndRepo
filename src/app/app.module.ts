import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BlogService } from './services/blog.service'; // Import your BlogService
import { BlogFormComponent } from './components/blog-form/blog-form.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideHttpClient, withInterceptorsFromDi ,withFetch } from '@angular/common/http';
import { blogInterceptor } from './interceptors/blog-interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BlogFormComponent, // Export the component
    BlogListComponent,
    HttpClientModule,
    MatSnackBarModule
    
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideHttpClient(withInterceptorsFromDi(),withFetch()),
    
   BlogService ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: blogInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }