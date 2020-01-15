declare namespace pureMutation {
  interface MutatorOps {
    /**
     * Assign in-place given values to the input ref
     */
    assign?: (inputRef: Object, values: Object) => void;

    /**
     * Exclude in-place given keys from the input ref
     */
    exclude?: (inputRef: Object, keys: String[]) => void;
  }

  type NonPureFn = (input: Object, mutatorOps?: MutatorOps) => void;

  /**
   * Mutate input using given pure function
   */
  export function mutate(inputRef: Object, using: Function, mutatorOps?: MutatorOps): void;

  /**
   * Creates a non-pure function from given pure function
   *
   * Created function should receive an {Object} as a first argument.
   * This object will be passed to the wrapped pure function,
   * the results will be merged back to the input object.
   */
  export function unpure(fn: Function, mutatorOps?: MutatorOps): NonPureFn;
}

export = pureMutation;
