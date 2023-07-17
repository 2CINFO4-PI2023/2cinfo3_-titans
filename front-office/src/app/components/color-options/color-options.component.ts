import { Component, AfterViewInit } from '@angular/core';
import { Settings, AppSettings } from '../../components/shared/services/color-option.service';
import { MessageService } from './message.service';

@Component({
  selector: 'app-color-options',
  templateUrl: './color-options.component.html',
  styleUrls: ['./color-options.component.sass']
})
export class ColorOptionsComponent implements AfterViewInit {
  public showOptions: boolean = true;
  public settings: Settings;
  private running: boolean = false;

  constructor(public appSettings: AppSettings, private messageService: MessageService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.fetchMessages();
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

    const userId = '648c66938f0e146262dacfcf'; // Replace with the appropriate user ID
    this.messageService.askChatbot(userId, msg).subscribe(
      (response: any) => {
        // Handle the response data
        console.log(response);
        this.addResponseMsg(response.adminResponse);
      },
      (error) => {
        // Handle any errors
        console.error(error);
      },
      () => {
        this.running = false;
      }
    );

    // Clear the input field
    (document.getElementById("message") as HTMLInputElement).value = "";
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
    
    } else {
      chatbot.classList.add("collapsed");
      (document.getElementById("chatbot_toggle")!.children[0] as HTMLElement).style.display = "";
      (document.getElementById("chatbot_toggle")!.children[1] as HTMLElement).style.display = "none";
    }
  }

  fetchMessages() {
    const userId = '648c66938f0e146262dacfcf'; // Replace with the appropriate user ID
    this.messageService.getMessages(userId).subscribe(
      (response: any[]) => {
        // Handle the response data
        console.log(response);
        this.processMessages(response);
      },
      (error) => {
        // Handle any errors
        console.error(error);
      }
    );
  }

  private processMessages(messages: any[]): void {
    messages.sort((a, b) => new Date(a.date_creation).getTime() - new Date(b.date_creation).getTime());
  
    for (const message of messages) {
      if (message.from === 'Admin') {
        setTimeout(() => this.addResponseMsg(message.description), 1000);
      } else if (message.from === 'User') {
        setTimeout(() => this.addMsg(message.description), 1000);
      }
    }
  }
  
}
