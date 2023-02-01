// 'wss://course-server.herokuapp.com/'
// 'ws://localhost:5000/'
export const $ws = 'wss://course-server.herokuapp.com/';

export const wsApi = {
    createSocket(url: string) {
        return new WebSocket(`${$ws}${url}`);
    },
    connect(ws: WebSocket, id: string, page: number) {
        ws.send(JSON.stringify({id, page,method:'connect'}));
    }
}