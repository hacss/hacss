const hacss = require("./index.js");
const { customConfig } = require("./config/index.js");
const testConfig = require("./test/config.js");
const example = require("./test/index.html");
const autoprefixer = require("autoprefixer");

(function() {
  const style = document.createElement("style");
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.className =
    "Pos(a) T(0) End(0) B(0) Start(0) D(f) Fxf(r) Fxf(c)--sm Fxf(c)--md";
  document.body.insertBefore(container, document.body.firstChild);

  const editPanel = document.createElement("div");
  editPanel.className = "Bgc(#222) Fxg(0) Fxs(0) Fxb(1/2) Pos(r)";
  container.appendChild(editPanel);

  const markupEditor = document.createElement("div");
  editPanel.appendChild(markupEditor);

  const configEditor = document.createElement("div");
  editPanel.appendChild(configEditor);

  markupEditor.className =
    configEditor.className =
      "Pos(a) T(40px) End(8px) B(8px) Start(8px) Bdw(2px) Bdc(#8ec58e) Bds(s)";

  configEditor.classList.add("D(n)");

  const editorTogglePanel = document.createElement("div");
  editorTogglePanel.className = "Pos(a) T(8px) End(8px) Start(8px) H(32px) D(f) Ai(st) Jc(fe)";
  editPanel.appendChild(editorTogglePanel);

  const title = document.createElement("h1");
  title.className = "M(0) Ff(ss) Fw(n) Fz(20px) C(#ccc) W(100%) D(if) Ai(c)";
  title.innerText = "Hacss Playground";
  editorTogglePanel.appendChild(title);

  const buttonClasses = "Bd(n) Px(8px) Mstart(2px) Ff(ss) Fz(14px) Bdrs(0) O(n) Cur(p)";
  const activeButtonClasses = buttonClasses + " Bgc(#8ec58e) C(#000)";
  const inactiveButtonClasses = buttonClasses + " Bgc(#444) C(#ccc)";

  const markupButton = document.createElement("button");
  const configButton = document.createElement("button");

  markupButton.innerHTML = "Markup";
  markupButton.className = activeButtonClasses;
  markupButton.addEventListener("click", () => {
    configButton.className = inactiveButtonClasses;
    markupButton.className = activeButtonClasses;
    markupEditor.classList.remove("D(n)");
    configEditor.classList.add("D(n)");
  });
  editorTogglePanel.appendChild(markupButton);

  configButton.innerHTML = "Configuration";
  configButton.className = inactiveButtonClasses;
  configButton.addEventListener("click", () => {
    configButton.className = activeButtonClasses;
    markupButton.className = inactiveButtonClasses;
    markupEditor.classList.add("D(n)");
    configEditor.classList.remove("D(n)");
  });
  editorTogglePanel.appendChild(configButton);

  const previewPanel = document.createElement("div");
  previewPanel.className = "Fxg(0) Fxs(0) Fxb(1/2) Ov(a) Pos(r)";
  container.appendChild(previewPanel);

  const [ markupCallback, configCallback ] = usePreview(
    (code, config) => {
      let parsedConfig;

      try {
        parsedConfig = eval(config);
      }
      catch (_) {
        return;
      }

      style.textContent =
        autoprefixer
          .process(
            hacss(
              code,
              customConfig(parsedConfig),
            )
          )
          .css;

      previewPanel.innerHTML = code;
    },
    example,
    testConfig,
  );

  initEditor(
    markupEditor,
    "html",
    example,
    markupCallback,
  );

  initEditor(
    configEditor,
    "javascript",
    testConfig,
    configCallback,
  );

  function usePreview(callback, initialCode, initialConfig) {
    let code = initialCode;
    let config = initialConfig;
    return [
      c => callback(code = c, config),
      c => callback(code, config = c),
    ];
  }

  function initEditor(host, mode, initialValue, callback) {
    const editor = ace.edit(host);
    editor.setTheme("ace/theme/tomorrow_night_eighties");
    const session = editor.session;
    session.setMode("ace/mode/" + mode);
    session.setOptions({
      tabSize: 2,
      useSoftTabs: true,
    });
    session.on("change", function() {
      callback(session.getValue());
    });
    session.setValue(initialValue);
  }
})();
