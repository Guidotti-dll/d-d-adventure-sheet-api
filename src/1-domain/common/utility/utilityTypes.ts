/**
 * From T, make all properties in union K optional
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type Static<
  TClass extends IStaticInterface & (new (...args: any) => void),
  IStaticInterface
> = InstanceType<TClass>

export type StaticPrivateConstrcutor<TClass extends IStaticInterface, IStaticInterface> = InstanceType<
  TClass & (new (...arg: any) => void)
>
