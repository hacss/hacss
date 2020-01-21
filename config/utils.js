exports.color = c => {
  const presets = {
    t: "transparent",
    cc: "currentColor",
    n: "none",
  };

  if (c in presets) {
    return presets[c];
  }

  const hexAlpha = c.match(/^\#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})(\.[0-9]{1,2})$/);
  if (hexAlpha) {
    const [_, hex, alpha] = hexAlpha;
    const dec = hex
      .split(new RegExp(`(.{${hex.length / 3}})`, "g"))
      .filter((_, i) => i % 2)
      .map(c => (c.length === 1 ? `${c}${c}` : c))
      .map(c => parseInt(`0x${c}`))
      .join(",");
    return `rgba(${dec},${alpha})`;
  }

  return c;
};

exports.fractionToPercentage = value =>
  [value]
    .map(f => f.match(/(?<num>([0-9]+))\/(?<den>([0-9]+))/))
    .filter(x => x)
    .map(({ groups }) => groups)
    .map(({ num, den }) => `${Math.round((num / den) * 10000) / 100}%`)
    .concat(value)[0];

exports.lookup = map => key => map[key] || key;

exports.mapArgs = (f, ...fs) => (...args) =>
  f.apply(
    null,
    args.map((a, i) => {
      const fn = fs[i];
      if (typeof fn === "function") {
        return fs[i](a);
      }
      if (fn.reduce) {
        return fn.reverse().reduce((x, f) => f(x), a);
      }
      return a;
    }),
  );
