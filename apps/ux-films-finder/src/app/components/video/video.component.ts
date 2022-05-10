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
  link!: any;

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
        console.log(info);
        let isYoutubeLinkNotExist = true;
        for (let i = 0; i < info.items.length; i++) {
          this.url = 'https://www.youtube.com/embed/';
          this.link = '';
          if (info.items[i].site.includes('YOUTUBE')) {
            if (info.items[i].url.indexOf('v/') !== -1) {
              const a = new URLSearchParams(info.items[i].url.split('v/')[1]);
              this.url = this.url + a;
            }
            if (info.items[i].url.indexOf('be/') !== -1) {
              const a = new URLSearchParams(info.items[i].url.split('be/')[1]);
              this.url = this.url + a;
            }
            if (info.items[i].url.indexOf('?v=') !== -1) {
              const a = new URLSearchParams(
                info.items[i].url.split('?')[1]
              ).get('v');
              this.url = this.url + a;
            }
            this.url = this.url.substring(0, this.url.length - 1);

            this.link = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
            console.log(this.link);
            isYoutubeLinkNotExist = false;
            break;
          } else {
            isYoutubeLinkNotExist = true;
            console.log(isYoutubeLinkNotExist);
          }
        }
        if (isYoutubeLinkNotExist) console.log('НЕ СУЩЕСТВУЕТ');
      });
    });
  }
}
