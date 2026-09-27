import type { IError } from "./error";
import type { IOk } from "./ok";

export class Result<T> {
    constructor(
        private readonly code: number,
        private readonly data: T|null = null,
        private readonly message: string|null = null
    ) {}

    get isError(): boolean {
        return this.code > 299;
    }

    get error():IError {
        return {
            code: this.code, 
            message: this.message ?? 'Unknown error'
        };
    }

    get ok():IOk<T|null> {
        return {
            code: this.code, 
            data: this.data
        };
    }
}