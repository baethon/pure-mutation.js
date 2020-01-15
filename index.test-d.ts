import { mutate, unpure } from '.';

const pureFn = ({ name } : { name: String }) => ({ name });
const assign = (inputRef: Object, data: Object) => inputRef;
const exclude = (inputRef: Object, keys: String[]) => inputRef;

const wrapper = unpure(pureFn);

mutate({ name: 'Jon' }, pureFn);
mutate({ name: 'Jon' }, pureFn, { assign })
mutate({ name: 'Jon' }, pureFn, { assign, exclude })
mutate({ name: 'Jon' }, pureFn, { exclude })

wrapper({ name: 'Jon' });
wrapper({ name: 'Jon' }, { assign });
wrapper({ name: 'Jon' }, { assign, exclude });
wrapper({ name: 'Jon' }, { exclude });
