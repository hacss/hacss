module.exports = {
  Bd: () => "border: 1px solid #000",
  C: color => `color: ${color}`,
  O: (size, color) => `
    box-shadow: 0 0 0 ${size} ${color};
    outline: 0;
  `,
};
