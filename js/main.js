/* ==========================================================
   LÓGICA PRINCIPAL Y GESTIÓN DE RESERVAS - SUMAQ SAMAY
   ----------------------------------------------------------
   Para cambiar precios, textos de la carta o el número de
   WhatsApp, edita solo la sección "1. DATOS EDITABLES".
   ========================================================== */

'use strict';

/* ==========================================================
   1. DATOS EDITABLES
   ========================================================== */

// Número de WhatsApp del hotel: código de país + número, sin "+" ni espacios
const WHATSAPP_NUMERO = '51974516932';

// Habitaciones. El precio es por noche en USD.
// "id" debe ser único. Las fotos van en la carpeta img/.
const HABITACIONES = [
    {
        id: '1', precio: 35, imagen: 'img/room1.webp',
        nombre: { es: 'Simple Standard', en: 'Standard Single' },
        descripcion: {
            es: 'Para viajeros que buscan descansar bien. Incluye calefacción y WiFi de alta velocidad.',
            en: 'For travelers who want a good rest. Includes heating and high-speed WiFi.'
        }
    },
    {
        id: '2', precio: 60, imagen: 'img/room2.jpg',
        nombre: { es: 'Doble Matrimonial', en: 'Double Room' },
        descripcion: {
            es: 'Ideal para parejas. Incluye calefacción, WiFi de alta velocidad y vista a la montaña.',
            en: 'Ideal for couples. Includes heating, high-speed WiFi and a mountain view.'
        }
    },
    {
        id: '3', precio: 90, imagen: 'img/room3.jpg',
        nombre: { es: 'Suite VIP Andina', en: 'Andean VIP Suite' },
        descripcion: {
            es: 'Cama King, tina de hidromasaje, oxigenoterapia bajo solicitud y desayuno privado.',
            en: 'King bed, hot tub, oxygen therapy on request and private breakfast.'
        }
    }
];

// Mates andinos. El precio es en soles (S/).
const MATES = [
    {
        id: 'muna', precio: 6,
        nombre: { es: 'Mate de muña', en: 'Muña tea' },
        descripcion: {
            es: 'Aromático y fresco. Se toma tradicionalmente después de comer.',
            en: 'Aromatic and refreshing. Traditionally enjoyed after a meal.'
        }
    },
    {
        id: 'coca', precio: 6,
        nombre: { es: 'Mate de coca', en: 'Coca leaf tea' },
        descripcion: {
            es: 'La infusión andina más tradicional, muy pedida por quienes llegan a la altura.',
            en: 'The most traditional Andean infusion, popular with guests arriving at altitude.'
        }
    },
     {
        id: 'manzanilla', precio: 6,
        nombre: { es: 'Mate de manzanilla', en: 'Chamomile tea' },
        descripcion: {
            es: 'Suave y calmante. Muy buena opción para la noche.',
            en: 'Gentle and soothing. A great choice for the evening.'
        }
    },
    {
        id: 'anis', precio: 6,
        nombre: { es: 'Mate de anís', en: 'Anise tea' },
        descripcion: {
            es: 'Suave y ligeramente dulce. Ideal para relajarte y para la digestión.',
            en: 'Smooth and lightly sweet. Ideal for relaxing and for digestion.'
        }
    }
];

// Platos de la carta andina. El precio es en soles (S/).
const PLATOS = [
    {
        precio: 18,
        nombre: { es: 'Sopa de quinua', en: 'Quinoa soup' },
        descripcion: {
            es: 'Caldo caliente con quinua, verduras y papa.',
            en: 'Hot broth with quinoa, vegetables and potato.'
        }
    },
    {
        precio: 22,
        nombre: { es: 'Ensalada de quinua y habas', en: 'Quinoa and fava bean salad' },
        descripcion: {
            es: 'Fresca y ligera, con queso andino y limón.',
            en: 'Fresh and light, with Andean cheese and lime.'
        }
    },
    {
        precio: 35,
        nombre: { es: 'Trucha andina a la plancha', en: 'Grilled Andean trout' },
        descripcion: {
            es: 'Con papas nativas y ensalada fresca.',
            en: 'With native potatoes and fresh salad.'
        }
    },
    {
        precio: 48,
        nombre: { es: 'Lomo de alpaca', en: 'Alpaca loin' },
        descripcion: {
            es: 'Con papas nativas y salsa de hierbas andinas.',
            en: 'With native potatoes and Andean herb sauce.'
        }
    }
];

// Textos de la interfaz que se arman desde JavaScript (los fijos están en el HTML con data-es / data-en)
const TXT = {
    es: {
        desde: 'Desde',
        porNoche: '/ noche',
        badgeMate: 'Mate de bienvenida',
        btnCotizar: 'Cotizar',
        btnReservar: 'Reservar',
        mateLuego: 'Lo elijo al llegar',
        selecciona: 'Selecciona las fechas para calcular el total.',
        faltanFechas: 'Selecciona las fechas de llegada y salida.',
        fechasInvalidas: 'La fecha de salida debe ser posterior a la de llegada.',
        fechaPasada: 'La fecha de llegada no puede ser anterior a hoy.',
        telefonoInvalido: 'Escribe un teléfono válido (solo números, espacios y +).',
        waAbierto: 'Abriendo WhatsApp con tu mensaje...',
        noches: (n) => (n === 1 ? '1 noche' : `${n} noches`),
        huespedes: (g) => (g === '1' ? '1 huésped' : g === '3' ? '3 o más huéspedes' : `${g} huéspedes`),
        mensajeFlotante: 'Hola, deseo información y reservar en Sumaq Samay',
        mensajeCotizacion: (d) => [
            'Hola Sumaq Samay, quiero cotizar una estadía (consulta desde la web).',
            '',
            `Habitación: ${d.habitacion}`,
            `Llegada: ${d.llegada}`,
            `Salida: ${d.salida}`,
            `Noches: ${d.noches}`,
            `Huéspedes: ${d.huespedes}`,
            `Total estimado: $${d.total} USD`,
            '',
            'Entiendo que la reserva directa incluye mate de bienvenida de cortesía. ¿Tienen disponibilidad?'
        ].join('\n'),
        mensajeReserva: (d) => [
            'Hola Sumaq Samay, quiero hacer una RESERVA DIRECTA desde la web.',
            '',
            `Nombre: ${d.nombre}`,
            `Correo: ${d.email}`,
            `Teléfono: ${d.telefono}`,
            '',
            `Habitación: ${d.habitacion}`,
            `Llegada: ${d.llegada}`,
            `Salida: ${d.salida}`,
            `Noches: ${d.noches}`,
            `Huéspedes: ${d.huespedes}`,
            `Total estimado: $${d.total} USD`,
            `Mate de bienvenida (cortesía): ${d.mate}`,
            d.notas ? `Notas: ${d.notas}` : '',
            '',
            'Quedo atento a su confirmación.'
        ].filter((linea, i, arr) => linea !== '' || arr[i - 1] !== '').join('\n'),
        mensajeContacto: (d) => `Hola Sumaq Samay, soy ${d.nombre}. ${d.mensaje}`
    },
    en: {
        desde: 'From',
        porNoche: '/ night',
        badgeMate: 'Welcome tea',
        btnCotizar: 'Get a quote',
        btnReservar: 'Book',
        mateLuego: "I'll choose on arrival",
        selecciona: 'Select your dates to calculate the total.',
        faltanFechas: 'Select your check-in and check-out dates.',
        fechasInvalidas: 'The check-out date must be after the check-in date.',
        fechaPasada: 'The check-in date cannot be earlier than today.',
        telefonoInvalido: 'Enter a valid phone number (digits, spaces and + only).',
        waAbierto: 'Opening WhatsApp with your message...',
        noches: (n) => (n === 1 ? '1 night' : `${n} nights`),
        huespedes: (g) => (g === '1' ? '1 guest' : g === '3' ? '3 or more guests' : `${g} guests`),
        mensajeFlotante: 'Hello, I would like information and to book at Sumaq Samay',
        mensajeCotizacion: (d) => [
            'Hello Sumaq Samay, I would like a quote for a stay (inquiry from the website).',
            '',
            `Room: ${d.habitacion}`,
            `Check-in: ${d.llegada}`,
            `Check-out: ${d.salida}`,
            `Nights: ${d.noches}`,
            `Guests: ${d.huespedes}`,
            `Estimated total: $${d.total} USD`,
            '',
            'I understand that booking direct includes a complimentary welcome tea. Do you have availability?'
        ].join('\n'),
        mensajeReserva: (d) => [
            'Hello Sumaq Samay, I would like to make a DIRECT BOOKING from the website.',
            '',
            `Name: ${d.nombre}`,
            `Email: ${d.email}`,
            `Phone: ${d.telefono}`,
            '',
            `Room: ${d.habitacion}`,
            `Check-in: ${d.llegada}`,
            `Check-out: ${d.salida}`,
            `Nights: ${d.noches}`,
            `Guests: ${d.huespedes}`,
            `Estimated total: $${d.total} USD`,
            `Welcome tea (complimentary): ${d.mate}`,
            d.notas ? `Notes: ${d.notas}` : '',
            '',
            'Looking forward to your confirmation.'
        ].filter((linea, i, arr) => linea !== '' || arr[i - 1] !== '').join('\n'),
        mensajeContacto: (d) => `Hello Sumaq Samay, my name is ${d.nombre}. ${d.mensaje}`
    }
};

/* ==========================================================
   2. UTILIDADES
   ========================================================== */

let idiomaActual = 'es';
let cotizacionActual = null; // última cotización mostrada en la portada

const MS_DIA = 1000 * 60 * 60 * 24;

const $ = (id) => document.getElementById(id);
const t = (clave, ...args) => {
    const valor = TXT[idiomaActual][clave];
    return typeof valor === 'function' ? valor(...args) : valor;
};

const pad = (n) => String(n).padStart(2, '0');
const aISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// Convierte "2026-10-25" en fecha local (evita desfases de zona horaria)
function parseFecha(iso) {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d);
}

function hoyISO() {
    return aISO(new Date());
}

function sumarDias(iso, dias) {
    const d = parseFecha(iso);
    d.setDate(d.getDate() + dias);
    return aISO(d);
}

function formatoFecha(iso) {
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
}

function getHabitacion(id) {
    return HABITACIONES.find((h) => h.id === String(id)) || HABITACIONES[1];
}

function getMate(id) {
    return MATES.find((m) => m.id === id);
}

function nombreMate(id) {
    const mate = getMate(id);
    return mate ? mate.nombre[idiomaActual] : t('mateLuego');
}

// Límites y validación de lo que escribe el usuario (se envía solo a WhatsApp, no se guarda)
const LIMITES = { nombre: 80, email: 100, telefono: 20, notas: 300, mensaje: 500 };
const TELEFONO_VALIDO = /^[0-9+ ]{6,20}$/;

// Quita caracteres de control, junta espacios y corta al largo máximo
function limpiar(texto, max) {
    return String(texto || '')
        .replace(/[\u0000-\u001F\u007F]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, max);
}

function showToast(mensaje, tipo = 'exito') {
    const toast = $('toast');
    if (!toast) return;
    toast.textContent = mensaje;
    toast.className = `toast-notif ${tipo}`;
    toast.style.display = 'block';
    clearTimeout(showToast.temporizador);
    showToast.temporizador = setTimeout(() => {
        toast.style.display = 'none';
    }, 4000);
}

function abrirWhatsApp(texto) {
    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
    const ventana = window.open(url, '_blank');
    if (ventana) {
        ventana.opener = null;
    } else {
        // Si el navegador bloquea la ventana emergente, abrimos en la misma pestaña
        window.location.href = url;
    }
}

/* ==========================================================
   3. CÁLCULO DE LA ESTADÍA
   ========================================================== */

/**
 * Calcula noches y total. Devuelve { ok, error } o { ok, noches, precio, total }.
 */
function calcularEstadia(checkinVal, checkoutVal, roomId) {
    if (!checkinVal || !checkoutVal) return { ok: false, error: 'faltanFechas' };

    const inicio = parseFecha(checkinVal);
    const fin = parseFecha(checkoutVal);

    if (fin <= inicio) return { ok: false, error: 'fechasInvalidas' };
    if (checkinVal < hoyISO()) return { ok: false, error: 'fechaPasada' };

    const noches = Math.round((fin - inicio) / MS_DIA);
    const precio = getHabitacion(roomId).precio;
    return { ok: true, noches, precio, total: noches * precio };
}

/**
 * Actualiza el visor de total del modal de reserva. Devuelve el total (0 si hay error).
 */
function calcularMontoTotal() {
    const visor = $('reservaMontoTotal');
    const r = calcularEstadia(
        $('reservaCheckin')?.value,
        $('reservaCheckout')?.value,
        $('modalHabitacionId')?.value
    );

    if (visor) {
        if (r.ok) {
            visor.innerHTML =
                `<i class="fa-solid fa-receipt"></i> <strong>${t('noches', r.noches)}</strong> x $${r.precio} = ` +
                `<strong class="monto-destacado">$${r.total} USD</strong>`;
        } else if (r.error === 'faltanFechas') {
            visor.innerHTML = `<i class="fa-solid fa-calculator"></i> ${t('selecciona')}`;
        } else {
            visor.innerHTML = `<span class="texto-error"><i class="fa-solid fa-triangle-exclamation"></i> ${t(r.error)}</span>`;
        }
    }
    return r.ok ? r.total : 0;
}

/* ==========================================================
   4. RENDERIZADO DINÁMICO (habitaciones, carta, selects)
   ========================================================== */

function renderHabitaciones() {
    const cont = $('habitacionesGrid');
    if (!cont) return;
    const l = idiomaActual;

    cont.innerHTML = HABITACIONES.map((h) => `
        <article class="card">
            <div class="card-img">
                <i class="fa-solid fa-bed card-img-icon" aria-hidden="true"></i>
                <img src="${h.imagen}" alt="${h.nombre[l]}" loading="lazy">
                <span class="badge-directo"><i class="fa-solid fa-mug-hot"></i> ${t('badgeMate')}</span>
            </div>
            <div class="card-body">
                <h3>${h.nombre[l]}</h3>
                <p>${h.descripcion[l]}</p>
                <span class="price">${t('desde')} $${h.precio} ${t('porNoche')}</span>
                <div class="card-actions">
                    <button type="button" class="btn-card btn-card-sec" data-accion="cotizar" data-room="${h.id}">${t('btnCotizar')}</button>
                    <button type="button" class="btn-card" data-accion="reservar" data-room="${h.id}">${t('btnReservar')}</button>
                </div>
            </div>
        </article>
    `).join('');
}

function renderCarta() {
    const l = idiomaActual;
    const item = (x) => `
        <li class="carta-item">
            <div>
                <strong>${x.nombre[l]}</strong>
                <span class="desc">${x.descripcion[l]}</span>
            </div>
            <span class="carta-precio">S/ ${x.precio}</span>
        </li>`;

    if ($('cartaPlatos')) $('cartaPlatos').innerHTML = PLATOS.map(item).join('');
    if ($('cartaMates')) $('cartaMates').innerHTML = MATES.map(item).join('');
}

// Rellena un <select> de habitaciones conservando la opción elegida
function renderSelectHabitaciones(idSelect, valorPorDefecto) {
    const select = $(idSelect);
    if (!select) return;
    const valorActual = select.value || valorPorDefecto;
    select.innerHTML = HABITACIONES.map(
        (h) => `<option value="${h.id}">${h.nombre[idiomaActual]} - $${h.precio}</option>`
    ).join('');
    select.value = valorActual;
}

function renderSelectMates() {
    const select = $('reservaMate');
    if (!select) return;
    const valorActual = select.value || MATES[0].id;
    select.innerHTML =
        MATES.map((m) => `<option value="${m.id}">${m.nombre[idiomaActual]}</option>`).join('') +
        `<option value="later">${t('mateLuego')}</option>`;
    select.value = valorActual;
}

/* ==========================================================
   5. COTIZACIÓN EN LA PORTADA
   ========================================================== */

function mostrarCotizacionHero() {
    const panel = $('cotizacionResultado');
    if (!panel || !cotizacionActual) return;
    const c = cotizacionActual;
    const hab = getHabitacion(c.roomId);

    $('cotizacionResumen').textContent =
        `${t('noches', c.noches)} · ${hab.nombre[idiomaActual]} · ${t('huespedes', c.guests)} · ` +
        `${formatoFecha(c.checkin)} → ${formatoFecha(c.checkout)}`;
    $('cotizacionTotal').textContent = `$${c.total} USD`;
    panel.hidden = false;
}

function ocultarCotizacionHero() {
    cotizacionActual = null;
    const panel = $('cotizacionResultado');
    if (panel) panel.hidden = true;
}

function datosParaMensaje(c) {
    return {
        habitacion: getHabitacion(c.roomId).nombre[idiomaActual],
        llegada: formatoFecha(c.checkin),
        salida: formatoFecha(c.checkout),
        noches: c.noches,
        huespedes: t('huespedes', c.guests),
        total: c.total
    };
}

/* ==========================================================
   6. MODAL DE RESERVA
   ========================================================== */

function abrirModalReserva(idHabitacion) {
    const modal = $('modalReserva');
    if (!modal) return;

    if (idHabitacion && $('modalHabitacionId')) $('modalHabitacionId').value = idHabitacion;

    // Copia lo elegido en el buscador de la portada
    const checkin = $('checkin')?.value;
    const checkout = $('checkout')?.value;
    if (checkin) $('reservaCheckin').value = checkin;
    if (checkout) $('reservaCheckout').value = checkout;
    if ($('guests')) $('reservaHuespedes').value = $('guests').value;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    calcularMontoTotal();
    $('clienteNombre')?.focus();
}

function cerrarModalReserva() {
    const modal = $('modalReserva');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
}

/* ==========================================================
   7. CAMBIO DE IDIOMA (ES / EN)
   ========================================================== */

function actualizarEnlaceFlotante() {
    const enlace = $('btnWhatsappFlotante');
    if (enlace) {
        enlace.href = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(t('mensajeFlotante'))}`;
    }
}

function aplicarIdioma() {
    document.documentElement.lang = idiomaActual;

    document.querySelectorAll('[data-es][data-en]').forEach((elem) => {
        const texto = elem.getAttribute(`data-${idiomaActual}`);
        if (texto) elem.textContent = texto;
    });

    const btnLang = $('btn-lang');
    if (btnLang) btnLang.textContent = idiomaActual === 'es' ? '🌐 ES / EN' : '🌐 EN / ES';

    // Partes que se generan desde JavaScript
    renderHabitaciones();
    renderCarta();
    renderSelectHabitaciones('room-type', '2');
    renderSelectHabitaciones('modalHabitacionId', '2');
    renderSelectMates();
    actualizarEnlaceFlotante();
    mostrarCotizacionHero();
    calcularMontoTotal();
}

function toggleIdioma() {
    idiomaActual = idiomaActual === 'es' ? 'en' : 'es';
    aplicarIdioma();
}

/* ==========================================================
   8. EVENTOS Y LISTENERS AL CARGAR EL DOM
   ========================================================== */

// Bloquea fechas pasadas y obliga a que la salida sea posterior a la llegada
function ligarFechas(idLlegada, idSalida) {
    const llegada = $(idLlegada);
    const salida = $(idSalida);
    if (!llegada || !salida) return;

    llegada.min = hoyISO();
    salida.min = sumarDias(hoyISO(), 1);

    llegada.addEventListener('change', () => {
        if (!llegada.value) return;
        const minSalida = sumarDias(llegada.value, 1);
        salida.min = minSalida;
        if (salida.value && salida.value < minSalida) salida.value = '';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    aplicarIdioma();

    ligarFechas('checkin', 'checkout');
    ligarFechas('reservaCheckin', 'reservaCheckout');

    $('btn-lang')?.addEventListener('click', toggleIdioma);

    // Si el usuario cambia algún dato, la cotización anterior ya no es válida
    ['checkin', 'checkout', 'guests', 'room-type'].forEach((id) => {
        $(id)?.addEventListener('change', ocultarCotizacionHero);
    });

    // Recalcula el total del modal
    ['reservaCheckin', 'reservaCheckout', 'modalHabitacionId'].forEach((id) => {
        $(id)?.addEventListener('change', calcularMontoTotal);
    });

    // --- Cotizador de la portada ---
    $('formCotizador')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const checkin = $('checkin').value;
        const checkout = $('checkout').value;
        const roomId = $('room-type').value;
        const guests = $('guests').value;

        const r = calcularEstadia(checkin, checkout, roomId);
        if (!r.ok) {
            ocultarCotizacionHero();
            showToast(t(r.error), 'error');
            return;
        }

        cotizacionActual = { checkin, checkout, roomId, guests, noches: r.noches, total: r.total };
        mostrarCotizacionHero();
    });

    // Enviar la cotización por WhatsApp
    $('btnCotizarWhatsapp')?.addEventListener('click', () => {
        if (!cotizacionActual) return;
        abrirWhatsApp(t('mensajeCotizacion', datosParaMensaje(cotizacionActual)));
        showToast(t('waAbierto'));
    });

    // Pasar de la cotización a la reserva
    $('btnReservarDesdeCotizacion')?.addEventListener('click', () => {
        if (cotizacionActual) abrirModalReserva(cotizacionActual.roomId);
    });

    // Si una foto de habitación no existe, se quita y se ve el fondo de color
    $('habitacionesGrid')?.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG') e.target.remove();
    }, true);

    // --- Tarjetas de habitaciones (botones Cotizar / Reservar) ---
    $('habitacionesGrid')?.addEventListener('click', (e) => {
        const boton = e.target.closest('button[data-accion]');
        if (!boton) return;
        const roomId = boton.dataset.room;

        if (boton.dataset.accion === 'reservar') {
            abrirModalReserva(roomId);
        } else {
            $('room-type').value = roomId;
            ocultarCotizacionHero();
            $('inicio').scrollIntoView({ behavior: 'smooth' });
            $('checkin').focus({ preventScroll: true });
        }
    });

    // --- Modal de reserva ---
    $('btnCerrarModal')?.addEventListener('click', cerrarModalReserva);

    $('modalReserva')?.addEventListener('click', (e) => {
        if (e.target === $('modalReserva')) cerrarModalReserva(); // clic fuera de la ventana
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') cerrarModalReserva();
    });

    $('formReservaDirecta')?.addEventListener('submit', (e) => {
        e.preventDefault();

        const checkin = $('reservaCheckin').value;
        const checkout = $('reservaCheckout').value;
        const roomId = $('modalHabitacionId').value;
        const r = calcularEstadia(checkin, checkout, roomId);

        if (!r.ok) {
            showToast(t(r.error), 'error');
            return;
        }

        const datos = datosParaMensaje({
            checkin, checkout, roomId,
            guests: $('reservaHuespedes').value,
            noches: r.noches,
            total: r.total
        });

        datos.nombre = limpiar($('clienteNombre').value, LIMITES.nombre);
        datos.email = limpiar($('clienteEmail').value, LIMITES.email);
        datos.telefono = limpiar($('clienteTelefono').value, LIMITES.telefono);
        datos.mate = nombreMate($('reservaMate').value);
        datos.notas = limpiar($('reservaNotas').value, LIMITES.notas);

        if (!TELEFONO_VALIDO.test(datos.telefono)) {
            showToast(t('telefonoInvalido'), 'error');
            return;
        }

        abrirWhatsApp(t('mensajeReserva', datos));
        showToast(t('waAbierto'));
        cerrarModalReserva();
    });

    // --- Formulario de contacto ---
    $('formContacto')?.addEventListener('submit', (e) => {
        e.preventDefault();
        abrirWhatsApp(t('mensajeContacto', {
            nombre: limpiar($('contactoNombre').value, LIMITES.nombre),
            mensaje: limpiar($('contactoMensaje').value, LIMITES.mensaje)
        }));
        showToast(t('waAbierto'));
        e.target.reset();
    });
});