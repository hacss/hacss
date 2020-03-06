const hacss = require("./index.js");
const { customConfig } = require("./config/index.js");
const testConfig = require("./test/config.js");
const example = require("./test/index.html").default;

(function() {
  const style = document.createElement("style");
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.className =
    "Pos(a) T(0) End(0) B(0) Start(0) D(f) Fxf(r) Fxf(c)--sm Fxf(c)--md";
  document.body.insertBefore(container, document.body.firstChild);

  const editPanel = document.createElement("div");
  editPanel.className = "Fxg(1) Fxs(1) Fxb(1/2)";
  container.appendChild(editPanel);

  const previewPanel = document.createElement("div");
  previewPanel.className = "Fxg(1) Fxs(1) Fxb(1/2) Ov(a) Pos(r)";
  updatePreview(example);
  container.appendChild(previewPanel);

  const editor = ace.edit(editPanel);
  editor.setTheme("ace/theme/cobalt");
  editor.session.setMode("ace/mode/html");
  editor.session.setOptions({
    tabSize: 2,
    useSoftTabs: true,
  });
  editor.session.setValue(example.trim());
  editor.session.on("change", function() {
    var code = editor.session.getValue();
    updatePreview(code);
  });

  function updatePreview(code) {
    style.textContent = hacss(code, customConfig(testConfig));
    previewPanel.innerHTML = code;
  }
})();
