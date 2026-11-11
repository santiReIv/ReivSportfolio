/* RE!V Studio — funcionamiento. No necesitas editar este archivo. */
const CATS = { Todos:"Todos", Diseño:"Diseño gráfico", Motion:"Motion graphics", "3D":"3D", Video:"Edición de video", Foto:"Fotografía" };
const $ = id => document.getElementById(id);

/* Utilidades: rutas con espacios/paréntesis, texto seguro, datos del proyecto */
const ruta = s => encodeURI((s || "").trim());
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const videosDe = p => [].concat(p.video || []).map(v => String(v).trim()).filter(Boolean);   // acepta uno o varios
const tieneMedia = p => !!((p.portada || "").trim() || videosDe(p).length || (p.galeria || []).length);
const VISIBLES = PROYECTOS.filter(p => !AJUSTES.ocultarVacios || tieneMedia(p));
const DEST = VISIBLES.filter(p => p.destacado);
const portadaDe = p => (p.portada || "").trim() || (p.galeria || [])[0] || "";
const fotosDe = p => [...((p.portada || "").trim() && !videosDe(p).length ? [p.portada.trim()] : []), ...(p.galeria || []).map(g => g.trim())];
const etiqueta = p => `${CATS[p.categoria]} — ${p.año}`;
// Imagen con respaldo: si el archivo no existe, se quita en vez de verse rota
const pic = (p, cls, extra = "") => {
  const s = portadaDe(p);
  return s ? `<img class="${cls}" src="${ruta(s)}" alt="" ${extra} onerror="this.remove()">`
           : `<div class="${cls} relleno" data-cat="${esc(p.categoria)}"></div>`;
};

/* ---------- MENÚ ---------- */
const cab = document.querySelector("header");
const alScroll = () => cab.classList.toggle("sol", scrollY > 40);
addEventListener("scroll", alScroll, { passive:true }); alScroll();

/* ---------- CINTA DE SERVICIOS ----------
   Antes: un solo bloque que se desplazaba -50% de su propio ancho. En pantallas
   anchas ese bloque era más corto que la ventana y la cinta quedaba vacía.
   Ahora: se repite el grupo hasta cubrir la pantalla y se duplica, así el
   bucle siempre es continuo sin importar el ancho. */
const servicios = Object.values(CATS).slice(1);
function cinta(){
  const track = $("track");
  const item = servicios.map(s => `<span>${s}</span>`).join("");
  track.innerHTML = `<div class="grupo">${item}</div>`;
  const g = track.firstElementChild;
  for (let n = 0; g.getBoundingClientRect().width < innerWidth && n < 15; n++) g.insertAdjacentHTML("beforeend", item);
  track.appendChild(g.cloneNode(true));
  track.style.setProperty("--dur", Math.max(12, g.getBoundingClientRect().width / 70) + "s");
}
cinta();
document.fonts && document.fonts.ready.then(cinta);   // Anton cambia los anchos al cargar
let tCinta; addEventListener("resize", () => { clearTimeout(tCinta); tCinta = setTimeout(cinta, 200); });

/* ---------- PORTADA ---------- */
const hero = $("inicio");
const modal = $("modal");
let actual = 0, timer;
hero.innerHTML = DEST.map((p, i) => `
  <div class="slide" data-i="${i}" role="group" aria-label="${i + 1} de ${DEST.length}">
    ${p.preview
      ? `<video class="bg" src="${ruta(p.preview)}" ${p.poster ? `poster="${ruta(p.poster)}"` : ""} muted loop playsinline preload="${i ? "none" : "auto"}"></video>`
      : pic(p, "bg", i ? "" : 'fetchpriority="high"')}
    <div class="txt">
      <div class="tag">${esc(etiqueta(p))}</div>
      <p class="display cap">${esc(p.titulo)}</p>
      <button class="btn" type="button">Ver proyecto →</button>
    </div>
  </div>`).join("") +
  `<div class="hero-ui"><span id="num" aria-live="off"></span>${DEST.map((p, i) => `<button type="button" data-d="${i}" aria-label="Ver proyecto ${i + 1}: ${esc(p.titulo)}"><i></i></button>`).join("")}</div>`;

/* Texto de presentación fijo sobre la portada */
hero.insertAdjacentHTML("beforeend", `
  <div class="intro"><div class="intro-in">
    <h1 class="display">Hago que tu marca se vea y se mueva como la imaginas</h1>
    <p>Renders 3D de producto, motion graphics, edición de video, diseño gráfico y fotografía para marcas y músicos que quieren que su trabajo se vea a la altura de lo que hacen.</p>
    <div class="intro-btns"><a class="btn" href="#trabajos">Ver proyecto</a><a class="btn ghost" href="#contacto">Pedir cotización</a></div>
  </div></div>`);

function mostrar(i){
  actual = (i + DEST.length) % DEST.length;
  const dots = hero.querySelectorAll(".hero-ui button");
  dots.forEach(b => b.classList.remove("on"));
  void hero.offsetWidth;                                  // reinicia la barra de progreso
  dots[actual].classList.add("on");
  hero.querySelectorAll(".slide").forEach((s, n) => {
    const on = n === actual, v = s.querySelector("video");
    s.classList.toggle("on", on);
    if (!v) return;
    if (on){ v.preload = "auto"; v.play().catch(() => {}); }
    else setTimeout(() => { if (!s.classList.contains("on")) v.pause(); }, 1000);   // solo reproduce el activo
  });
  $("num").textContent = String(actual + 1).padStart(2, "0") + " / " + String(DEST.length).padStart(2, "0");
}
function auto(){
  clearInterval(timer);
  if (DEST.length < 2) return;
  timer = setInterval(() => mostrar(actual + 1), 5500);
}
hero.addEventListener("click", e => {
  const d = e.target.closest("[data-d]");
  if (d){ mostrar(+d.dataset.d); auto(); return; }
  const s = e.target.closest(".slide");
  if (s) abrir(DEST[+s.dataset.i]);
});
document.addEventListener("visibilitychange", () => document.hidden ? clearInterval(timer) : (modal.classList.contains("on") || auto()));
if (DEST.length){ mostrar(0); auto(); }

/* ---------- FILTROS Y GRILLA ---------- */
const cats = ["Todos", ...Object.keys(CATS).filter(k => k !== "Todos" && VISIBLES.some(p => p.categoria === k))];
$("filtros").innerHTML = cats.map(k => `<button type="button" data-c="${k}" class="${k === "Todos" ? "on" : ""}" aria-pressed="${k === "Todos"}">${CATS[k]}</button>`).join("");
/* Los trabajos aparecen al hacer un poco de scroll */
const REV = "IntersectionObserver" in window;
const io = REV ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold:.1 }) : null;
function revela(){ if (REV) document.querySelectorAll(".card.pre").forEach((c, i) => { c.style.transitionDelay = (i % 5) * 70 + "ms"; io.observe(c); }); }
function pintar(cat, anima){
  const lista = cat === "Todos" ? VISIBLES : VISIBLES.filter(p => p.categoria === cat);
  $("grid").innerHTML = lista.map((p, n) => `
    <article class="card${REV ? " pre" : ""}" tabindex="0" role="button" aria-label="Ver proyecto: ${esc(p.titulo)}" data-t="${VISIBLES.indexOf(p)}">
      ${pic(p, "img", 'loading="lazy" decoding="async"')}
      <div class="info"><span>${CATS[p.categoria]}</span><h3>${esc(p.titulo)}</h3><small>${p.año}</small></div>
    </article>`).join("");
  revela();
}
$("filtros").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  document.querySelectorAll("#filtros button").forEach(x => { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", x === b); });
  pintar(b.dataset.c, true);
});
const abrirCard = e => { const c = e.target.closest(".card"); if (c) abrir(VISIBLES[+c.dataset.t]); };
$("grid").addEventListener("click", abrirCard);
$("grid").addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " "){ e.preventDefault(); abrirCard(e); } });
pintar("Todos", false);

/* ---------- VENTANA DE PROYECTO ---------- */
let ultimoFoco = null, fotosActual = [], tituloActual = "";
function embed(url, poster, auto){
  let m = url.match(/(?:youtu\.be\/|v=|shorts\/)([\w-]{11})/);
  if (m) return `<iframe src="https://www.youtube.com/embed/${m[1]}?${auto ? "autoplay=1" : ""}" title="Video del proyecto" allow="autoplay;fullscreen" allowfullscreen></iframe>`;
  m = url.match(/vimeo\.com\/(\d+)/);
  if (m) return `<iframe src="https://player.vimeo.com/video/${m[1]}?${auto ? "autoplay=1" : ""}" title="Video del proyecto" allow="autoplay;fullscreen" allowfullscreen></iframe>`;
  return `<video src="${ruta(url)}" ${poster ? `poster="${ruta(poster)}"` : ""} controls ${auto ? "autoplay" : ""} playsinline preload="metadata"></video>`;
}
function abrir(p){
  ultimoFoco = document.activeElement;
  clearInterval(timer);
  fotosActual = fotosDe(p); tituloActual = p.titulo;
  let medios = "";
  videosDe(p).forEach((v, i) => { medios += `<div class="video">${embed(v, portadaDe(p), false)}</div>`; });   // ninguno se reproduce solo: hay que dar play
  if (fotosActual.length) medios += `<div class="galeria${fotosActual.length === 1 ? " una" : ""}">` +
    fotosActual.map((g, i) => `<button type="button" class="foto" data-f="${i}" aria-label="Ampliar imagen ${i + 1} de ${fotosActual.length}"><img src="${ruta(g)}" alt="${esc(p.titulo)} — imagen ${i + 1}" loading="lazy" decoding="async" onerror="this.closest('.foto').remove()"></button>`).join("") + `</div>`;
  if (!medios) medios = `<div class="vacio relleno" data-cat="${esc(p.categoria)}">${esc(p.titulo)}</div>`;
  $("caja").innerHTML = `<div class="ficha"><div class="tag">${esc(etiqueta(p))}</div><h2 class="display" id="m-titulo">${esc(p.titulo)}</h2>${p.descripcion ? `<p>${esc(p.descripcion)}</p>` : ""}</div>` + medios;
  modal.classList.add("on"); modal.scrollTop = 0;
  document.body.style.overflow = "hidden";
  $("cerrar").focus();
}
function cerrar(){
  modal.classList.remove("on");
  $("caja").innerHTML = "";                                // detiene videos
  document.body.style.overflow = "";
  if (ultimoFoco) ultimoFoco.focus({ preventScroll:true });
  if (DEST.length){ mostrar(actual); auto(); }
}
$("cerrar").onclick = cerrar;
modal.addEventListener("click", e => {
  const f = e.target.closest(".foto");
  if (f){ lbAbrir(+f.dataset.f); return; }
  if (!e.target.closest(".caja")) cerrar();                // clic en el fondo
});

/* ---------- VISOR DE IMÁGENES ---------- */
const lb = $("lb");
let lbI = 0, x0 = null;
function lbVer(i){
  lbI = (i + fotosActual.length) % fotosActual.length;
  $("lb-img").src = ruta(fotosActual[lbI]);
  $("lb-img").alt = `${tituloActual} — imagen ${lbI + 1}`;
  $("lb-count").textContent = `${lbI + 1} / ${fotosActual.length}`;
  const solo = fotosActual.length < 2;
  $("lb-prev").hidden = $("lb-next").hidden = solo;
}
function lbAbrir(i){ lb.hidden = false; lbVer(i); $("lb-x").focus(); }
function lbCerrar(){ lb.hidden = true; $("lb-img").removeAttribute("src"); }
$("lb-x").onclick = lbCerrar;
$("lb-prev").onclick = () => lbVer(lbI - 1);
$("lb-next").onclick = () => lbVer(lbI + 1);
lb.addEventListener("click", e => { if (e.target === lb) lbCerrar(); });
lb.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive:true });
lb.addEventListener("touchend", e => {
  if (x0 === null) return;
  const dx = e.changedTouches[0].clientX - x0; x0 = null;
  if (Math.abs(dx) > 50) lbVer(lbI + (dx < 0 ? 1 : -1));
});
document.addEventListener("keydown", e => {
  if (!lb.hidden){
    if (e.key === "Escape") lbCerrar();
    else if (e.key === "ArrowRight") lbVer(lbI + 1);
    else if (e.key === "ArrowLeft") lbVer(lbI - 1);
    return;
  }
  if (e.key === "Escape" && modal.classList.contains("on")) cerrar();
});

/* ---------- SERVICIOS ---------- */
const SERV = [
  ["Diseño gráfico", "Flyers, afiches e identidad visual con la misma energía en cada pieza."],
  ["Motion graphics", "Animación de logos, títulos y piezas gráficas para redes y video."],
  ["3D", "Renders y animaciones de producto, listos para tu web, tienda y redes."],
  ["Edición de video", "Reels, spots y videos musicales con ritmo, color y sonido cuidados."],
  ["Fotografía", "Imágenes con luz y encuadre cuidados, listas para usar."]
];
$("trabajos").insertAdjacentHTML("afterend", `
  <section class="serv" id="servicios">
    <h2 class="display">Mis Servicios<b></b></h2>
    <div class="serv-grid">${SERV.map(([t, d]) => `<div class="serv-card"><h3>${t}</h3><p>${d}</p></div>`).join("")}</div>
  </section>`);
document.querySelector('nav a[href="#trabajos"]').insertAdjacentHTML("afterend", '<a href="#servicios">Servicios</a>');

/* ---------- CONTACTO ---------- */
$("mail").href = "mailto:" + PERFIL.email;
$("mail").textContent = PERFIL.email;
$("redes").innerHTML = PERFIL.redes.map(r => `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.nombre)}</a>`).join("");
$("year").textContent = new Date().getFullYear();
