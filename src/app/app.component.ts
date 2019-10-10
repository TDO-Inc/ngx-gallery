import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  NgxGalleryAnimation,
  NgxGalleryComponent,
  NgxGalleryImage,
  NgxGalleryImageSize,
  NgxGalleryLayout,
  NgxGalleryOrder
} from '@nomadreservations/ngx-gallery';
import 'hammerjs';
import { LoremIpsum } from 'lorem-ipsum';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Example } from './example.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  examples: Example[];

  onlyPreviewExample: Example;
  @ViewChild('onlyPreviewGallery', { static: false }) onlyPreviewGallery: NgxGalleryComponent;

  buttonsNavigationExample: Example;
  @ViewChild('buttonsNavigationGallery', { static: true }) buttonsNavigationGallery: NgxGalleryComponent;

  safeExample: Example;
  changeExample: Example;
  asyncExample: Example;
  asyncSpinnerActive = true;

  constructor(private sanitization: DomSanitizer) {}

  ngOnInit(): void {
    this.examples = new Array<Example>();

    this.examples.push(
      new Example('Simple gallery', this.getImages(), [{}]),

      new Example('Custom layout', this.getImages(), [
        {
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsColumns: 6,
          thumbnailsMargin: 0,
          thumbnailMargin: 0
        }
      ]),

      new Example('Image size - contain', this.getImages(), [
        {
          imageSize: NgxGalleryImageSize.Contain
        }
      ]),

      new Example('Thumbnails with multiple rows', this.getImages(false, false, false), [
        {
          thumbnailsColumns: 3,
          thumbnailsRows: 2,
          thumbnailsPercent: 40,
          imagePercent: 60,
          thumbnailMargin: 2,
          thumbnailsMargin: 2
        }
      ]),

      new Example('Thumbnails with multiple rows and images order by rows', this.getImages(false, false, false), [
        {
          thumbnailsColumns: 3,
          thumbnailsRows: 2,
          thumbnailsPercent: 40,
          imagePercent: 60,
          thumbnailMargin: 2,
          thumbnailsMargin: 2,
          thumbnailsOrder: NgxGalleryOrder.Row
        }
      ]),

      new Example('Move whole thumbnails row', this.getImages(), [
        {
          thumbnailsMoveSize: 4
        }
      ]),

      new Example('Thumbnails on top', this.getImages(), [
        {
          layout: NgxGalleryLayout.ThumbnailsTop
        }
      ]),

      new Example('Auto play', this.getImages(), [
        {
          imageAutoPlay: true,
          imageAutoPlayPauseOnHover: true,
          previewAutoPlay: true,
          previewAutoPlayPauseOnHover: true
        }
      ]),

      new Example('Image with description', this.getImages(true), [
        {
          imageDescription: true
        }
      ]),

      new Example('Preview with image description and fullscreen', this.getImages(true), [
        {
          previewFullscreen: true,
          previewKeyboardNavigation: true
        }
      ]),

      new Example('Preview with fullscreen on start', this.getImages(true), [
        {
          previewFullscreen: true,
          previewForceFullscreen: true
        }
      ]),

      new Example('Preview with closing on esc and click', this.getImages(true), [
        {
          previewCloseOnClick: true,
          previewCloseOnEsc: true
        }
      ]),

      new Example('Preview with zoom and rotate', this.getImages(true), [
        {
          previewZoom: true,
          previewRotate: true
        }
      ]),

      new Example('Only image', this.getImages(true), [
        {
          thumbnails: false
        },
        {
          breakpoint: 500,
          width: '100%',
          height: '200px'
        }
      ]),

      new Example('Only thumbnails', this.getImages(true), [
        {
          image: false,
          height: '100px'
        },
        {
          breakpoint: 500,
          width: '100%'
        }
      ]),

      new Example('Thumbnails with remaining count', this.getImages(true), [
        {
          image: false,
          thumbnailsRemainingCount: true,
          height: '100px'
        },
        {
          breakpoint: 500,
          width: '100%',
          thumbnailsColumns: 2
        }
      ]),

      new Example('Swipe', this.getImages(), [
        {
          imageArrows: false,
          imageSwipe: true,
          thumbnailsArrows: false,
          thumbnailsSwipe: true,
          previewSwipe: true
        }
      ]),

      new Example('Custom icons', this.getImages(), [
        {
          arrowPrevIcon: 'fa fa-arrow-circle-o-left',
          arrowNextIcon: 'fa fa-arrow-circle-o-right',
          closeIcon: 'fa fa-window-close',
          fullscreenIcon: 'fa fa-arrows',
          spinnerIcon: 'fa fa-refresh fa-spin fa-3x fa-fw',
          previewFullscreen: true
        }
      ]),

      new Example('Arrows auto hide', this.getImages(), [
        {
          imageArrowsAutoHide: true,
          thumbnailsArrowsAutoHide: true
        }
      ]),

      new Example('Disabled preview', this.getImages(), [
        {
          preview: false
        }
      ]),

      new Example(
        'Using the same images',
        [this.getImage(1, false), this.getImage(1, false), this.getImage(1, false)],
        [{}]
      ),

      new Example('Animation - Slide', this.getImages(), [
        {
          imageAnimation: NgxGalleryAnimation.Slide
        }
      ]),

      new Example('Animation - Rotate', this.getImages(), [
        {
          imageAnimation: NgxGalleryAnimation.Rotate
        }
      ]),

      new Example('Animation - Zoom', this.getImages(), [
        {
          imageAnimation: NgxGalleryAnimation.Zoom
        }
      ]),

      new Example('Custom start index', this.getImages(), [
        {
          startIndex: 4
        }
      ])
    );

    this.buttonsNavigationExample = new Example('Buttons navigation', this.getImages(), [
      {
        imageArrows: false,
        thumbnailsArrows: false
      }
    ]);

    this.onlyPreviewExample = new Example('Only preview', this.getImages(), [
      {
        image: false,
        thumbnails: false,
        width: '0px',
        height: '0px'
      }
    ]);

    this.safeExample = new Example('Images as SafeResourceURL', this.getSafeImages(true), [{}]);

    this.changeExample = new Example('Dynamic images change', this.getImages(true, true), [{}]);

    this.asyncExample = new Example('Async images', [], [{}]);
    this.getAsyncImages().subscribe(images => {
      this.asyncExample.images = images;
      this.asyncSpinnerActive = false;
    });
  }

  openPreview(): void {
    this.onlyPreviewGallery.openPreview(0);
  }

  changeImages(): void {
    this.changeExample.images = this.getImages(true, true);
  }

  addImage(): void {
    this.changeExample.images.push(this.getImage(this.getRandomInt(1, 8), true));
  }

  removeImage(): void {
    this.changeExample.images.pop();
  }

  getUrlTitle(title: string) {
    return title
      .toLowerCase()
      .replace(new RegExp(' ', 'g'), '-')
      .replace(new RegExp('---', 'g'), '-');
  }

  showNext(): void {
    this.buttonsNavigationGallery.showNext();
  }

  showPrev(): void {
    this.buttonsNavigationGallery.showPrev();
  }

  canShowNext(): boolean {
    return this.buttonsNavigationGallery.canShowNext();
  }

  canShowPrev(): boolean {
    return this.buttonsNavigationGallery.canShowPrev();
  }

  private getAsyncImages(): Observable<NgxGalleryImage[]> {
    return of(this.getImages()).pipe(delay(5000));
  }

  private getImages(
    description: boolean = false,
    randomCount: boolean = false,
    randomize: boolean = true
  ): NgxGalleryImage[] {
    const images = new Array<NgxGalleryImage>();
    let indexes = [1, 2, 3, 4, 5, 6, 7, 8];

    if (randomize) {
      indexes = this.randomizeArray(indexes);
    }

    if (randomCount) {
      indexes = indexes.slice(0, this.getRandomInt(1, 4));
    }

    indexes.map(i => images.push(this.getImage(i, description)));

    return images;
  }

  private getImage(index: number, description: boolean): NgxGalleryImage {
    return {
      small: 'assets/img/' + index + '-small.jpeg',
      medium: 'assets/img/' + index + '-medium.jpeg',
      big: 'assets/img/' + index + '-big.jpeg',
      description: description ? this.getRandomDescription() : ''
    };
  }

  private getSafeImages(description: boolean = false): NgxGalleryImage[] {
    const images = new Array<NgxGalleryImage>();
    const indexes = this.randomizeArray([1, 2, 3, 4, 5, 6, 7, 8]);

    indexes.map(i => images.push(this.getImage(i, description)));

    return images;
  }

  private getSafeImage(index: number, description: boolean): NgxGalleryImage {
    return {
      small: this.sanitization.bypassSecurityTrustResourceUrl('assets/img/' + index + '-small.jpeg'),
      medium: this.sanitization.bypassSecurityTrustResourceUrl('assets/img/' + index + '-medium.jpeg'),
      big: this.sanitization.bypassSecurityTrustResourceUrl('assets/img/' + index + '-big.jpeg'),
      description: description ? this.getRandomDescription() : ''
    };
  }

  private getRandomDescription(): string {
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        min: 1,
        max: 5
      }
    });
    return lorem.generateSentences();
    // return this.loremIpsumService.getRandom(1, 5);
  }

  private getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private randomizeArray(numbersArray: number[]) {
    return numbersArray.sort(() => 0.5 - Math.random());
  }
}
