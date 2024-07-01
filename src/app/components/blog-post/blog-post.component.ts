import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BlogPost } from '../../models/blog-post.model';

@Component({
  selector: 'blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent {
  
  @Input()
  post!: BlogPost;
  @Output() edit = new EventEmitter<BlogPost>();
  @Output() delete = new EventEmitter<number>();

  onEdit(): void {
    this.edit.emit(this.post);
  }

  onDelete(): void {
    this.delete.emit(this.post.id);
  }
}