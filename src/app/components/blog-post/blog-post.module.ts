import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BlogPostComponent } from './blog-post.component'; // Adjust path based on actual location

@NgModule({
  declarations: [
    BlogPostComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    BlogPostComponent,
  ]
})
export class BlogListModule { }