export function isArrayEmpty(array:Array<unknown>){
    return array.length <= 0
}

export function isNullOrUndefined(object: unknown) {
    return object === null || object === undefined;
}