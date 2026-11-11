/* =====================================================================
   AQUÍ EDITAS TUS PROYECTOS — es el único archivo que necesitas tocar
   =====================================================================
   Cada proyecto es un bloque entre llaves { }. Para agregar uno, copia
   un bloque completo, pégalo debajo (no olvides la coma al final) y
   cambia los datos.

   categoria  -> exactamente: "3D", "Video", "Diseño" o "Foto"
   destacado  -> true = aparece en la portada (pon 3 a 5)
   portada    -> imagen de la tarjeta, ej: "assets/JPEG/mi-proyecto.jpg"
   preview    -> (opcional) video corto en loop para la portada
   poster     -> (opcional) imagen que se ve mientras carga el preview
   video      -> (opcional) link de YouTube / Vimeo, o archivo "assets/video.mp4"
   galeria    -> (opcional) imágenes extra, ej: ["assets/JPEG/a.jpg","assets/JPEG/b.jpg"]

   IMPORTANTE: usa las versiones livianas de assets/JPEG/ en vez de los
   originales (el PNG original pesa 19 MB y la versión JPEG menos de 1 MB).
*/

const AJUSTES = {
  // true = los proyectos sin imagen ni video NO se muestran en la página
  // (así no se ven tarjetas vacías). Ponlo en false para verlos de nuevo.
  ocultarVacios: true
};

const PERFIL = {
  email: "reivstudio@gmail.com",          // ← cámbialo por tu correo real
  redes: [
    { nombre: "Instagram", url: "https://www.instagram.com/reivstudio" },   // ← y estos tres
    { nombre: "Behance",   url: "https://www.behance.net/Sant_RestrepoV" },
    { nombre: "YouTube",   url: "https://www.youtube.com/@ReIvStudio" }
  ]
};

const PROYECTOS = [
  {
    titulo: "New Guitar Concept",
    categoria: "3D",
    año: 2026,
    descripcion: "Giving a new look from Stratocaster to something more heavy.",
    portada: "assets/JPEG/1.jpg",
    preview: "assets/vid1.mp4",
    poster: "assets/JPEG/vid1.jpg",
    video: "",
    galeria: ["assets/JPEG/2.jpg","assets/JPEG/3.jpg","assets/JPEG/4.jpg"],
    destacado: true
  },
  {
    titulo: "Identidad de marca",
    categoria: "Diseño",
    año: 2025,
    descripcion: "Logo, paleta y piezas gráficas para una marca.",
    portada: "",
    galeria: [],
    destacado: true
  },
  {
    titulo: "Palmas",
    categoria: "Foto",
    año: 2025,
    descripcion: "Rodada en las Palmas.",
    portada: "assets/JPEG/d.jpg",
    galeria: ["assets/JPEG/p(1).jpg","assets/JPEG/p(2).jpg","assets/JPEG/p(3).jpg","assets/JPEG/p(4).jpg","assets/JPEG/p(5).jpg","assets/JPEG/p(6).jpg",
              "assets/JPEG/p(7).jpg","assets/JPEG/p(8).jpg","assets/JPEG/p(9).jpg","assets/JPEG/p(10).jpg","assets/JPEG/p(11).jpg","assets/JPEG/p(12).jpg",
              "assets/JPEG/p(13).jpg","assets/JPEG/p(14).jpg","assets/JPEG/p(15).jpg","assets/JPEG/p(17).jpg","assets/JPEG/p(18).jpg",
              "assets/JPEG/p(19).jpg","assets/JPEG/p(20).jpg"],   // p(16) no existe en tus archivos
    destacado: true
  },
  {
    titulo: "Beyerdynamic DT 990 3D Model",
    categoria: "3D",
    año: 2025,
    descripcion: "Headset 3D modeling.",
    portada: "assets/JPEG/1IGRetocada.jpg", 
    video: "assets/paig.mp4",
    galeria: ["assets/JPEG/2IGRetocada.jpg","assets/JPEG/1IGRetocada.jpg"],
    destacado: true
  },
  {
    titulo: "Tim henson Signature guitar",
    categoria: "3D",            // exactamente: "3D", "Video", "Diseño" o "Foto"
    año: 2026,
    descripcion: "Tim henson guitar made in blender.",
    portada: "assets/tod.jpg",
    galeria: ["assets/tod.jpg"],
    video: ["assets/vi1.mp4","assets/vi2.mp4"],         
    destacado: true            // true = sale también en la portada grande
},
  {
    titulo: "Concet Flyer",
    categoria: "Diseño",            // exactamente: "3D", "Video", "Diseño" o "Foto"
    año: 2026,
    descripcion: "Una o dos frases sobre el trabajo.",
    portada: "assets/JPEG/flyer.jpg",
    video: "",                  // opcional: link de YouTube/Vimeo
    galeria: ["assets/JPEG/mi-proyecto-2.jpg", "assets/JPEG/mi-proyecto-3.jpg"],
    destacado: false            // true = sale también en la portada grande
},
  { titulo: "Spot publicitario", categoria: "Video",  año: 2025, descripcion: "", portada: "", galeria: [], destacado: false },
  { titulo: "Poster concierto",  categoria: "Diseño", año: 2024, descripcion: "", portada: "", galeria: [], destacado: false },
  { titulo: "Retratos",          categoria: "Foto",   año: 2024, descripcion: "", portada: "", galeria: [], destacado: false },
  { titulo: "Retratos",          categoria: "Foto",   año: 2024, descripcion: "", portada: "", galeria: [], destacado: false },
  { titulo: "naturaleza",          categoria: "Foto",   año: 2024, descripcion: "", portada: "", galeria: [], destacado: false },
];
