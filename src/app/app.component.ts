import { Component, OnInit } from '@angular/core';
import { BlogService } from './services/blog.service';
import { BlogPost } from './models/blog-post.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogFormComponent } from './components/blog-form/blog-form.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BlogFormComponent,
    BlogListComponent
  ]
 
  
})

export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  posts: BlogPost[] = [];
  editingPost: BlogPost | null = null;

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.blogService.GetBlogPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  onFormSubmit(post: Partial<BlogPost>) {
    if (this.editingPost) {
      const updatedPost: BlogPost = { ...this.editingPost, ...post, dateCreated: new Date() };
      this.blogService.UpdateBlogPost(updatedPost).subscribe(() => {
        this.editingPost = null;
        this.loadPosts();
      });
    } else {
      const newPost: BlogPost = { ...post, id: this.posts.length + 1, dateCreated: new Date() } as BlogPost;
      this.blogService.CreateBlogPost(newPost).subscribe(() => {
        this.loadPosts();
      });
    }
  }
  

  onEditPost(post: BlogPost) {
    this.editingPost = post;
  }

  onDeletePost(id: number) {
    this.blogService.deleteBlogPost(id).subscribe(() => {
      this.loadPosts();
    });
  }

  createNew() {
    this.editingPost = null;
  }
}


