export default class RequestError extends Error {
    status: number;
    source: Error;

    constructor (status:number, message:string, source?:Error) {
        super(message);
        this.status = status;
        this.source = source;

        if(source)
          this.stack = this.stack.split("\n").slice(0, 2).join("\n") 
              + "\n" + source.stack;
    }
}