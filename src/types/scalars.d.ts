/* eslint-disable no-unused-vars */
export type Maybe<T> = T | undefined
export type Nullable<T> = T | null
export type MaybeNullable<T> = T | undefined | null

/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string | Integer
  Int: number // as Integer
  Float: number // as Float
  double: number // as double as Float
  DateTime: Date | string | number
  Date: Date | string | number
}

export type Integer = number

export type Float = number

export type Primitive = string | number | boolean | bigint | symbol | Date;

export type ModelPrimitive = string | number | null | boolean;

export type ErrorHandler = (err: Error) => void

export type PromiseOr<T = void> = Promise<T> | T

export type Token = string | null

export type Keys<T> = T extends any ? keyof T : never

export type KeysOf<T> = {
  [x in keyof T]: string;
};

export type IsUnion<T, U = T> = U extends any ? ([T] extends [U] ? false : true) : never;

// See: https://stackoverflow.com/a/49936686/7931540
export type NonAny = Primitive | null;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends NonAny[] // checks for nested any[]
    ? T[P]
    : T[P] extends readonly NonAny[] // checks for nested ReadonlyArray<any>
      ? T[P]
      : T[P] extends Array<infer U>
        ? Array<DeepPartial<U>>
        : T[P] extends ReadonlyArray<infer U>
          ? ReadonlyArray<DeepPartial<U>>
          : T[P] extends Set<infer V> // checks for Sets
            ? Set<DeepPartial<V>>
            : T[P] extends Map<infer K, infer V> // checks for Maps
              ? Map<K, DeepPartial<V>>
              : T[P] extends NonAny // checks for primative values
                ? T[P]
                : DeepPartial<T[P]>; // recurse for all non-array and non-primative values
};
