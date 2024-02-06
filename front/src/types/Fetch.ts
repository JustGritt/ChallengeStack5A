export interface IFilters {
  query?: string;
}


export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type PickPartial<T, K extends keyof T> = {
  [P in K]?: T[P];
};

export type AnyObject = { [key: string]: any };
