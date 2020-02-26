import { array, sortBy, uniq } from "fp-ts/lib/Array";
import { fromEquals } from "fp-ts/lib/Eq";
import { Option, getOrElse, option, none, some } from "fp-ts/lib/Option";
import * as O from "fp-ts/lib/Option";
import { ord } from "fp-ts/lib/Ord";
import { flow } from "fp-ts/lib/function";
import { pipe } from "fp-ts/lib/pipeable";
import { Context, mkContext } from "./Context";
import { Pseudo, mkPseudo, ordPseudos } from "./Pseudo";

export type Style = {
  className: string,
  context: Option<Context>,
  ruleName: string,
  args: string[],
  pseudos: Pseudo[],
  scope: string,
};

export const stylesFromCode = (code: string): Style[] => {
  const matchEq = fromEquals(
    (a: RegExpMatchArray, b: RegExpMatchArray): boolean => a[0] === b[0]
  );

  const matches: [string, { [group: string]: string }][] =
    array.filterMap(
      uniq(matchEq)(
        Array.from(
          code.matchAll(
            /(?<context>\w+((\:{1,2}[a-z]+)+)?[_\+\>)])?(?<ruleName>[A-Z][A-Za-z]*)(\((?<args>(([^\(\)]+|([a-z][a-z\-]+[a-z])\([^\(\)]+\)),)*(([^\(\)]+|([a-z][a-z\-]+[a-z])\([^\(\)]+\))))\))?(?<pseudos>(\:{1,2}[a-z]+)+)?(\-\-(?<scope>[A-Za-z]+))?(?=(['"\s\\])|$)/gm
          )
        )
      ),
      match => match.groups
        ? some([match[0], match.groups])
        : none
    );

  const styles = array.map(
    matches,
    ([ className, groups ]) => ({
      className,
      context: pipe(
        O.fromNullable(groups["context"]),
        O.chain(mkContext)
      ),
      ruleName: groups["ruleName"],
      args: pipe(
        O.fromNullable(groups["args"]),
        O.chain(x => some(
          Array
            .from(x.matchAll(/(?:[^,]+\([^\)]+\)|[^,]+)/g))
            .map(([x]) => x)
        )),
        getOrElse(() => <string[]>[])
      ),
      pseudos: pipe(
        O.fromNullable(groups["pseudos"]),
        O.chain(pseudos => O.fromNullable(pseudos.match(/\:{1,2}[a-z]+/g))),
        O.chain(x => array.traverse(option)(x, mkPseudo)),
        getOrElse(() => <Pseudo[]>[])
      ),
      scope: pipe(
        O.fromNullable(groups["scope"]),
        O.getOrElse(() => "default")
      )
    })
  );

  const getStyleContextPseudos: (x: Style) => Pseudo[] = flow(
    x => x.context,
    O.map(c => c.pseudos),
    getOrElse(() => <Pseudo[]>[])
  );

  const getStylePseudos = (x: Style): Pseudo[] => x.pseudos;

  return sortBy([
    ord.contramap(
      ordPseudos,
      getStyleContextPseudos
    ),
    ord.contramap(
      ordPseudos,
      getStylePseudos
    )
  ])(styles);
};
