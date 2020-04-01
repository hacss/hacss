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
  editPanel.className = "Fxg(0) Fxs(0) Fxb(1/2)";
  container.appendChild(editPanel);

  const previewPanel = document.createElement("div");
  previewPanel.className = "Fxg(0) Fxs(0) Fxb(1/2) Ov(a) Pos(r)";
  container.appendChild(previewPanel);

  const editor = ace.edit(editPanel);

  editor.setTheme("ace/theme/cobalt");

  const session = editor.session;

  session.setMode("ace/mode/html");

  session.setOptions({
    tabSize: 2,
    useSoftTabs: true,
  });

  session.on("change", function() {
    const code = session.getValue();
    style.textContent =
      autoprefixer.process(hacss(code, customConfig(testConfig))).css;
    previewPanel.innerHTML = code;
  });

  session.setValue(example);
})();
