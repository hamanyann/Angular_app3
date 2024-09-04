import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public count: number = 0;

  ngOnInit() {
  
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
