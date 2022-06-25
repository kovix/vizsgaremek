import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { environment } from '../../../environments/environment';

export interface Message {
  source: string;
  content: string;
}


@Injectable()
export class WebsocketService {
  private chatUrl: string = environment.chatURL;
  public myId = this.getUniqueId(6);
  public websocket: WebSocketSubject<Message> = webSocket(this.chatUrl);

  constructor() {}

  private  getUniqueId(parts: number): string {
    const stringArr = [];
    for(let i = 0; i< parts; i++){
      // eslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }
}
