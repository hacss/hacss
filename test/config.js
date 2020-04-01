module.exports = {
  rules: {
    Tstk: (size, color) => `
      text-shadow:
        -${size} -${size} 0 ${color},
        ${size} -${size} 0 ${color},
        -${size} ${size} 0 ${color},
        ${size} ${size} 0 ${color}
      ;
    `,
  },
};
