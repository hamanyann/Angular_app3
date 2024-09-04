import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { WebsocketService } from "./websocket.service";

const CHAT_URL = "ws://localhost:8080/";

export interface Message {
  author: string;
  message: string;
}

@Injectable({
  providedIn: 'root' 
})
export class ChatService {
  public messages: Observable<Message>;
  private websocketSubject: Subject<MessageEvent>;

  constructor(private wsService: WebsocketService) {
    this.websocketSubject = this.wsService.getMessageSubject() as Subject<MessageEvent>;

    this.messages = this.websocketSubject.pipe(
      map((response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message
        };
      })
    );
  }

  sendMessage(message: Message) {
    if (this.wsService) {
      this.wsService.increment(); // メッセージ送信の代わりに increment メソッドを呼び出す
    }
  }
}
