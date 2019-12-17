declare namespace pureMutation {

  /**
   * Mutate input using given pure function
   * 
   * @param input
   * @param using
   */
  export function mutate(input: Object, using: Function): void;
}

export = pureMutation;
