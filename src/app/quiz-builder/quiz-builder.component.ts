import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-builder',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './quiz-builder.component.html',
  styleUrls: ['./quiz-builder.component.css']
})
export class QuizBuilderComponent {
  quizForm: FormGroup;
  previewMode = false;

  questionTypes = [
    { label: 'Multiple Choice', value: 'multiple' },
    { label: 'Text', value: 'text' },
    { label: 'Rating (1–5)', value: 'rating' },
    { label: 'Dropdown', value: 'dropdown' }
  ];

  constructor(private fb: FormBuilder) {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      questions: this.fb.array([])
    });
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  addQuestion() {
    const question = this.fb.group({
      questionText: ['', Validators.required],
      type: ['text', Validators.required],
      options: this.fb.array([])
    });

    this.questions.push(question);
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  moveUp(index: number) {
    if (index === 0) return;
    const item = this.questions.at(index);
    this.questions.removeAt(index);
    this.questions.insert(index - 1, item);
  }

  moveDown(index: number) {
    if (index === this.questions.length - 1) return;
    const item = this.questions.at(index);
    this.questions.removeAt(index);
    this.questions.insert(index + 1, item);
  }

  getOptions(qIndex: number): FormArray {
    return this.questions.at(qIndex).get('options') as FormArray;
  }

  addOption(qIndex: number) {
    this.getOptions(qIndex).push(this.fb.control('', Validators.required));
  }

  removeOption(qIndex: number, optIndex: number) {
    this.getOptions(qIndex).removeAt(optIndex);
  }

  togglePreview() {
    this.previewMode = !this.previewMode;
  }
}
