import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogFormComponent } from '../blog-form/blog-form.component';


@Component({
  selector: 'blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
   standalone: true,
   imports: [CommonModule, FormsModule,BlogFormComponent]
})
export class BlogListComponent implements OnInit {
   @Input() posts: BlogPost[] = [];
  isFormVisible = false;
  postToEdit: BlogPost | null = null;
   @Output() edit = new EventEmitter<BlogPost>();
   @Output() delete = new EventEmitter<number>();

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.loadBlogPosts();
  }

  loadBlogPosts() {
    this.blogService.GetBlogPosts().subscribe(posts => this.posts = posts);
  }
  
  openNewPostForm() 
  {
    this.isFormVisible = true;
    this.postToEdit = null;
  }

  closeForm() 
  {
    this.isFormVisible = false;
  }

  handleFormSubmit(post: BlogPost) 
  {
    if (post.id) 
      {
      this.blogService.UpdateBlogPost(post).subscribe(() => this.loadBlogPosts());
      // this.blogService.UpdateBlogPost(post).subscribe(() => {
      //   this.snackBar.open('Blog post Updated successfully!', 'Close', {
      //     duration: 3000,
      //     verticalPosition: 'top'
      //   });
      // });
      } else 
    {
      this.blogService.CreateBlogPost(post).subscribe(() => this.loadBlogPosts());
      // this.blogService.CreateBlogPost(post).subscribe(() => {
      //   this.snackBar.open('Blog post saved successfully!', 'Close', {
      //     duration: 3000,
      //     verticalPosition: 'top'
      //   });
      // });
    }
    
    this.closeForm();
  }
  
  onEdit(post: BlogPost) {
    this.postToEdit = post;
    this.isFormVisible = true;
  }
 
  onDelete(id: number) {
    this.blogService.deleteBlogPost(id).subscribe(() => this.loadBlogPosts());
  }
}