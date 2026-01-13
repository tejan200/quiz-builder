import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuizBuilderComponent } from './quiz-builder/quiz-builder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, QuizBuilderComponent],
  templateUrl: './app.html'
})
export class App {
}
