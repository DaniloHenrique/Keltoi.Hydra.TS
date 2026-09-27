export class Url{
    static readonly default = new Url('localhost', 8080, '/');

    static from(url: string): Url{
        const [hostName, port, path] = url.split('/');
        return new Url(hostName, Number(port), path);
    }

    toString(): string{
        return `${this.hostName}:${this.port}${this.path}`;
    }

    constructor(
        public readonly hostName: string, 
        public readonly port: number, 
        public readonly path: string
    ){}
}