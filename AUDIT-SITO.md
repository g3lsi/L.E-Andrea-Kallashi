# Audit sito web – L.E. Multiservizi di Andrea Kallashi

**Data audit:** Gennaio 2026  
**Scope:** Struttura, UX/UI, Performance, SEO, Sicurezza, Contenuti, Normative, Conversione

---

## 1. STRUTTURA & CODICE

### ✅ OK
- HTML5 valido, struttura semantica (header, section, footer, article).
- CSS e JS esterni, nessun inline massiccio.
- Form contatto con validazione lato client (data-constraints).
- Script invia `form-type` via AJAX da `data-form-type`, compatibile con backend PHP.

### ❌ Problemi

| Problema | Priorità | Dettaglio |
|----------|----------|-----------|
| **lang="en" su index.html** | Media | Contenuto in italiano ma `<html lang="en">`; impatta accessibilità e SEO. |
| **Font con protocollo //** | Bassa | `href="//fonts.googleapis.com/..."` può dare problemi in locale; in produzione con HTTPS è ok. |
| **CSS molto grande** | Media | `style.css` ~736 KB, 42k+ righe (template monolitico); non critico ma pesante. |
| **JS non minificato** | Bassa | `script.js` non minificato (36 KB); `core.min.js` già minificato (416 KB). |
| **data-preset JSON in attributi** | Bassa | Attributi tipo `data-preset="{"title":"..."}"` con virgolette annidate possono dare problemi in alcuni contesti. |

### Cosa manca
- Nessun file di configurazione build (es. per minificare CSS/JS o fare bundle).
- Commenti o documentazione minima nel codice custom.

---

## 2. UX / UI

### ✅ OK
- Navigazione chiara: Chi Siamo, Mission, Servizi, Metodo, Lavori + Contattaci.
- CTA evidenti: "Richiedi un Preventivo", "Contattaci", "Scopri i Servizi".
- Footer con contatti, P.IVA, PEC, telefono, mappa.
- Template responsive (breakpoint nel CSS).
- Link "Privacy Policy" e credito Lux-Web nel footer.

### ❌ Problemi

| Problema | Priorità | Dettaglio |
|----------|----------|-----------|
| **Page loader sempre attivo** | Bassa | Loader con logo e animazione a ogni caricamento; può dare sensazione di lentezza. |
| **Slider con 3 H1** | Media | Tre titoli H1 nello slider; per accessibilità e SEO è preferibile un solo H1 per pagina. |
| **Icone social commentate** | Bassa | Coerente con la scelta “niente social per ora”; da decommentare quando ci sono i link. |

### Cosa manca
- Link “Skip to content” per accessibilità da tastiera.
- Nessuna pagina 404 personalizzata (se non gestita dal server).
- Breadcrumb non presenti (accettabile per sito a una pagina + Privacy).

---

## 3. PERFORMANCE

### ✅ OK
- Iframe mappa con `loading="lazy"`.
- Immagini con `width`/`height` dove usate (riduce layout shift).
- Una richiesta font (Google Fonts Lato).

### ❌ Problemi

| Problema | Priorità | Dettaglio |
|----------|----------|-----------|
| **Nessun lazy loading sulle img** | Media | Solo l’iframe è lazy; le immagini (logo, slider, carousel lavori, landing) non hanno `loading="lazy"`. |
| **Slider full-size** | Media | Slide in background caricate tutte; nessun preload selettivo o ottimizzazione. |
| **CSS/JS non ottimizzati** | Media | Un solo file CSS molto grande; nessun critical CSS; JS non in bundle/minificato custom. |
| **Immagini non ottimizzate** | Media | File JPG/PNG non verificati per compressione/formato (WebP); `images_lavori` con nomi lunghi. |

### Cosa manca
- Preconnect/preload per font o risorse critiche.
- Service worker / PWA (opzionale).
- Indicazioni su CDN o caching (dipende da hosting).

---

## 4. SEO

### ✅ OK
- Titolo pagina descrittivo: "L.E. Multiservizi di Andrea Kallashi - Rivestimento pavimenti e pareti".
- Struttura H2/H3 coerente (Servizi, Come Lavoriamo, Lavori, Contatti).
- Contenuti testuali ottimizzati per parole chiave (impresa edile, costruzioni, ristrutturazioni, ecc.).
- URL semplici: `index.html`, `privacy-policy.html`.

### ❌ Problemi

| Problema | Priorità | Dettaglio |
|----------|----------|-----------|
| **Nessuna meta description** | Alta | Manca `<meta name="description" content="...">`; importante per snippet in Google. |
| **Nessun Open Graph / Twitter Card** | Media | Manca `og:title`, `og:description`, `og:image`, `og:url` per condivisione social. |
| **Più H1 nella stessa pagina** | Media | Tre H1 nello slider; meglio un solo H1 (es. prima slide) e gli altri H2. |
| **Alt text assenti o vuoti** | Media | Molte `<img>` con `alt=""` (logo, slider, carousel lavori, landing); male per accessibilità e SEO. |
| **Nessuna sitemap.xml** | Media | Manca sitemap per indicazione esplicita delle pagine a Google. |
| **Nessun robots.txt** | Bassa | Manca `robots.txt` (anche solo per indicare sitemap o regole base). |

### Cosa manca
- Schema.org (LocalBusiness o Organization) in JSON-LD.
- Canonical URL.
- hreflang se in futuro ci sarà versione multilingua.

---

## 5. SICUREZZA

### ✅ OK
- Form contatto: validazione lato client; backend PHP con PHPMailer; uso di template per il corpo email.
- Nessun dato sensibile hardcoded nelle pagine HTML (password, token).
- Link esterni (Lux-Web, mappa) con `target="_blank"` e `rel="noopener noreferrer"` dove applicabile.

### ❌ Problemi

| Problema | Priorità | Dettaglio |
|----------|----------|-----------|
| **Config mail con credenziali demo** | Alta | `rd-mailform.config.json`: `recipientEmail` e account SMTP sono ancora "demo@gmail.com" / "demopassword"; in produzione le email non arriveranno al cliente e le credenziali vanno sostituite e protette. |
| **Nessun token CSRF sul form** | Media | Form senza token anti-CSRF; rischio moderato per un form contatto senza azioni sensibili lato utente, ma best practice è averlo. |
| **Possibile esposizione config** | Alta | Se la root del sito è esposta, `bat/rd-mailform.config.json` potrebbe essere leggibile; va impedito l’accesso diretto (es. fuori dalla webroot o regola server). |
| **HTTPS** | Alta | Da verificare in produzione: il sito deve essere servito solo in HTTPS. |

### Cosa manca
- Headers di sicurezza (CSP, X-Frame-Options, ecc.): dipendono da server/hosting.
- Rate limiting o captcha sul form contatto (riduce spam); template prevede reCAPTCHA ma non risulta integrato nel form HTML.

---

## 6. CONTENUTI

### ✅ OK
- Testi in italiano, tono professionale.
- Servizi e “Come Lavoriamo” chiari e coerenti con l’attività (rivestimenti, costruzioni, ristrutturazioni).
- Dati aziendali corretti: ragione sociale, P.IVA, indirizzo, telefono, PEC, mappa.

### ❌ Problemi

| Problema | Priorità | Dettaglio |
|----------|----------|-----------|
| **Template email in inglese** | Bassa | `rd-mailform.tpl`: testi "Notification", "Hi, someone left a message...", "This is an automatically generated email..."; meglio italianizzare. |

### Cosa manca
- Nessun errore grammaticale evidente nei testi analizzati; una rilettura finale da madrelingua è sempre utile.

---

## 7. NORMATIVE & LEGAL (GDPR, Cookie Law)

### ✅ OK
- **Privacy Policy** presente e dedicata: titolare, base giuridica, finalità, diritti (accesso, rettifica, cancellazione, limitazione, portabilità, opposizione, revoca consenso), conservazione, sicurezza, modifiche.
- Contatti per esercizio diritti: email e PEC.
- Riferimento ai cookie (sezione 7) e invito a consultare la Cookie Policy.

### ❌ Problemi

| Problema | Priorità | Dettaglio |
|----------|----------|-----------|
| **Cookie Policy assente** | Alta | La Privacy Policy rimanda alla "Cookie Policy" che non esiste; obbligo di informativa cookie (Cookie Law / ePrivacy). |
| **Nessun cookie banner** | Alta | Manca banner per consenso cookie (anche solo tecnici va informato; se ci sono cookie non tecnici, serve consenso prima dell’uso). |
| **Termini e Condizioni** | Bassa | Non presenti; per un sito vetrina senza vendita spesso non obbligatori, ma utili per limitare responsabilità. |
| **Consenso esplicito form** | Media | Il form contatto non ha checkbox esplicita tipo “Acconsento al trattamento dei miei dati secondo la Privacy Policy”; per GDPR è consigliata per legittimare l’invio. |

### Cosa manca
- Pagina (o sezione) Cookie Policy con elenco cookie, finalità, durata.
- Meccanismo di raccolta consenso (banner + eventuale preferenze).
- Se si usano cookie analytics/marketing: consenso prima dell’attivazione.

---

## 8. CONVERSIONE & AFFIDABILITÀ

### ✅ OK
- Contatti ben visibili: telefono, email, PEC, indirizzo, mappa.
- P.IVA e credito Lux-Web in footer (affidabilità e trasparenza).
- CTA chiare: Richiedi preventivo, Contattaci, link alle sezioni.
- Sezione “Alcuni dei lavori che abbiamo fatto” con carousel immagini.
- Form contatto con campi essenziali (nome, telefono, messaggio, email).

### ❌ Problemi

| Problema | Priorità | Dettaglio |
|----------|----------|-----------|
| **Form senza conferma consenso** | Media | Manca checkbox “Acconsento al trattamento dati”; può ridurre fiducia e conformità GDPR. |
| **Mancato invio email se config demo** | Alta | Con `recipientEmail` e SMTP demo le richieste non arrivano al cliente; conversione azzerata. |
| **Nessuna pagina 404** | Bassa | Link rotti potrebbero mostrare 404 generica; meglio una pagina brandizzata con link a home e contatti. |

### Cosa manca
- Recensioni/testimonianze (opzionale ma aumentano fiducia).
- Eventuale chat o indicazione orari di risposta per supportare la conversione.

---

## RIEPILOGO PRIORITÀ

### Alta
1. Aggiungere **meta description** e (consigliato) Open Graph.
2. Configurare **email reale** in `rd-mailform.config.json` e proteggere il file (o spostarlo fuori dalla webroot).
3. **Cookie Policy** + **cookie banner** (informativa + consenso dove richiesto).
4. **Checkbox consenso** privacy sul form contatto.

### Media
5. Correggere **lang** in `lang="it"` su index.html.
6. Ridurre a **un solo H1** per pagina (slider).
7. Aggiungere **alt testuali** a tutte le immagini rilevanti.
8. Introdurre **sitemap.xml** (e, se utile, robots.txt).
9. Valutare **lazy loading** per immagini sotto la fold e ottimizzazione dimensioni/formato.
10. Valutare **token CSRF** sul form e italianizzare template email.

### Bassa
11. Ottimizzare performance (critical CSS, minificazione, eventuale WebP).
12. Aggiungere **pagina 404** personalizzata.
13. Valutare **Termini e Condizioni** e link in footer.
14. Skip to content e altri miglioramenti accessibilità (WCAG).

---

## SUGGERIMENTI PRATICI

1. **Meta e social:** In `<head>` di `index.html` aggiungere almeno:
   - `<meta name="description" content="L.E. Multiservizi di Andrea Kallashi: rivestimento pavimenti e pareti, costruzioni civili e industriali, ristrutturazioni. Sesto ed Uniti (CR). Contatti e preventivi.">`
   - Tag `og:title`, `og:description`, `og:image`, `og:url`, `og:type`.

2. **Email:** In `bat/rd-mailform.config.json` impostare `recipientEmail` con l’indirizzo reale (es. PEC o email aziendale). Se si usa SMTP, configurare `useSmtp`, `host`, `username`, `password` con account dedicato e tenere il file fuori dalla webroot o bloccarlo con .htaccess/server.

3. **Cookie:** Creare `cookie-policy.html` con elenco cookie (tecnici e, se presenti, analytics). Aggiungere un banner in fondo alla pagina (o in overlay) con breve testo, link alla Cookie Policy e alla Privacy Policy, e pulsante “Accetta” (e eventuale “Rifiuta”/“Preferenze”). Salvare la scelta (es. localStorage) e non attivare cookie non tecnici prima del consenso.

4. **Form:** Aggiungere prima del pulsante “Invia” una checkbox obbligatoria: “Acconsento al trattamento dei miei dati secondo la <a href="privacy-policy.html">Privacy Policy</a>” e, nel backend, non inviare se non checked.

5. **Sitemap:** Creare `sitemap.xml` con `index.html` e `privacy-policy.html` (e altre pagine se ne aggiungi). In `robots.txt` (creare se assente) indicare: `Sitemap: https://tuodominio.it/sitemap.xml`.

6. **Immagini:** Per ogni `<img>` significativa inserire `alt` descrittivo (es. “L.E. Multiservizi - Logo”, “Lavoro di posa piastrelle - progetto Cremona”). Per le foto del carousel lavori usare descrizioni brevi e coerenti con il servizio.

7. **H1:** Lasciare un solo H1 in homepage (es. “Costruiamo il Tuo Futuro” nella prima slide) e trasformare i titoli delle altre due slide in H2.

Dopo queste modifiche il sito sarà più conforme a normative, più sicuro, più efficace per SEO e conversione.
