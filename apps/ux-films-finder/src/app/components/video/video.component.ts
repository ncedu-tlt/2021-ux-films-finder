import { Component, ViewEncapsulation } from '@angular/core';
import { FilmDataService } from '../../services/film-data.service';
import { VideoModel } from '../../models/video.model';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { VideoDetailsModel } from '../../models/video-details.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ff-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class VideoComponent {
  public videoInfo!: VideoModel;
  public ytInfo!: VideoDetailsModel;
  videos$: Subject<VideoDetailsModel[]> = new Subject();

  isClicked = true;

  url?: string;
  link: any;
  constructor(
    private filmDataService: FilmDataService,
    private activatedRouter: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      const param = +params['id'];
      this.filmDataService.getVideoById(param).subscribe((info: VideoModel) => {
        this.videos$.next(info.items);
        let isNotExist = true;
        for (let i = 0; i < info.items.length; i++) {
          if (info.items[i].site.includes('YOUTUBE')) {
            this.url =
              'https://www.youtube.com/embed/' +
              new URLSearchParams(info.items[0].url.split('?')[1]).get('v');
            this.link = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
            isNotExist = false;
            break;
          }
        }
        if (isNotExist) console.log('НЕ СУЩЕСТВУЕТ');
      });
    });
  }
}
