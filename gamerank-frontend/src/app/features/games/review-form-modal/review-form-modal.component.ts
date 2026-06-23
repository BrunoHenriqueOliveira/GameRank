import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GameService } from '../../../core/services/game.service';
import { Review } from '../../../models/game';

@Component({
  selector: 'app-review-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './review-form-modal.component.html',
  styleUrls: ['./review-form-modal.component.css']
})
export class ReviewFormModalComponent {
  @Input() gameId!: string;
  @Output() closed = new EventEmitter<void>();
  @Output() reviewCreated = new EventEmitter<Review>();

  form: FormGroup;
  submitting = false;
  errorMsg: string | null = null;

  constructor(private fb: FormBuilder, private gameService: GameService) {
    this.form = this.fb.group({
      author:  ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      rating:  [7,  [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }

  @HostListener('document:keydown.escape')
  onEsc(): void { this.close(); }

  get ratingValue(): number { return +(this.form.get('rating')!.value ?? 7); }

  get ratingClass(): string {
    const v = this.ratingValue;
    if (v >= 7) return 'high';
    if (v >= 4) return 'mid';
    return 'low';
  }

  get ratingLabel(): string {
    const v = this.ratingValue;
    if (v === 10) return 'Obra-prima';
    if (v >= 8)  return 'Excelente';
    if (v >= 7)  return 'Muito bom';
    if (v >= 5)  return 'Regular';
    if (v >= 3)  return 'Fraco';
    return 'Péssimo';
  }

  get starsFilled(): boolean[] {
    return [1, 2, 3, 4, 5].map(i => i <= Math.round(this.ratingValue / 2));
  }

  get contentLength(): number { return (this.form.get('content')!.value ?? '').length; }

  fieldInvalid(name: string): boolean {
    const ctrl = this.form.get(name)!;
    return ctrl.invalid && ctrl.touched;
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true;
    this.errorMsg = null;

    const { author, content, rating } = this.form.getRawValue();
    this.gameService.createReview(this.gameId, {
      author: author!,
      content: content!,
      rating: rating!
    }).subscribe({
      next: (review) => {
        this.reviewCreated.emit(review);
        this.close();
      },
      error: () => {
        this.errorMsg = 'Não foi possível enviar sua avaliação. Tente novamente.';
        this.submitting = false;
      }
    });
  }

  close(): void { this.closed.emit(); }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }
}
