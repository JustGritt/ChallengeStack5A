
type Paths<T> = T extends object ? { [K in keyof T]:
    `${Exclude<K, symbol>}${"" | `.${Paths<T[K]>}`}`
}[keyof T] : never

type Leaves<T> = T extends object ? { [K in keyof T]:
    `${Exclude<K, symbol>}${Leaves<T[K]> extends never ? "" : `.${Leaves<T[K]>}`}`
}[keyof T] : never

interface ServerSideComponentProp<
    Params,
    SearchParams = undefined,
> {
    params: Params;
    searchParams: SearchParams;
}

interface AnyProperties {
    [prop: string]: any
}