import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { ChatService, Message } from "./chat.service";
import { WebsocketService } from "./websocket.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  providers: [WebsocketService]
})
export class AppComponent {
 

  public count = 0;

  constructor(private chatService: ChatService) {
    this.chatService.messages.subscribe(msg => {
      console.log("Response from websocket: " + msg);
    });
  }



  increment() {
    this.count++;
  }
}
