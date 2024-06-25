export interface WIF {
    version: number;
    privateKey: Uint8Array;
    compressed: boolean;
}
export declare function decodeRaw(buffer: Uint8Array, version?: number): WIF;
export declare function encodeRaw(version: number, privateKey: Uint8Array, compressed: boolean): Uint8Array;
export declare function decode(str: string, version?: number): WIF;
export declare function encode(wif: WIF): string;
