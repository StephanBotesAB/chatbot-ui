import { Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { OpenaiService } from './openai.service';
import { LoginComponent } from "./login/login.component";
import { MatDialog } from "@angular/material/dialog";

export class textResponse{
  sno:number=1;
  text:string='';
  response:any='';
  isUser: boolean = false;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  inputText: string = '';
  textList:textResponse[]=[];
  @ViewChild('chatContainer') private chatContainer: ElementRef;

  constructor(private openaiService: OpenaiService, public dialog: MatDialog, private cdRef: ChangeDetectorRef) {
  }

  generateText() {
    if (this.inputText) {
      // User input
      this.textList.push({sno: this.textList.length + 1, text: this.inputText, response: '', isUser: true});

      // AI response
      this.openaiService.generateText(this.inputText).then(text => {
        this.textList.push({sno: this.textList.length + 1, text: '', response: text, isUser: false});
        this.inputText = ''; // clear the input field

        // Detect changes and scroll to last message
        this.cdRef.detectChanges();
        this.scrollToLastMessage();
      });
    }
  }

  openLogin() {
    this.dialog.open(LoginComponent);
  }

  scrollToLastMessage(): void {
    const lastMessage = document.getElementById('lastMessage');
    if (lastMessage) {
      lastMessage.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
