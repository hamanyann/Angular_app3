import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root' 
})
export class WebsocketService {
  private subject: Subject<MessageEvent> | undefined;

  constructor() {}

  public connect(url: string): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }

  private create(url: string): Subject<MessageEvent> {
    const ws = new WebSocket(url);

    const observable = new Observable<MessageEvent>((obs) => {
      ws.onmessage = (event) => obs.next(event);
      ws.onerror = (event) => obs.error(event);
      ws.onclose = () => obs.complete();
      return () => ws.close();
    });

    const observer = {
      next: (data: any) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };

      const subject = new Subject<MessageEvent>();
    observable.subscribe(subject);
    return subject;
  }
}
