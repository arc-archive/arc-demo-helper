import { ArcDecryptEvent, ArcEncryptEvent } from "@advanced-rest-client/arc-events";

declare function encodeAes(data: string, passphrase: string): Promise<string>;

declare function decodeAes(cipherText: string, passphrase: string): Promise<string>;

declare function encode(method: string, data: string, passphrase: string): Promise<string>;

declare function decode(method: string, data: string, passphrase: string): Promise<string>;

declare function decodeHandler(e: ArcDecryptEvent): void;

declare function encodeHandler(e: ArcEncryptEvent): void;

export default function listen(): void;
