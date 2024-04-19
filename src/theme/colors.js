const PRIMITIVES = {
  primary: {
    500: '#3170f8',
  },
  secondary: {
    500: '#e6e6e6',
  },
  tertiary: {
    500: '#0d0d0db3',
  },
};

const componentColors = {
  'nav-active': PRIMITIVES.primary[500],
  'nav-hover': PRIMITIVES.secondary[500],
  'nav-text': PRIMITIVES.tertiary[500],
  'on-hover': PRIMITIVES.primary[500],
};

module.exports = {
  ...componentColors,
};
