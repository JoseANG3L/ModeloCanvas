"use strict";

const definitions = [
  {
    id: "partners", title: "Socios clave", icon: "fa-handshake", prompt: "¿Quiénes te ayudan a operar?", items: [
      "Empresas de logística y transporte para mejorar envíos.",
      "Bancos y fintech para fortalecer Mercado Pago.",
      "Marcas y comercios que venden en la plataforma.",
      "Gobiernos y reguladores para expandir operaciones.",
      "Empresas de tecnología para mejorar la infraestructura digital."
    ]
  },
  {
    id: "activities", title: "Actividades clave", icon: "fa-list-check", prompt: "¿Qué actividades sostienen el negocio?", items: [
      "Desarrollo continuo de la plataforma y herramientas digitales.",
      "Expansión y optimización de la red logística en Latinoamérica.",
      "Innovación en soluciones financieras con Mercado Pago."
    ]
  },
  {
    id: "resources", title: "Recursos clave", icon: "fa-layer-group", prompt: "¿Qué recursos necesitas?", items: [
      "Plataforma tecnológica con IA y análisis de datos.",
      "Red de logística y distribución con Mercado Envíos.",
      "Mercado Pago como ecosistema financiero digital."
    ]
  },
  {
    id: "value", title: "Propuesta de valor", icon: "fa-gem", prompt: "¿Qué problema resuelves?", items: [
      "Plataforma de comercio electrónico con una amplia variedad de productos.",
      "Soluciones logísticas con Mercado Envíos.",
      "Servicios financieros digitales con Mercado Pago.",
      "Inteligencia artificial para mejorar la experiencia del usuario.",
      "Herramientas de venta digital para emprendedores."
    ]
  },
  {
    id: "relationships", title: "Relaciones con clientes", icon: "fa-comments", prompt: "¿Cómo atiendes y conservas a tus clientes?", items: [
      "Atención automatizada con chatbots y asistencia personalizada.",
      "Programas de fidelización con beneficios exclusivos.",
      "Seguridad en pagos y envíos para generar confianza."
    ]
  },
  {
    id: "channels", title: "Canales", icon: "fa-share-nodes", prompt: "¿Cómo llegas a tus clientes?", items: [
      "Sitio web y aplicación móvil con recomendaciones personalizadas.",
      "Mercado Envíos como canal de distribución y logística."
    ]
  },
  {
    id: "segments", title: "Segmentos de clientes", icon: "fa-users", prompt: "¿A quién le ofreces valor?", items: [
      "Consumidores que buscan compras en línea rápidas y seguras.",
      "Pequeñas y medianas empresas que venden en la plataforma.",
      "Grandes marcas que usan Mercado Libre como canal de ventas.",
      "Usuarios de servicios financieros digitales.",
      "Emprendedores que buscan soluciones logísticas y de venta digital."
    ]
  },
  {
    id: "costs", title: "Estructura de costos", icon: "fa-calculator", prompt: "¿Cuáles son tus costos principales?", items: [
      "Desarrollo y mantenimiento de la plataforma de comercio electrónico.",
      "Operación y expansión logística de Mercado Envíos.",
      "Seguridad digital y protección de datos.",
      "Marketing digital y estrategias de crecimiento.",
      "Innovación y desarrollo de Mercado Pago."
    ]
  },
  {
    id: "income", title: "Fuentes de ingresos", icon: "fa-chart-line", prompt: "¿De dónde vienen tus ingresos?", items: [
      "Comisiones por ventas en la plataforma.",
      "Servicios logísticos de Mercado Envíos.",
      "Transacciones y comisiones de Mercado Pago.",
      "Publicidad y posicionamiento de productos.",
      "Financiamiento y créditos digitales para usuarios y vendedores."
    ]
  }
];

const palettes = [
  { name: "Verde", accent: "#17674e", paper: "#ffffff", copy: "#273a34" },
  { name: "Azul de la referencia", accent: "#007dae", paper: "#fcf6ef", copy: "#29394a" },
  { name: "Violeta", accent: "#6946a0", paper: "#fcf9ff", copy: "#342842" },
  { name: "Terracota", accent: "#a34727", paper: "#fff9f4", copy: "#46312a" },
  { name: "Grafito", accent: "#303c49", paper: "#f9fafc", copy: "#19242d" },
  { name: "Azul marino", accent: "#233c67", paper: "#f4f7fd", copy: "#202c40" },
  { name: "Azul cobalto", accent: "#294caf", paper: "#f3f6ff", copy: "#23314c" },
  { name: "Turquesa", accent: "#08736f", paper: "#effbf9", copy: "#193e3c" },
  { name: "Esmeralda", accent: "#087347", paper: "#f0fbf4", copy: "#234132" },
  { name: "Oliva", accent: "#576424", paper: "#f8faee", copy: "#303721" },
  { name: "Dorado", accent: "#845700", paper: "#fff9e8", copy: "#403622" },
  { name: "Naranja", accent: "#a54410", paper: "#fff5ed", copy: "#492f22" },
  { name: "Coral", accent: "#ad3f45", paper: "#fff2f1", copy: "#4e2d30" },
  { name: "Rosa", accent: "#a43671", paper: "#fff2f9", copy: "#472b3c" },
  { name: "Vino", accent: "#7c294b", paper: "#fbf2f5", copy: "#3d2430" }
];
const fonts = {
  "DM Sans": "sans-serif", Inter: "sans-serif", "Playfair Display": "serif",
  "Space Mono": "monospace", Arial: "sans-serif", Georgia: "serif"
};
const defaults = {
  accent: palettes[0].accent, paper: palettes[0].paper, copy: palettes[0].copy,
  font: "DM Sans", titleSize: 35, textSize: 13, exportWidth: 1600
};
const storageKey = "modelo-canvas-v1";
const get = (id) => document.getElementById(id);
const board = get("board");
const feedback = get("feedback");
const colorKeys = ["accent", "paper", "copy"];
let feedbackTimer;
let activeBlock;
let pendingModel;
let exporting = false;

function createModel(example) {
  return {
    version: 1,
    title: example ? "Modelo Canvas de Mercado Libre" : "Mi modelo Canvas",
    design: { ...defaults },
    blocks: definitions.map(({ id, title, items }) => ({ id, title, items: example ? [...items] : [] }))
  };
}

function normalizeModel(value) {
  if (value?.version !== 1 || typeof value.title !== "string" || !Array.isArray(value.blocks)) {
    throw new Error("Selecciona un proyecto JSON generado por el editor.");
  }

  const next = createModel(false);
  next.title = value.title.slice(0, 150);
  for (const key of colorKeys) {
    const color = value.design?.[key];
    if (typeof color === "string" && /^#[0-9a-f]{6}$/i.test(color)) next.design[key] = color.toLowerCase();
  }
  if (Object.hasOwn(fonts, value.design?.font)) next.design.font = value.design.font;

  for (const [key, min, max] of [["titleSize", 22, 66], ["textSize", 11, 26]]) {
    const size = value.design?.[key];
    if (Number.isInteger(size)) next.design[key] = Math.max(min, Math.min(max, size));
  }
  if ([1200, 1600, 1920, 2400].includes(value.design?.exportWidth)) next.design.exportWidth = value.design.exportWidth;

  next.blocks = next.blocks.map((block) => {
    const source = value.blocks.find((item) => item?.id === block.id);
    if (!source || typeof source.title !== "string" || !Array.isArray(source.items) ||
      source.items.some((item) => typeof item !== "string")) {
      throw new Error("El proyecto debe incluir los nueve bloques del modelo.");
    }
    const items = source.items.join("\n").slice(0, 3500).split("\n").map((item) => item.trim()).filter(Boolean);
    return { id: block.id, title: source.title.trim().slice(0, 100) || block.title, items };
  });
  return next;
}

function loadModel() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) return normalizeModel(JSON.parse(saved));
  } catch {
    // A corrupt or unavailable store can be replaced by the next successful save.
  }
  return createModel(true);
}

let model = loadModel();

function saveModel() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(model));
  } catch {
    showFeedback("Guardado local no disponible.");
  }
}

function showFeedback(message) {
  clearTimeout(feedbackTimer);
  feedback.textContent = message;
  feedbackTimer = setTimeout(() => { feedback.textContent = ""; }, 6500);
}

function mixColors(base, accent, ratio) {
  const channels = [1, 3, 5].map((offset) => {
    const from = parseInt(base.slice(offset, offset + 2), 16);
    const to = parseInt(accent.slice(offset, offset + 2), 16);
    return Math.round(from + (to - from) * ratio).toString(16).padStart(2, "0");
  });
  return "#" + channels.join("");
}

function updateDesign() {
  const { accent, paper, copy, font, titleSize, textSize } = model.design;
  board.style.setProperty("--accent", accent);
  board.style.setProperty("--paper", paper);
  board.style.setProperty("--copy", copy);
  board.style.setProperty("--canvas-font", '"' + font + '", ' + fonts[font]);
  board.style.setProperty("--heading-size", titleSize / 16 + "rem");
  board.style.setProperty("--copy-size", textSize / 16 + "rem");
  board.style.setProperty("--line", mixColors(paper, accent, .28));
  board.style.setProperty("--tint", mixColors(paper, accent, .045));
  for (const key of colorKeys) {
    get(key).value = model.design[key];
    get(key + "-value").value = model.design[key].toUpperCase();
  }
  get("title-size-value").value = titleSize + " px";
  get("text-size-value").value = textSize + " px";
  for (const [index, button] of Array.from(get("presets").children).entries()) {
    button.setAttribute("aria-pressed", String(colorKeys.every((key) => palettes[index][key] === model.design[key])));
  }
}

function makeIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  icon.setAttribute("aria-hidden", "true");
  return icon;
}

function makeBullet() {
  const bullet = document.createElement("span");
  bullet.className = "idea-bullet";
  bullet.setAttribute("aria-hidden", "true");
  return bullet;
}

function displayTitle() {
  return model.title.trim() || "Mi modelo Canvas";
}

function renderBlocks() {
  const cards = definitions.map((definition, index) => {
    const block = model.blocks[index];
    const card = document.createElement("article");
    card.className = "block";
    card.dataset.block = definition.id;

    const header = document.createElement("div");
    header.className = "block-header d-flex align-items-start gap-2";
    const iconBox = document.createElement("span");
    iconBox.className = "block-icon";
    iconBox.append(makeIcon("fa-solid " + definition.icon));
    const title = document.createElement("h3");
    title.textContent = block.title;
    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "edit-block";
    edit.dataset.edit = definition.id;
    edit.title = "Editar " + block.title;
    edit.setAttribute("aria-label", edit.title);
    edit.append(makeIcon("fa-solid fa-pencil"));
    header.append(iconBox, title, edit);
    card.append(header);

    if (block.items.length) {
      const list = document.createElement("ul");
      list.className = "block-ideas list-unstyled";
      list.setAttribute("role", "list");
      for (const idea of block.items) {
        const item = document.createElement("li");
        const content = document.createElement("span");
        content.className = "idea-text";
        content.textContent = idea;
        item.append(makeBullet(), content);
        list.append(item);
      }
      card.append(list);
    } else {
      const placeholder = document.createElement("p");
      placeholder.className = "empty-block";
      placeholder.textContent = definition.prompt;
      card.append(placeholder);
    }
    return card;
  });
  get("blocks").replaceChildren(...cards);
}

function renderModel() {
  get("model-title").value = model.title;
  get("board-title").textContent = displayTitle();
  get("font").value = model.design.font;
  get("title-size").value = model.design.titleSize;
  get("text-size").value = model.design.textSize;
  get("export-width").value = model.design.exportWidth;
  updateDesign();
  renderBlocks();
}

function replaceModel(next, heading, action) {
  pendingModel = next;
  get("replace-title").textContent = heading;
  get("confirm-replace").textContent = action;
  get("replace-dialog").returnValue = "";
  get("replace-dialog").showModal();
}

function fileName() {
  return displayTitle().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80) || "modelo-canvas";
}

function download(blob, name) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

function exportProject() {
  const data = new Blob([JSON.stringify(model, null, 2)], { type: "application/json" });
  download(data, fileName() + ".json");
  showFeedback("Proyecto editable descargado.");
}

async function exportVisual(format) {
  if (exporting) return;
  const name = fileName();
  const targetWidth = model.design.exportWidth;
  const captureWidth = 1200;
  const capture = board.cloneNode(true);
  capture.classList.add("export-copy");
  capture.removeAttribute("id");
  capture.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
  capture.style.width = captureWidth + "px";
  const stage = get("capture-stage");
  exporting = true;
  showFeedback("Preparando " + format.toUpperCase() + "…");

  try {
    if (!window.html2canvas) throw new Error("No se pudo cargar el exportador de imágenes. Revisa tu conexión.");
    if (format === "pdf" && !window.jspdf?.jsPDF) throw new Error("No se pudo cargar el exportador de PDF. Revisa tu conexión.");

    stage.append(capture);
    await document.fonts.ready;
    const canvas = await window.html2canvas(capture, {
      backgroundColor: null,
      scale: targetWidth / captureWidth,
      windowWidth: Math.max(1280, window.innerWidth),
      scrollX: 0,
      scrollY: 0,
      logging: false,
      onclone: (clonedDocument) => {
        const clonedStage = clonedDocument.getElementById(stage.id);
        clonedStage.style.left = "0";
        clonedStage.style.visibility = "visible";
      }
    });

    if (format === "pdf") {
      const width = 420;
      const height = 297;
      const margin = 10;
      const factor = Math.min((width - 2 * margin) / canvas.width, (height - 2 * margin) / canvas.height);
      const imageWidth = canvas.width * factor;
      const imageHeight = canvas.height * factor;
      const pdf = new window.jspdf.jsPDF({ orientation: "landscape", unit: "mm", format: "a3", compress: true });
      pdf.addImage(canvas, "PNG", (width - imageWidth) / 2, margin, imageWidth, imageHeight);
      pdf.save(name + ".pdf");
    } else {
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("No se pudo generar la imagen.");
      download(blob, name + ".png");
    }
    showFeedback(format.toUpperCase() + " descargado.");
  } catch (error) {
    showFeedback(error.message || "No se pudo exportar el modelo.");
  } finally {
    capture.remove();
    exporting = false;
  }
}

for (const palette of palettes) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "preset";
  button.style.setProperty("--sample", palette.accent);
  button.title = palette.name;
  button.setAttribute("aria-label", palette.name);
  button.append(makeIcon(""));
  button.addEventListener("click", () => {
    for (const key of colorKeys) model.design[key] = palette[key];
    updateDesign();
    saveModel();
  });
  get("presets").append(button);
}

get("model-title").addEventListener("input", (event) => {
  model.title = event.target.value;
  get("board-title").textContent = displayTitle();
  saveModel();
});

for (const [id, key] of [...colorKeys.map((key) => [key, key]), ["font", "font"],
["title-size", "titleSize"], ["text-size", "textSize"], ["export-width", "exportWidth"]]) {
  get(id).addEventListener("input", (event) => {
    const field = event.target;
    model.design[key] = field.type === "range" || id === "export-width" ? Number(field.value) : field.value;
    updateDesign();
    saveModel();
  });
}

const ideaRows = get("idea-rows");
const addIdea = get("add-idea");
const ideaError = get("idea-error");

function labelIdeaRows() {
  Array.from(ideaRows.children).forEach((row, index) => {
    const number = index + 1;
    row.querySelector("textarea").setAttribute("aria-label", "Idea " + number);
    row.querySelector("button").setAttribute("aria-label", "Quitar idea " + number);
  });
}

function makeIdeaRow(value = "") {
  const row = document.createElement("li");
  row.className = "idea-row";
  const field = document.createElement("textarea");
  field.className = "form-control";
  field.rows = 1;
  field.enterKeyHint = "enter";
  field.maxLength = 3500;
  field.setAttribute("aria-describedby", "idea-help");
  field.placeholder = "Escribe una idea";
  field.value = value;
  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "btn btn-sm btn-editor icon-action remove-idea";
  remove.title = "Quitar idea";
  remove.append(makeIcon("fa-solid fa-xmark"));
  row.append(makeBullet(), field, remove);
  return row;
}

function insertIdea(afterRow = ideaRows.lastElementChild) {
  const row = makeIdeaRow();
  if (afterRow) afterRow.after(row);
  else ideaRows.append(row);
  labelIdeaRows();
  row.querySelector("textarea").focus();
}

addIdea.addEventListener("click", () => insertIdea());
ideaRows.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" || event.isComposing || !event.target.matches("textarea")) return;
  event.preventDefault();
  if (!event.repeat) insertIdea(event.target.closest("li"));
});

function isIdeaLineBreak(event) {
  return !event.isComposing && event.target.matches("textarea") &&
    (event.inputType === "insertLineBreak" || event.inputType === "insertParagraph" ||
      ((!event.inputType || event.inputType === "insertText") && event.data === "\n"));
}

ideaRows.addEventListener("beforeinput", (event) => {
  if (!event.cancelable || !isIdeaLineBreak(event)) return;
  event.preventDefault();
  insertIdea(event.target.closest("li"));
});

ideaRows.addEventListener("input", (event) => {
  ideaError.hidden = true;
  if (!isIdeaLineBreak(event)) return;

  const field = event.target;
  const caret = field.selectionStart;
  if (field.value[caret - 1] !== "\n") return;
  field.setRangeText("", caret - 1, caret, "end");
  insertIdea(field.closest("li"));
});
ideaRows.addEventListener("click", (event) => {
  const remove = event.target.closest(".remove-idea");
  if (!remove) return;
  const row = remove.closest("li");
  const nextRow = row.nextElementSibling || row.previousElementSibling;
  row.remove();
  labelIdeaRows();
  ideaError.hidden = true;
  (nextRow?.querySelector("textarea") || addIdea).focus();
});

get("blocks").addEventListener("click", (event) => {
  const button = event.target.closest("[data-edit]");
  if (!button) return;
  activeBlock = model.blocks.find((block) => block.id === button.dataset.edit);
  get("block-dialog-title").textContent = "Editar " + activeBlock.title;
  get("block-title").value = activeBlock.title;
  get("block-title").setCustomValidity("");
  const ideas = activeBlock.items.length ? activeBlock.items : [""];
  ideaRows.replaceChildren(...ideas.map((idea) => makeIdeaRow(idea)));
  labelIdeaRows();
  ideaError.hidden = true;
  get("block-dialog").showModal();
});

get("block-title").addEventListener("input", (event) => event.target.setCustomValidity(""));
get("block-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const titleField = get("block-title");
  const title = titleField.value.trim();
  if (!title) {
    titleField.setCustomValidity("Escribe un encabezado.");
    titleField.reportValidity();
    return;
  }
  const ideas = Array.from(ideaRows.querySelectorAll("textarea"), (field) =>
    field.value.replace(/\s*\n\s*/g, " ").trim()
  ).filter(Boolean);
  if (ideas.join("\n").length > 3500) {
    ideaError.hidden = false;
    ideaError.textContent = "Las ideas del bloque pueden sumar hasta 3500 caracteres.";
    return;
  }
  activeBlock.title = title;
  activeBlock.items = ideas;
  get("block-dialog").close();
  renderBlocks();
  get("blocks").querySelector('[data-edit="' + activeBlock.id + '"]').focus();
  saveModel();
});

for (const button of document.querySelectorAll("[data-close]")) {
  button.addEventListener("click", () => get(button.dataset.close).close());
}

get("new-model").addEventListener("click", () => replaceModel(createModel(false), "¿Crear un modelo nuevo?", "Crear modelo"));
get("load-example").addEventListener("click", () => replaceModel(createModel(true), "¿Abrir el ejemplo de Mercado Libre?", "Abrir ejemplo"));
get("backup-model").addEventListener("click", exportProject);
get("replace-dialog").addEventListener("close", (event) => {
  if (event.target.returnValue === "replace" && pendingModel) {
    model = pendingModel;
    renderModel();
    saveModel();
    showFeedback("Modelo listo para editar.");
  }
  pendingModel = null;
});

get("import-model").addEventListener("click", () => get("file-input").click());
get("file-input").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  event.target.value = "";
  if (!file) return;
  try {
    if (file.size > 250000) throw new Error("El archivo supera el tamaño de un proyecto Canvas.");
    const next = normalizeModel(JSON.parse(await file.text()));
    replaceModel(next, "¿Importar el modelo?", "Importar");
  } catch (error) {
    showFeedback(error instanceof SyntaxError ? "El archivo no contiene un proyecto JSON válido." : error.message);
  }
});

const exportMenu = get("export-menu");
exportMenu.addEventListener("click", (event) => {
  const button = event.target.closest("[data-export]");
  if (!button) return;
  exportMenu.open = false;
  exportMenu.querySelector("summary").focus();
  if (button.dataset.export === "json") exportProject();
  else void exportVisual(button.dataset.export);
});

document.addEventListener("click", (event) => {
  if (!exportMenu.contains(event.target)) exportMenu.open = false;
});
exportMenu.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !exportMenu.open) return;
  exportMenu.open = false;
  exportMenu.querySelector("summary").focus();
});

renderModel();
saveModel();
