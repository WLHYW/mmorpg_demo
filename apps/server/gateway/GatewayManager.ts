import { AuthClient, CheckTokenReq, RpcFunc } from "../common";
import { Singleton } from "../common/common/base";
import * as grpc from "@grpc/grpc-js";
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
            this.checkToken(data)
            //TODO做鉴权
        } else {
            //TODO跟game服务通信
        }
        ws.send(buffer.toString());
    }
    checkToken({ token } : {token:string}){

        const client = new AuthClient("localhost:3333", grpc.credentials.createInsecure());
        const req = new CheckTokenReq();
        req.setToken(token);
        client.checkToken(req, (err, message) => {
            console.log(message.toObject());
        });
    }
}    