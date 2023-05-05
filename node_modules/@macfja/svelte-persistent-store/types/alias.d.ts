import type { Writable, StartStopNotifier } from "svelte/store";
import type { PersistentStore } from "./core";
/**
 * Persist a store into a cookie
 * @param {Writable<*>} store The store to enhance
 * @param {string} cookieName The name of the cookie
 */
export declare function persistCookie<T>(store: Writable<T>, cookieName: string): PersistentStore<T>;
/**
 * Persist a store into the browser session storage
 * @param {Writable<*>} store The store to enhance
 * @param {string} key The name of the key in the browser session storage
 */
export declare function persistBrowserSession<T>(store: Writable<T>, key: string): PersistentStore<T>;
/**
 * Persist a store into the browser local storage
 * @param {Writable<*>} store The store to enhance
 * @param {string} key The name of the key in the browser local storage
 */
export declare function persistBrowserLocal<T>(store: Writable<T>, key: string): PersistentStore<T>;
/**
 * Create a standard Svelte store persisted in Browser LocalStorage
 * @param {string} key The key of the data to persist
 * @param {*} [initialValue] The initial data of the store
 * @param {StartStopNotifier<*>} [start] start and stop notifications for subscriptions
 * @return {PersistentStore<*>}
 */
export declare function localWritable<T>(key: string, initialValue?: T, start?: StartStopNotifier<T>): PersistentStore<T>;
/**
 * Create a standard Svelte store persisted in Browser LocalStorage.
 * (Alias of [[localWritable]])
 * @param {string} key The key of the data to persist
 * @param {*} [initialValue] The initial data of the store
 * @param {StartStopNotifier<*>} [start] start and stop notifications for subscriptions
 * @return {PersistentStore<*>}
 */
export declare function writable<T>(key: string, initialValue?: T, start?: StartStopNotifier<T>): PersistentStore<T>;
/**
 * Create a standard Svelte store persisted in Browser SessionStorage
 * @param {string} key The key of the data to persist
 * @param {*} [initialValue] The initial data of the store
 * @param {StartStopNotifier<*>} [start] start and stop notifications for subscriptions
 * @return {PersistentStore<*>}
 */
export declare function sessionWritable<T>(key: string, initialValue?: T, start?: StartStopNotifier<T>): PersistentStore<T>;
/**
 * Create a standard Svelte store persisted in cookie
 * @param {string} key The key of the data to persist
 * @param {*} [initialValue] The initial data of the store
 * @param {StartStopNotifier<*>} [start] start and stop notifications for subscriptions
 * @return {PersistentStore<*>}
 */
export declare function cookieWritable<T>(key: string, initialValue?: T, start?: StartStopNotifier<T>): PersistentStore<T>;
