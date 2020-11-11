import { Component, OnInit ,Input, SimpleChanges, OnDestroy, ElementRef, ViewChild, OnChanges, AfterViewInit} from '@angular/core';
import { DataService } from '../services/data.service';
import videojs from 'video.js';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() id;
  // @ViewChild('target', {static: true}) target: ElementRef;
  // see options: https://github.com/videojs/video.js/blob/mastertutorial-options.html
  
  player: videojs.Player;
  @Input() videoArray:any[];
  urlVideo; urlPoster;
  details:[];
  cast:[];
  test: string[] = []; 
  constructor(private dataservice:DataService, private elementref: ElementRef) {
    
   }

   ngOnInit() {
    // alert("hai")
    console.log(this.videoArray)
    for(var i=0; i< this.videoArray.length; i++) {
      this.test.push(this.videoArray[i].thumbUrl);
    }
      }

  ngOnChanges(changes: SimpleChanges){
    // alert("i got called");
    
   this.getIdFunction(this.id);
  
  }
  getIdFunction(idFromCarousel){
    this.id=idFromCarousel
   
      this.dataservice.getDetails(this.id)
      .subscribe((resp:any)=>{
        // console.log(resp)
      this.urlVideo = resp.data[0]['videoUrl'].hls;
      console.log(this.urlVideo)
      this.details=resp.data[0];
      this.cast=resp.data[0]['castCrew']
      // console.log(this.cast)
      
      })
      
    
  }
  getId(idFromCarousel){
this.id=idFromCarousel;
alert(this.id);
this.getIdFunction(this.id);
  }
  ngAfterViewInit() {
    const options = {
      'sources' : [{
        'src' : this.urlVideo,
        'type' : 'application/x-mpegURL'
        }
      ],
      'poster' : this.urlPoster
    };
    this.player = videojs('vjs-player', options);

  }
}