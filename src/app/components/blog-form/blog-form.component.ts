import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators,ReactiveFormsModule  } from '@angular/forms';
import { BlogPost } from '../../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { blogInterceptor } from '../../interceptors/blog-interceptor';


@Component({
  selector: 'blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  
})

export class BlogFormComponent {
  
  @Input() postToEdit: BlogPost | null = null;
  @Output() formClose = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<BlogPost>();

  blogForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.blogForm = this.fb.group({
    
    id: [this.postToEdit ? this.postToEdit.id : null],
      username: [this.postToEdit ? this.postToEdit.username : '', Validators.required],
      // dateCreated: [this.postToEdit ? this.postToEdit.dateCreated : '', Validators.required],
      text: [this.postToEdit ? this.postToEdit.text : '', Validators.required]
    });
  }
  ngOnChanges() {
    if (this.postToEdit) {
      this.blogForm.patchValue(this.postToEdit);
    }
  }
  get formControls() 
  {
    return this.blogForm.controls;
  }
onSubmit() {
  if (this.blogForm.valid) {
      const formValue = this.blogForm.value;
       const post: BlogPost = {
      id: this.postToEdit ? this.postToEdit.id : 0,
      text: formValue.text,
      username: formValue.username,
      dateCreated: new Date()
    };
    this.formSubmit.emit(post);
    this.blogForm.reset();
  }
}
 
  closeForm() {
    this.formClose.emit();
  }
  
  
}


