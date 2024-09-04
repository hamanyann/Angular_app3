import { Component } from "@angular/core";
import { ChatService, Message } from "./chat.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  providers: [ChatService]
})
export class AppComponent {
  private message: Message = {
    author: "tutorialedge",
    message: "this is a test message"
  };

  constructor(private chatService: ChatService) {
    this.chatService.messages.subscribe(msg => {
      console.log("Response from websocket: " + msg);
    });
  }

  sendMsg() {
    console.log("new message from client to websocket: ", this.message);
    this.chatService.sendMessage(this.message);
    this.message.message = "";
  }
}
