// ============================================================
// js/supabase.js — Cliente Supabase compartido
// INSTRUCCIÓN: Reemplaza los valores con los de tu proyecto
// Panel Supabase → Settings → API
// ============================================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://izoijexpqipurrrwelqt.supabase.co';   // <-- cambiar
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6b2lqZXhwcWlwdXJycndlbHF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNTMzMTIsImV4cCI6MjA4OTYyOTMxMn0.x172RP7dKwI_Hs07D3wGCfyhxUeK7z20MFudbeE1IWQ';                       // <-- cambiar

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── Utilidad: obtener usuario autenticado ─────────────────
export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// ── Protección de rutas: redirige si no hay sesión ────────
export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    window.location.replace('/index.html');
  }
  return user;
}

// ── Formatear moneda peruana ──────────────────────────────
export function formatSoles(amount) {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(amount);
}

// ── Formatear fecha legible ───────────────────────────────
export function formatFecha(isoString) {
  return new Date(isoString).toLocaleDateString('es-PE', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
}

// ── Mostrar Toast Bootstrap ───────────────────────────────
export function showToast(mensaje, tipo = 'success') {
  const toastEl = document.getElementById('appToast');
  const toastBody = document.getElementById('toastBody');
  if (!toastEl || !toastBody) return;
  toastEl.className = `toast align-items-center text-white bg-${tipo} border-0`;
  toastBody.textContent = mensaje;
  bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 4000 }).show();
}

// ── Mostrar / ocultar spinner ─────────────────────────────
export function setLoading(show) {
  const el = document.getElementById('loadingSpinner');
  if (el) el.classList.toggle('d-none', !show);
}
