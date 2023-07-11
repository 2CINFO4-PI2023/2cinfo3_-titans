import { Component, AfterViewInit } from '@angular/core';
import { Settings, AppSettings } from '../../components/shared/services/color-option.service';

@Component({
  selector: 'app-color-options',
  templateUrl: './color-options.component.html',
  styleUrls: ['./color-options.component.sass']
})
export class ColorOptionsComponent implements AfterViewInit {
  public showOptions: boolean = true;
  public settings: Settings;
  private running: boolean = false;

  constructor(public appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // Code to be executed after the view is initialized
    }, 0);
  }

  public send(): void {
    if (this.running) return;

    const msg: string = (document.getElementById("message") as HTMLInputElement).value;
    if (msg === "") return;

    this.running = true;
    this.addMsg(msg);

    // DELAY MESSAGE RESPONSE Echo
    setTimeout(() => this.addResponseMsg(msg), 1000);
  }

  private addMsg(msg: string): void {
    const div: HTMLDivElement = document.createElement("div");
    div.innerHTML = `<span style='flex-grow:1'></span><div class='chat-message-sent'>${msg}</div>`;
    div.className = "chat-message-div";

    (document.getElementById("message-box") as HTMLDivElement).appendChild(div);

    // SEND MESSAGE TO API
    (document.getElementById("message") as HTMLInputElement).value = "";
    (document.getElementById("message-box") as HTMLDivElement).scrollTop = (document.getElementById("message-box") as HTMLDivElement).scrollHeight;
  }

  private addResponseMsg(msg: string): void {
    const div: HTMLDivElement = document.createElement("div");
    div.innerHTML = `<div class='chat-message-received'>${msg}</div>`;
    div.className = "chat-message-div";

    (document.getElementById("message-box") as HTMLDivElement).appendChild(div);
    (document.getElementById("message-box") as HTMLDivElement).scrollTop = (document.getElementById("message-box") as HTMLDivElement).scrollHeight;

    this.running = false;
  }

  public onKeyUp(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.send();
    }
  }

  public toggleChatbot(): void {
    const chatbot = document.getElementById("chatbot") as HTMLDivElement;
    if (chatbot.classList.contains("collapsed")) {
      chatbot.classList.remove("collapsed");
      (document.getElementById("chatbot_toggle")!.children[0] as HTMLElement).style.display = "none";
      (document.getElementById("chatbot_toggle")!.children[1] as HTMLElement).style.display = "";
      setTimeout(() => this.addResponseMsg("Hi"), 1000);
    } else {
      chatbot.classList.add("collapsed");
      (document.getElementById("chatbot_toggle")!.children[0] as HTMLElement).style.display = "";
      (document.getElementById("chatbot_toggle")!.children[1] as HTMLElement).style.display = "none";
    }
  }
}
