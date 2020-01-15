import { mutate, unpure } from '.';

const pluckName = ({ name } : { name: String }) => ({ name });
const assign = (inputRef: Object, data: Object) => inputRef;
const exclude = (inputRef: Object, keys: String[]) => inputRef;

mutate({ name: 'Jon' }, pluckName);
mutate({ name: 'Jon' }, pluckName, { assign })
mutate({ name: 'Jon' }, pluckName, { assign, exclude })
mutate({ name: 'Jon' }, pluckName, { exclude })

unpure(pluckName)({ name: 'Jon' });
unpure(pluckName, { assign })({ name: 'Jon' });
unpure(pluckName, { assign, exclude })({ name: 'Jon' });
unpure(pluckName, { exclude })({ name: 'Jon' });
