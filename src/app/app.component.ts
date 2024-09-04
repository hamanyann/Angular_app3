import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public count: number = 0;

  ngOnInit() {
    // Pusherの設定
    const pusher = new Pusher(environment.pusherKey, {
      cluster: environment.pusherCluster,
    });

    // チャンネルのサブスクライブ
    const channel = pusher.subscribe('my-channel');

    // イベントのバインド
    channel.bind('my-event', (data: any) => {
      this.count = data.count;
    });
  }

  increment() {
    fetch('https://angular-app3.vercel.app/increment', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Count incremented:', data.count);
      })
      .catch((error) => console.error('Error:', error));
  }
}
