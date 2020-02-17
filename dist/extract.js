"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
const parseContext = (context: string): Option<Context> => sequenceS(option)({
  className: O.filterMap(head)(O.fromNullable(context.match(/[^\:_\+\>]+/))),
  operator: O.filterMap(head)(O.fromNullable(context.match(/[_\+\>]$/))),
  pseudos: O.fromNullable(context.match(/\:{1,2}[a-z]+/g))
});

*/
/*
const extract: ((code: string) => Style[]) = code =>
  Array
    .from(
      code.matchAll(
        /(?<context>\w+((\:{1,2}[a-z]+)+)?[_\+\>)])?(?<rule>[A-Z][A-Za-z]*)(\((?<args>(([^\(\)]+|([a-z][a-z\-]+[a-z])\([^\(\)]+\)),)*(([^\(\)]+|([a-z][a-z\-]+[a-z])\([^\(\)]+\))))\))?(?<pseudos>(\:{1,2}[a-z]+)+)?(\-\-(?<scope>[A-Za-z]+))?(?=(['"\s\\])|$)/gm,
      ),
    )
    .map(match => {
      const className = match[0];
      const groups = match.groups || {};
      const rule = groups["rule"];
      const scope = groups["scope"];
      const context = groups["context"];
      const args = groups["args"];
      const pseudos = groups["pseudos"];

      let parsedContext: StyleContext | null = null;
      if (context) {
        const ctxDetails = heads([
          context.match(/[^\:_\+\>]+/),
          context.match(/[_\+\>]$/)
        ]);
        const pseudos = context.match(/\:{1,2}[a-z]+/g) || [];

        if (ctxDetails !== null) {
          parsedContext = {
            className: ctxDetails[0],
            operator: ctxDetails[1],
            pseudos
          };
        }
      }

      return {
        className,
        rule,
        scope: scope || "default",
        context: parsedContext,
        args: args
          ? Array
              .from(args.matchAll(/(?:[^,]+\([^\)]+\)|[^,]+)/g))
              .map(([x]) => x)
          : [],
        pseudos: pseudos ? pseudos.match(/(\:{1,2}[a-z]+)/g) : [],
      };
    });

export default extract;
*/
