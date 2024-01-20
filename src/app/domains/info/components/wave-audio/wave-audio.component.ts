import { Component, ElementRef, Input, ViewChild, signal } from '@angular/core';


import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-wave-audio',
  standalone: true,
  imports: [],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.css'
})
export class WaveAudioComponent {

  @Input({ required: true}) audioUrl!: string;
  @ViewChild('wave') container!: ElementRef;
  private wsRef!: WaveSurfer;
  isPlaying = signal(false)

  ngAfterViewInit() {
    this.wsRef = WaveSurfer.create({
      url: this.audioUrl,
      container: this.container.nativeElement
    });
    this.wsRef.on('play', () => this.isPlaying.set(true))
    this.wsRef.on('pause', () => this.isPlaying.set(false))
  }

  playPause() {
    this.wsRef.playPause()
  }
}
