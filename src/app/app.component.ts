import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public count: number = 0;
  public title: string = 'websocket_tutorial';
  ngOnInit() {
    console.log('AppComponent initialized');
  }

  increment() {
    fetch('https://angular-app3.vercel.app/increment', {
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Count incremented:', data.count);
      })
      .catch((error) => console.error('Error:', error));
  }
}
