import { serialize as defaultSerializer, deserialize as defaultDeserializer, type ClassDefinition } from "@macfja/serializer";
import type { Writable } from "svelte/store";
/**
 * Disabled warnings about missing/unavailable storages
 */
export declare function disableWarnings(): void;
/**
 * Add a class to the allowed list of classes to be serialized
 * @param classDef The class to add to the list
 */
export declare function addSerializableClass(classDef: ClassDefinition<any>): void;
/**
 * The function that will be used to serialize data
 * @internal
 * @private
 * @type {(data: any) => string}
 */
export declare let serialize: typeof defaultSerializer;
/**
 * The function that will be used to deserialize data
 * @internal
 * @private
 * @type {(input: string) => any}
 */
export declare let deserialize: typeof defaultDeserializer;
/**
 * Set the serialization functions to use
 * @param {(data: any) => string} serializer The function to use to transform any data into a string
 * @param {(input: string) => any} deserializer The function to use to transform back string into the original data (reverse of the serializer)
 * @param {(classConstructor: ClassDefinition<any>) => void} [addSerializableClass] The function to use to add a class in the serializer/deserializer allowed class
 */
export declare function setSerialization(serializer: (data: any) => string, deserializer: (input: string) => any, addSerializableClass?: (classConstructor: ClassDefinition<any>) => void): void;
/**
 * A store that keep its value in time.
 */
export interface PersistentStore<T> extends Writable<T> {
    /**
     * Delete the store value from the persistent storage
     */
    delete(): void;
}
/**
 * Storage interface
 */
export interface StorageInterface<T> {
    /**
     * Get a value from the storage.
     *
     * If the value doesn't exist in the storage, `null` should be returned.
     * This method MUST be synchronous.
     * @param key The key/name of the value to retrieve
     */
    getValue(key: string): T | null;
    /**
     * Save a value in the storage.
     * @param key The key/name of the value to save
     * @param value The value to save
     */
    setValue(key: string, value: T): void;
    /**
     * Remove a value from the storage
     * @param key The key/name of the value to remove
     */
    deleteValue(key: string): void;
}
export interface SelfUpdateStorageInterface<T> extends StorageInterface<T> {
    /**
     * Add a listener to the storage values changes
     * @param {string} key The key to listen
     * @param {(newValue: T) => void} listener The listener callback function
     */
    addListener(key: string, listener: (newValue: T) => void): void;
    /**
     * Remove a listener from the storage values changes
     * @param {string} key The key that was listened
     * @param {(newValue: T) => void} listener The listener callback function to remove
     */
    removeListener(key: string, listener: (newValue: T) => void): void;
}
/**
 * Make a store persistent
 * @param {Writable<*>} store The store to enhance
 * @param {StorageInterface} storage The storage to use
 * @param {string} key The name of the data key
 */
export declare function persist<T>(store: Writable<T>, storage: StorageInterface<T>, key: string): PersistentStore<T>;
/**
 * Storage implementation that use the browser local storage
 * @param {boolean} listenExternalChanges Update the store if the localStorage is updated from another page
 */
export declare function createLocalStorage<T>(listenExternalChanges?: boolean): StorageInterface<T>;
/**
 * Storage implementation that use the browser session storage
 * @param {boolean} listenExternalChanges Update the store if the sessionStorage is updated from another page
 */
export declare function createSessionStorage<T>(listenExternalChanges?: boolean): StorageInterface<T>;
/**
 * Storage implementation that use the browser cookies
 */
export declare function createCookieStorage(): StorageInterface<any>;
/**
 * Storage implementation that use the browser IndexedDB
 */
export declare function createIndexedDBStorage<T>(): SelfUpdateStorageInterface<T>;
export declare enum CHROME_STORAGE_TYPE {
    LOCAL = 0,
    SESSION = 1,
    SYNC = 2
}
export declare function createChromeStorage<T>(storageType?: CHROME_STORAGE_TYPE, listenExternalChanges?: boolean): SelfUpdateStorageInterface<T>;
/**
 * Storage implementation that do nothing
 */
export declare function createNoopStorage(): StorageInterface<any>;
