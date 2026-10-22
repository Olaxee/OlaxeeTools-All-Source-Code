#!/usr/bin/env python3
import threading
import socket
import json
from http.server import BaseHTTPRequestHandler, HTTPServer
import webview

PORT = 8000

# Fonction pour récupérer l'IP privée
def get_private_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = None
    finally:
        s.close()
    return ip or "1.1.1.1"

# HTML + CSS + JS
HTML_PAGE = """<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>IP Privée</title>
<style>
html, body { height:100%; margin:0; font-family:Inter, system-ui, Arial, sans-serif; background:#0b0b0e; color:#e6eef8; overflow:hidden; position:relative; }
.wrap { display:flex; align-items:center; justify-content:center; height:100%; text-align:center; padding:1rem; }
.label { font-size:2rem; color:#9aa7b8; letter-spacing:0.04em; }
.ip { font-weight:700; font-size:6.5rem; line-height:1; word-break:break-word; }
.error { color:#ff6b6b; margin-top:1rem; }
button { margin-top:1.5rem; padding:0.6rem 1.5rem; font-size:1.3rem; border:1.5px solid #e6eef8; border-radius:12px; background:#0b0b0e; color:#e6eef8; cursor:pointer; font-weight:600; transition: background-color 0.25s ease, color 0.25s ease; }
button:hover { background:#1a1a24; } button:focus { outline:none; background:#1a1a24; }
@media (max-width:600px){ .label{font-size:1.4rem;} .ip{font-size:3.2rem;} button{font-size:1rem; padding:0.5rem 1rem; border-radius:10px;} }
.footer-text-left{position:fixed; bottom:12px; left:12px; font-size:0.9rem; color:#6c7681; user-select:none; pointer-events:none; font-style:italic;}
.footer-text-right{position:fixed; bottom:12px; right:12px; font-size:0.9rem; color:#6c7681; user-select:none; pointer-events:none; font-style:italic;}
</style>
</head>
<body>
<div class="wrap">
  <div>
    <div class="label">IP :</div>
    <div id="ip" class="ip">Chargement…</div>
    <div id="error" class="error"></div>
    <button id="retryBtn" onclick="fetchIp()" aria-label="Réessayer la détection de l’IP">Réessayer</button>
  </div>
</div>
<div class="footer-text-left">IP détectée côté serveur local via socket UDP</div>
<div class="footer-text-right">Powered by Olaxee</div>
<script>
async function fetchIp(){
  document.getElementById('ip').textContent = "Chargement…";
  document.getElementById('error').textContent = "";
  try {
    const r = await fetch('/ip');
    const j = await r.json();
    document.getElementById('ip').textContent = j.ip || "1.1.1.1";
    if(!j.ip) document.getElementById('error').textContent = "Impossible de détecter l'IP privée.";
  } catch(e) {
    document.getElementById('ip').textContent = "1.1.1.1";
    document.getElementById('error').textContent = "Erreur de détection.";
  }
}
// Bloquer scroll souris / molette
window.addEventListener('wheel', e => { e.preventDefault(); }, { passive:false });
const retryBtn = document.getElementById('retryBtn');
retryBtn.addEventListener('mouseleave', () => { retryBtn.blur(); });
fetchIp();
</script>
</body>
</html>
"""

# Handler HTTP
class Handler(BaseHTTPRequestHandler):
    def _set_json(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
    def _set_html(self):
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
    def do_GET(self):
        if self.path == "/ip":
            ip = get_private_ip()
            self._set_json()
            self.wfile.write(json.dumps({"ip": ip}).encode("utf-8"))
        else:
            self._set_html()
            self.wfile.write(HTML_PAGE.encode("utf-8"))
    def log_message(self, format, *args):
        return

# Lancer le serveur HTTP dans un thread
def start_server():
    HTTPServer(("127.0.0.1", PORT), Handler).serve_forever()

threading.Thread(target=start_server, daemon=True).start()

# Lancer la fenêtre PyWebView sur localhost
webview.create_window("IP Privée", f"http://127.0.0.1:{PORT}", width=1000, height=700)
webview.start()
