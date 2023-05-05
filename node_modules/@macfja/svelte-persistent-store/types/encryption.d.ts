import type { StorageInterface } from "./core";
/**
 * The behavior when no encryption library is available when requesting an encrypted storage
 * @deprecated
 */
export declare enum NO_ENCRYPTION_BEHAVIOR {
    /**
     * Throw an exception
     */
    EXCEPTION = 0,
    /**
     * Use the wrapped Storage as-is
     */
    NO_ENCRYPTION = 1,
    /**
     * Don't use any storage, so no not encrypted data will be persisted
     */
    NO_STORAGE = 2
}
/**
 * Set the behavior when no encryption library is available when requesting an encrypted storage
 * @deprecated
 * @param behavior
 */
export declare function noEncryptionBehavior(behavior: NO_ENCRYPTION_BEHAVIOR): void;
/**
 * The encryption interface
 */
export interface Encryption {
    /**
     * Hash the input data
     * @param {string} data The data to hash
     * @return {string} The hashed data
     */
    hash: (data: string) => string;
    /**
     * Encrypt the input data.
     *
     * Must be reversible with `decrypt` function.
     * @param {string} data The data to encrypt
     * @return {string} The encrypted data
     */
    encrypt: (data: string) => string;
    /**
     * Decrypt the input data.
     *
     * Must be reversible with `encrypt` function.
     * @param {string} data The data to decrypt
     * @return {string} The decrypted data
     */
    decrypt: (data: string) => string;
}
/**
 * Encryption implementation with AES-256-GCM
 */
export declare class GCMEncryption implements Encryption {
    /**
     * The AES cipher to use for hashing, encrypting and decrypting
     * @private
     */
    private readonly cipher;
    /**
     * The GCM Encryption constructor
     * @param {string} encryptionKey The HEX key to use for encryption
     */
    constructor(encryptionKey: string);
    /**
     * Encrypt the input data.
     *
     * @param {string} data The data to encrypt
     * @param {string} [iv] The IV to use during the encryption (default to "sps")
     * @return {string} The encrypted data
     */
    encrypt(data: string, iv?: string | undefined): string;
    /**
     * Encrypt the input data.
     *
     * The IV is extracted from the encrypted data.
     *
     * @param {string} data The data to decrypt
     * @return {string} The decrypted data
     */
    decrypt(data: string): string;
    /**
     * Hash the input data.
     *
     * Use the encrypt function with the IV set to "sps"
     *
     * @param {string} data The data to hash
     * @return {string} The hashed data
     */
    hash(data: string): string;
}
/**
 * Add encryption layer on a storage
 * @deprecated Use createEncryptionStorage instead
 * @param wrapped The storage to enhance
 * @param encryptionKey The encryption key to use on key and data
 */
export declare function createEncryptedStorage<T>(wrapped: StorageInterface<string>, encryptionKey: string): StorageInterface<T>;
/**
 * Add encryption layer on a storage
 * @param wrapped The storage to enhance
 * @param encryption The encryption to use on key and data
 */
export declare function createEncryptionStorage<T>(wrapped: StorageInterface<string>, encryption: Encryption): StorageInterface<T>;
