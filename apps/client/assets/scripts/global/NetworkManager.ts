import { Singleton } from "../common/base";
import { getProtoPathByRpcFunc, RpcFunc, ProtoPathEnum, ServerPort } from "../common";
// @ts-ignore
import protoRoot from "../proto/index.js";

const TIMEOUT = 5000;

interface IItem {
  cb: Function;
  ctx: unknown;
}

export type IData = Record<string, any>;

export default class NetworkManager extends Singleton {
  static get Instance() {
    return super.GetInstance<NetworkManager>();
  }

  ws: WebSocket;
  port = ServerPort.Gateway;
  maps: Map<RpcFunc, Array<IItem>> = new Map();
  isConnected = false;

  connect() {
    return new Promise((resolve, reject) => {
      if (this.isConnected) {
        resolve(true);
        return;
      }
      this.ws = new WebSocket(`ws://localhost:${this.port}`);
      //onmessage接受的数据类型，只有在后端返回字节数组的时候才有效果
      this.ws.binaryType = "arraybuffer";

      this.ws.onopen = () => {
        this.isConnected = true;
        resolve(true);
      };

      this.ws.onerror = (e) => {
        this.isConnected = false;
        console.log(e);
        reject("ws error");
      };

      this.ws.onclose = () => {
        this.isConnected = false;
        console.log("ws onclose");
        reject("ws close");
      };

      this.ws.onmessage = (e) => {
        try {
          // TODO解析data和name
          const data = e.data;
          const name = 1;
          try {
            if (this.maps.has(name) && this.maps.get(name).length) {
              this.maps.get(name).forEach(({ cb, ctx }) => cb.call(ctx, data));
            } else {
              console.log(`no ${name} message or callback, maybe timeout`);
            }
          } catch (error) {
            console.log("call error:", error);
          }
        } catch (error) {
          console.log("onmessage parse error:", error);
        }
      };
    });
  }

  call(name: RpcFunc, data: IData) {
    return new Promise<{ data?: any; error?: string }>((resolve) => {
      try {
        // 超时处理
        const timer = setTimeout(() => {
          resolve({ error: "Time Out!" });
          this.unListen(name, cb, null);
        }, TIMEOUT);

        // 回调处理
        const cb = (res) => {
          resolve(res);
          clearTimeout(timer);
          this.unListen(name, cb, null);
        };

        // 监听响应事件触发回调
        this.listen(name, cb, null);

        // 发送消息
        this.send(name, data);
      } catch (error) {
        resolve({ error });
      }
    });
  }

  async send(name: RpcFunc, data: IData) {
    // TODO
  }

  listen(name: RpcFunc, cb: (args: any) => void, ctx: unknown) {
    if (this.maps.has(name)) {
      this.maps.get(name).push({ ctx, cb });
    } else {
      this.maps.set(name, [{ ctx, cb }]);
    }
  }

  unListen(name: RpcFunc, cb: (args: any) => void, ctx: unknown) {
    if (this.maps.has(name)) {
      const items = this.maps.get(name);
      const index = items.findIndex((i) => cb === i.cb && i.ctx === ctx);
      index > -1 && items.splice(index, 1);
    }
  }
}
