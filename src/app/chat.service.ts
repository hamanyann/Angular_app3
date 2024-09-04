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
    this.websocketSubject = this.wsService.connect(CHAT_URL);

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
    if (this.websocketSubject) {
      this.websocketSubject.next({ data: JSON.stringify(message) } as MessageEvent);
    }
  }
}
