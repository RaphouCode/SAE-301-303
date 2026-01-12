import { Component, input, ElementRef, AfterViewInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-content-section',
  standalone: true,
  imports: [],
  templateUrl: './content-section.component.html',
  styleUrl: './content-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentSectionComponent implements AfterViewInit {
  title = input.required<string>();
  text = input.required<string>();
  imageSrc = input.required<string>();
  imageAlt = input<string>('Image');
  reverse = input<boolean>(false);

  @ViewChild('textContent', { static: false }) textContent!: ElementRef<HTMLDivElement>;
  @ViewChild('imageContent', { static: false }) imageContent!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    this.setupScrollAnimations();
  }

  private setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    if (this.textContent?.nativeElement) {
      observer.observe(this.textContent.nativeElement);
    }

    if (this.imageContent?.nativeElement) {
      observer.observe(this.imageContent.nativeElement);
    }
  }
}
