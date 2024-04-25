const PRIMITIVES = {
  primary: {
    300: '#0750F0',
    500: '#3170f8',
    100: '#d6e2fe',
  },
  secondary: {
    500: '#e6e6e6',
    300: '#e2e2e2',
  },
  tertiary: {
    500: '#0d0d0db3',
  },
};

// *** Curious as to why different naming convention, we could just define the primitive colours *** //
// const BUTTON = {
//   primary: {
//     500: '#3170F9',
//     300: '#0750F0',
//   },
// };

const componentColors = {
  'nav-active': PRIMITIVES.primary[500],
  'nav-hover': PRIMITIVES.secondary[500],
  'nav-text': PRIMITIVES.tertiary[500],
  'on-hover': PRIMITIVES.primary[500],
  'secondary-300': PRIMITIVES.secondary[300],
  'btn-primary': PRIMITIVES.primary[500],
  'btn-hover': PRIMITIVES.primary[300],
  'btn-selected': PRIMITIVES.primary[100],
};

module.exports = {
  ...componentColors,
};
