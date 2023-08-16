import { RpcFunc } from "../common";
import { Singleton } from "../common/common/base";
import { WebSocketServer, WebSocket } from "ws";

export class GatewayManager extends Singleton{
    static get Instance() {
        return super.GetInstance<GatewayManager>();
    }

    init() {
        const wss = new WebSocketServer({ port: 4000 });

        wss.on('connection', (ws) => {
            ws.on('error', console.error);

            ws.on('message', (buffer: Buffer) => {
                this.handleMessage(ws, buffer)
            });
        });
        console.log("gateway 服务");
    }

    handleMessage(ws: WebSocket, buffer:Buffer) {
        console.log(buffer.toString());
        const { name, data } = JSON.parse(buffer.toString());
        
        if (name == RpcFunc.enterGame) {
            //TODO做鉴权
        } else {
            //TODO跟game服务通信
        }
        ws.send(buffer.toString());
    }
}    