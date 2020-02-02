import { AbstractManager } from '../../fwk/abstract-manager';
import { Injectable, EventEmitter } from '@angular/core';
import { EventManager } from '../../fwk/managers/event-manager';
import io from 'socket.io-client';
import { ConfigProvider } from '../providers/config-provider';
import { AppEvents } from 'src/app/app-events';

@Injectable({ providedIn: "root" })
export class SocketManager extends AbstractManager {

  private _socket: SocketIOClient.Socket = null;

  constructor(
    private _eventManager: EventManager,
    private _configProvider: ConfigProvider) {
    super();
  }

  on(eventName: string): EventEmitter<any> {
    let eventEmitter: EventEmitter<any> = this._eventEmitters[eventName];
    if (eventEmitter === undefined) {
      eventEmitter = new EventEmitter();
      this._eventEmitters[eventName] = eventEmitter;
      this._getSocket().subscribe((socket: any) => {
        if (socket !== null) {
          socket.on(eventName, () => {
            eventEmitter.emit();
          });
        }
      });
    }
    return eventEmitter;
  }

  emit(eventName: string, params?: any): EventEmitter<any> {
    const eventEmitter: EventEmitter<any> = new EventEmitter();
    this._eventManager.emit(AppEvents.HTTP_BEGIN);
    this._getSocket().subscribe((socket: any) => {
      if (socket !== null) {
        socket.emit(eventName, params, (result: any) => {
          this._eventManager.emit(AppEvents.HTTP_END);
          eventEmitter.emit(result);
        });
      }
      else {
        this._eventManager.emit(AppEvents.HTTP_END);
        eventEmitter.emit(null);
      }
    });
    return eventEmitter;
  }

  private _getSocket(): EventEmitter<any> {
    const eventEmitter: EventEmitter<any> = new EventEmitter();
    if (this._configProvider.runInNw()) {
      if (this._socket === null) {
        this._socket = io(this._configProvider.getSocketUrl(), {
          reconnection: false
        });
        this._socket.on("connect", () => {
          eventEmitter.emit(this._socket);
        });
        this._socket.on("connect_error", () => {
          this._socket = null;
          eventEmitter.emit(this._socket);
        });
      }
      else {
        setTimeout(() => {
          eventEmitter.emit(this._socket);
        }, 0);
      }
    }
    else {
      setTimeout(() => {
        eventEmitter.emit(null);
      }, 0);
    }
    return eventEmitter;
  }
}
