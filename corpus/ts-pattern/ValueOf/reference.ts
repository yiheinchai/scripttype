export type ValueOf<a> = a extends readonly any[] ? a[number] : a[keyof a];
