import { AbstractManager } from '../../fwk/abstract-manager';
import { Injectable, EventEmitter } from '@angular/core';
import { EventManager } from '../../fwk/managers/event-manager';
import io from 'socket.io-client';
import { ConfigProvider } from '../providers/config-provider';

@Injectable({ providedIn: "root" })
export class SocketManager extends AbstractManager {

  _eventManager: EventManager = null;
  _configProvider: ConfigProvider = null;
  _socket: SocketIOClient.Socket = null;

  constructor(eventManager: EventManager, configProvider: ConfigProvider) {
    super();
    this._eventManager = eventManager;
    this._configProvider = configProvider;
  }

  on(eventName: string): EventEmitter<any> {
    let eventEmitter: EventEmitter<any> = this._eventEmitters[eventName];
    if (eventEmitter === undefined) {
      eventEmitter = new EventEmitter();
      this._eventEmitters[eventName] = eventEmitter;
      this._getSocket().subscribe((socket) => {
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
    this._eventManager.emit("HTTP_BEGIN");
    this._getSocket().subscribe((socket) => {
      if (socket !== null) {
        socket.emit(eventName, params, (result) => {
          this._eventManager.emit("HTTP_END");
          eventEmitter.emit(result);
        });
      }
      else {
        this._eventManager.emit("HTTP_END");
        eventEmitter.emit(null);
      }
    });
    return eventEmitter;
  }

  _getSocket(): EventEmitter<any> {
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
