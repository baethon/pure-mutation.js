import { mutate, unpure } from '.';

const pureFn = ({ name } : { name: String }) => ({ name });
const wrapper = unpure(pureFn);

mutate({ name: 'Jon' }, pureFn);
wrapper({ name: 'Jon' });