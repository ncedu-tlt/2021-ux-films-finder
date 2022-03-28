import { Component, ViewEncapsulation } from '@angular/core';
import { FilmDataService } from '../../services/film-data.service';
import { VideoModel } from '../../models/video.model';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { VideoDetailsModel } from '../../models/video-details.model';

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

  public yturl = 'https://www.youtube.com/embed/YXNRu2YjRRk';
  public link = 'https://www.youtube.com/embed/HA16mcJylmI';
  constructor(
    private filmDataService: FilmDataService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(this.yturl);
    this.activatedRouter.params.subscribe(params => {
      const param = +params['id'];
      this.filmDataService.getVideoById(param).subscribe((info: VideoModel) => {
        this.videos$.next(info.items);
        console.log(info);
      });
    });
    /*.replace(/^[^=]+/, '');*/
  }
  toGetInfo(site: string) {
    if (site == '') {
      console.log(this.yturl);
    }
  }
}
