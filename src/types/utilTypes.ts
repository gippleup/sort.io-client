export type ArrayElement<A> = A extends readonly (infer T)[]
  ? T
  : never

export type NoUndefinedField<T> = { [P in keyof T]-?:
  NonNullable<T[P]> extends Function 
    ? NonNullable<T[P]> 
    : NoUndefinedField<NonNullable<T[P]>> 
};