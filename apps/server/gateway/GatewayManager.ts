import { AuthClient, CheckTokenReq, RpcFunc, getProtoPathByRpcFunc } from "../common";
import { Singleton } from "../common/common/base";
import * as grpc from "@grpc/grpc-js";
import { WebSocketServer, WebSocket } from "ws";
// @ts-ignore
import root from "../common/idl/auto-gen-ws"
import { resolve } from "path";

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

    async handleMessage(ws: WebSocket, buffer:Buffer) {
        // console.log(buffer.toString());
        const name = buffer.readUint8(0);
        const path = getProtoPathByRpcFunc(name, "req");
        const coder = root.lookup(path);
        const data = coder.decode(buffer.slice(1));
        // const { name, data } = JSON.parse(buffer.toString());
        
        if (name == RpcFunc.enterGame) {
            const res = await this.checkToken(data);
            this.sendMessage(ws, name, res)
            //TODO做鉴权
        } else {
            //TODO跟game服务通信
        }
    }

    sendMessage(ws : WebSocket, name : RpcFunc, data : any) {
        const headerBuffer = Buffer.alloc(1);
        headerBuffer.writeUint8(name);
        const path = getProtoPathByRpcFunc(name, "res");
        const coder = root.lookup(path);
        const dataBuffer = coder.encode(data);
        const buffer = Buffer.concat([headerBuffer, dataBuffer]);
        ws.send(buffer);
    }
    checkToken({ token } : {token:string}){
        return new Promise((rs) => {
            const client = new AuthClient("localhost:3333", grpc.credentials.createInsecure());
            const req = new CheckTokenReq();
            req.setToken(token);
            client.checkToken(req, (err, message) => {
                rs(message.toObject());
            });
        })
    }
}    