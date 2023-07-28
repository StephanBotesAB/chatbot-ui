import { Component } from '@angular/core';
import { OpenaiService } from './openai.service';
import { LoginComponent } from "./login/login.component";
import { MatDialog } from "@angular/material/dialog";

export class textResponse{
  sno:number=1;
  text:string='';
  response:any='';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  textList:textResponse[]=[{sno:1,text:'',response:''}];

  constructor(private openaiService: OpenaiService, public dialog: MatDialog) {
  }

  generateText(data:textResponse) {
    this.openaiService.generateText(data.text).then(text => {
      data.response = text;
      if(this.textList.length===data.sno){
        this.textList.push({sno:1,text:'',response:''});
      }
    });
  }

  openLogin() {
    this.dialog.open(LoginComponent);
  }

}
