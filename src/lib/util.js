import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Simulates a delay from the server for dev api calls
 * @param ms {number} time delay in milliseconds
 * @returns {Promise<any>}
 */
export function delay(ms = 1500) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Wraps the json-server response so it matches the response coming from the RESTlet
 * @param response
 * @returns {{result, governanceRemaining: number, elapsedTime: number}}
 */
export function wrap(response) {
    return {
        result: response,
        elapsedTime: 0.01,
        governanceRemaining: 5000,
    };
}

/**
 * Provides a well-named empty response object in the same format as the RESTlet
 * @returns {{result, governanceRemaining: number, elapsedTime: number}}
 */
export function emptyResponse() {
    return wrap([]);
}
