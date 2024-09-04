// websocket.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService implements OnDestroy {
  private socket: WebSocket | undefined;
  private countSubject = new Subject<number>();
  private url = 'ws://localhost:8080'; // WebSocketのURLを定義

  count$ = this.countSubject.asObservable();

  private messageSubject = new Subject<MessageEvent>();

  constructor() {
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onmessage = (event) => {
      if (typeof event.data === 'string') {
        // 文字列データだけ処理する
        try {
          const data = JSON.parse(event.data);
          if (data.count !== undefined) {
            this.countSubject.next(data.count);
          }
        } catch (e) {
          console.error('Error parsing WebSocket message', e);
        }
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  increment() {
    if (this.socket) {
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ type: 'increment' }));
      } else {
        console.error(
          'WebSocket is not open. Ready state: ' + this.socket.readyState
        );
      }
    }
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.close();
    }
  }

  getMessageSubject() {
    return this.messageSubject.asObservable(); // メッセージのObservableを公開
  }
}
