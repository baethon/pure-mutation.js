type MutateObject = (fn: Function) => void;

declare const pureMutation: {
  /**
   * Mutate the input object using given pure function
   * 
   * @param input - object to be mutated
   * @param fn - pure function which will mutate the object
   */
  (input: Object, fn: Function): void;

  /**
   * Mutate the input object using given pure function
   * 
   * @param input - object to be mutated
   * @return {MutateObject}
   */
  (input: Object): MutateObject;
};

export = pureMutation;
