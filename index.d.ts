declare namespace pureMutation {
  type NonPureFn = (input: Object) => void;

  /**
   * Mutate input using given pure function
   * 
   * @param input
   * @param using
   */
  export function mutate(input: Object, using: Function): void;

  /**
   * Creates a non-pure function from given pure function
   *
   * Created function should receive an {Object} as a first argument.
   * This object will be passed to the wrapped pure function,
   * the results will be merged back to the input object.
   *
   * @param fn
   */
  export function unpure(fn: Function): NonPureFn;
}

export = pureMutation;
