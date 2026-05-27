// ==UserScript==
// @name         GrepoSentry - Command Filter
// @namespace    https://grepolis.latavernadeglisbronzi.net/
// @version      1.0.13
// @description  Filtro ordini avanzato per Grepolis. Separa rivolte blu/rosse dagli attacchi in modalità rivolta e corregge supporti outgoing.
// @author       Gufettino (SilthersGaming.net)
// @match        http://*.grepolis.com/game/*
// @match        https://*.grepolis.com/game/*
// @exclude      view-source://*
// @updateURL    https://grepolis.latavernadeglisbronzi.net/downloads/GrepoSentry-Command-Filter.meta.js
// @downloadURL  https://grepolis.latavernadeglisbronzi.net/downloads/GrepoSentry-Command-Filter.user.js
// @homepageURL  https://grepolis.latavernadeglisbronzi.net/
// @supportURL   https://grepolis.latavernadeglisbronzi.net/
// @icon         https://grepolis.latavernadeglisbronzi.net/logo.png
// @icon64       https://grepolis.latavernadeglisbronzi.net/logo.png
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_info
// @connect      grepolis.latavernadeglisbronzi.net
// @run-at       document-idle
// @copyright    2026+, grepolis.latavernadeglisbronzi.net | latavernadeglisbronzi.net | silthersgaming.net
// ==/UserScript==

(function () {
  'use strict';

  var VERSION = (typeof GM_info !== 'undefined' && GM_info.script && GM_info.script.version) ? GM_info.script.version : '1.0.13';
  var AUTHOR = 'Gufettino';
  var SITE_URL = 'https://silthersgaming.net';
  var PLUGIN_URL = 'https://grepolis.latavernadeglisbronzi.net';
  var OFFICIAL_LOGO_URL = 'https://grepolis.latavernadeglisbronzi.net/logo.png';
  var UPDATE_META_URL = 'https://grepolis.latavernadeglisbronzi.net/downloads/GrepoSentry-Command-Filter.meta.js';
  var UPDATE_INSTALL_URL = 'https://grepolis.latavernadeglisbronzi.net/downloads/GrepoSentry-Command-Filter.user.js';

  var SERVER_ID = (function () {
    var m = window.location.hostname.match(/^([a-z]{2}\d+)\./i);
    return m ? m[1] : 'default';
  })();

  var STORAGE_KEY = 'greposentry_' + SERVER_ID;

  var LANG = {
    en: {
      title: 'GrepoSentry',
      subtitle: 'Command Filter',
      tab_filters: 'Filters',
      tab_display: 'Display',
      tab_icons: 'Icons',
      tab_about: 'About',
      language: 'Language',
      show_all: '✅ Show All',
      hide_all: '❌ Hide All',
      visible: 'Visible',
      total: 'Total commands',
      waiting: 'Waiting for command overview...',
      drag: 'drag',
      group_attack: 'Attacks',
      group_support: 'Supports',
      group_abort: 'Returns',
      group_revolt: 'Revolts',
      group_siege: 'Conquests',
      attack_out: 'Outgoing Attacks',
      attack_out_desc: 'Hide or show your outgoing attacks, including revolt-mode attacks.',
      attack_in: 'Incoming Attacks',
      attack_in_desc: 'Hide or show incoming enemy attacks, including incoming revolt-mode attacks.',
      support_out: 'Outgoing Supports',
      support_out_desc: 'Hide or show supports you sent to other cities.',
      support_in: 'Incoming Supports',
      support_in_desc: 'Hide or show supports arriving at your cities.',
      abort: 'Returns / Aborts',
      abort_desc: 'Hide or show troops returning home after cancellation.',
      revolt_blue: 'Active Revolts (Blue)',
      revolt_blue_desc: 'Hide or show blue active revolts only. Does not hide revolt-mode attacks.',
      revolt_red: 'Active Revolts (Red)',
      revolt_red_desc: 'Hide or show red active revolts only.',
      siege: 'Conquests',
      siege_desc: 'Hide or show conquest / siege commands.',
      visible_groups: 'Visible groups in quick panel',
      group_show: 'Show this group in the quick filter panel',
      icon_placeholder: 'Image URL (empty = emoji)',
      reset_icons: 'Reset icons',
      save_done: 'Settings saved',
      update_checking: 'Checking updates...',
      update_ok: 'Version is up to date',
      update_available: 'Update available',
      update_error: 'Unable to check updates',
      update_open: 'Install update',
      server: 'Current server',
      server_note: 'Settings are saved per Grepolis server.'
    },
    it: {
      title: 'GrepoSentry',
      subtitle: 'Filtro Ordini',
      tab_filters: 'Filtri',
      tab_display: 'Visualizzazione',
      tab_icons: 'Icone',
      tab_about: 'Info',
      language: 'Lingua',
      show_all: '✅ Mostra Tutti',
      hide_all: '❌ Nascondi Tutti',
      visible: 'Visibili',
      total: 'Totale ordini',
      waiting: 'In attesa della panoramica comandi...',
      drag: 'trascina',
      group_attack: 'Attacchi',
      group_support: 'Supporti',
      group_abort: 'Rientri',
      group_revolt: 'Rivolte',
      group_siege: 'Conquiste',
      attack_out: 'Attacchi in Uscita',
      attack_out_desc: 'Nasconde o mostra i tuoi attacchi in uscita, inclusi gli attacchi in modalità Rivolta.',
      attack_in: 'Attacchi in Entrata',
      attack_in_desc: 'Nasconde o mostra gli attacchi nemici in arrivo, inclusi gli attacchi Rivolta in entrata.',
      support_out: 'Supporti in Uscita',
      support_out_desc: 'Nasconde o mostra i supporti inviati ad altre città.',
      support_in: 'Supporti in Entrata',
      support_in_desc: 'Nasconde o mostra i supporti in arrivo alle tue città.',
      abort: 'Rientri / Interruzioni',
      abort_desc: 'Nasconde o mostra le truppe in rientro dopo un annullamento.',
      revolt_blue: 'Rivolte in Corso (Blu)',
      revolt_blue_desc: 'Nasconde o mostra solo le rivolte blu attive. Non nasconde gli attacchi in modalità Rivolta.',
      revolt_red: 'Rivolte in Corso (Rosse)',
      revolt_red_desc: 'Nasconde o mostra solo le rivolte rosse attive.',
      siege: 'Conquiste',
      siege_desc: 'Nasconde o mostra i comandi di conquista / assedio.',
      visible_groups: 'Gruppi visibili nel pannello rapido',
      group_show: 'Mostra questo gruppo nel pannello filtro rapido',
      icon_placeholder: 'URL immagine (vuoto = emoji)',
      reset_icons: 'Resetta icone',
      save_done: 'Impostazioni salvate',
      update_checking: 'Controllo aggiornamenti...',
      update_ok: 'Versione aggiornata',
      update_available: 'Aggiornamento disponibile',
      update_error: 'Impossibile controllare aggiornamenti',
      update_open: 'Installa aggiornamento',
      server: 'Server attuale',
      server_note: 'Le impostazioni vengono salvate per ogni server Grepolis.'
    }
  };

  var DEFAULT_ICONS = {
    attack_out: '⚔️➡️',
    attack_in: '⚔️⬅️',
    support_out: '🛡️➡️',
    support_in: '🛡️⬅️',
    abort: '🔄',
    revolt_blue: '🔵',
    revolt_red: '🔴',
    siege: '🏰',
    ext: '🚨'
  };

  var FILTERS = [
    { id: 'attack_out', group: 'attack' },
    { id: 'attack_in', group: 'attack' },
    { id: 'support_out', group: 'support' },
    { id: 'support_in', group: 'support' },
    { id: 'abort', group: 'abort' },
    { id: 'revolt_blue', group: 'revolt' },
    { id: 'revolt_red', group: 'revolt' },
    { id: 'siege', group: 'siege' }
  ];

  var GROUP_KEYS = ['attack', 'support', 'abort', 'revolt', 'siege'];

  var updateStatus = {
    state: 'checking',
    latest: '',
    checkedAt: 0
  };

  function defaultState() {
    var s = {
      lang: 'it',
      icons: {},
      groups: {},
      panelOpen: false
    };

    FILTERS.forEach(function (f) {
      s[f.id] = true;
    });

    GROUP_KEYS.forEach(function (g) {
      s.groups[g] = true;
    });

    return s;
  }

  function loadState() {
    try {
      var raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
      var s = defaultState();

      if (!raw || typeof raw !== 'object') return s;

      FILTERS.forEach(function (f) {
        if (typeof raw[f.id] === 'boolean') s[f.id] = raw[f.id];
      });

      if (raw.groups && typeof raw.groups === 'object') {
        GROUP_KEYS.forEach(function (g) {
          if (typeof raw.groups[g] === 'boolean') s.groups[g] = raw.groups[g];
        });
      }

      if (raw.icons && typeof raw.icons === 'object') {
        Object.keys(raw.icons).forEach(function (id) {
          var cleaned = normalizeIconUrl(raw.icons[id]);
          if (cleaned && id !== 'ext') s.icons[id] = cleaned;
        });
      }

      if (raw.lang === 'it' || raw.lang === 'en') s.lang = raw.lang;
      if (typeof raw.panelOpen === 'boolean') s.panelOpen = raw.panelOpen;

      return s;
    } catch (e) {
      return defaultState();
    }
  }

  var state = loadState();

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function tt(key) {
    var l = LANG[state.lang] || LANG.it;
    return l[key] || LANG.it[key] || LANG.en[key] || key;
  }

  function escHtml(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escAttr(v) {
    return escHtml(v).replace(/`/g, '&#96;');
  }

  function normalizeIconUrl(v) {
    var raw = String(v || '').trim();
    if (!raw) return '';

    try {
      var u = new URL(raw, window.location.href);
      if (u.protocol !== 'https:' && u.protocol !== 'http:') return '';
      return u.href;
    } catch (e) {
      return '';
    }
  }

  function getIconUrl(id) {
    if (id === 'ext') return OFFICIAL_LOGO_URL;
    return normalizeIconUrl(state.icons[id]);
  }

  function iconHtml(id, size) {
    var url = getIconUrl(id);
    var fallback = escHtml(DEFAULT_ICONS[id] || '');
    var px = Number(size || 18);

    if (url) {
      return '<img src="' + escAttr(url) + '" style="width:' + px + 'px;height:' + px + 'px;vertical-align:middle;object-fit:contain" onerror="this.style.display=\'none\';this.nextSibling.style.display=\'inline\'"><span style="display:none">' + fallback + '</span>';
    }

    return fallback;
  }

  function parseVersionFromMeta(metaText) {
    var m = String(metaText || '').match(/^\s*\/\/\s*@version\s+([^\s]+)/mi);
    return m ? m[1].trim() : '';
  }

  function compareVersions(a, b) {
    var pa = String(a || '0').split(/[.-]/).map(function (x) {
      var n = parseInt(x, 10);
      return isNaN(n) ? 0 : n;
    });

    var pb = String(b || '0').split(/[.-]/).map(function (x) {
      var n = parseInt(x, 10);
      return isNaN(n) ? 0 : n;
    });

    var len = Math.max(pa.length, pb.length);
    for (var i = 0; i < len; i++) {
      var na = pa[i] || 0;
      var nb = pb[i] || 0;
      if (na > nb) return 1;
      if (na < nb) return -1;
    }
    return 0;
  }

  function checkForGrepoSentryUpdate() {
    updateStatus.state = 'checking';
    refreshUpdateStatusUI();

    if (typeof GM_xmlhttpRequest !== 'function') {
      updateStatus.state = 'error';
      refreshUpdateStatusUI();
      return;
    }

    GM_xmlhttpRequest({
      method: 'GET',
      url: UPDATE_META_URL + '?_=' + Date.now(),
      timeout: 8000,
      onload: function (res) {
        if (!res || res.status < 200 || res.status >= 300) {
          updateStatus.state = 'error';
          refreshUpdateStatusUI();
          return;
        }

        var remoteVersion = parseVersionFromMeta(res.responseText);
        if (!remoteVersion) {
          updateStatus.state = 'error';
          refreshUpdateStatusUI();
          return;
        }

        updateStatus.latest = remoteVersion;
        updateStatus.checkedAt = Date.now();
        updateStatus.state = compareVersions(remoteVersion, VERSION) > 0 ? 'available' : 'ok';
        refreshUpdateStatusUI();
      },
      onerror: function () {
        updateStatus.state = 'error';
        refreshUpdateStatusUI();
      },
      ontimeout: function () {
        updateStatus.state = 'error';
        refreshUpdateStatusUI();
      }
    });
  }

  function getUpdateStatusText() {
    if (updateStatus.state === 'available') {
      return '⚠️ ' + tt('update_available') + ': v' + updateStatus.latest + ' — installata: v' + VERSION;
    }

    if (updateStatus.state === 'ok') {
      return '✅ ' + tt('update_ok') + ': v' + VERSION;
    }

    if (updateStatus.state === 'error') {
      return '❌ ' + tt('update_error');
    }

    return '🔎 ' + tt('update_checking');
  }

  function refreshUpdateStatusUI() {
    var el = document.getElementById('gs-update-status');
    if (el) el.textContent = getUpdateStatusText();

    var link = document.getElementById('gs-update-link');
    if (link) link.style.display = updateStatus.state === 'available' ? 'inline-block' : 'none';
  }

  function addStyle(css) {
    if (typeof GM_addStyle === 'function') {
      GM_addStyle(css);
      return;
    }

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  addStyle(
    '#gs-panel{position:fixed;top:100px;right:20px;z-index:10000;background:linear-gradient(180deg,#3a2a1a,#2a1c0e);border:2px solid #8b6914;border-radius:8px;min-width:285px;max-width:340px;box-shadow:0 4px 16px rgba(0,0,0,.5);font:12px Verdana,Arial,sans-serif;color:#eedcb3;display:none}' +
    '#gs-panel.gs-visible{display:block}' +
    '#gs-header{background:linear-gradient(180deg,#5c3d1e,#3a2a1a);padding:8px 12px;border-bottom:1px solid #8b6914;border-radius:6px 6px 0 0;font-weight:bold;font-size:13px;color:#ffd780;display:flex;justify-content:space-between;align-items:center;cursor:move}' +
    '#gs-header span{pointer-events:none}#gs-body{padding:8px 10px;max-height:400px;overflow-y:auto}' +
    '.gs-gl{font-size:10px;color:#8b7740;text-transform:uppercase;letter-spacing:.5px;padding:6px 8px 2px;margin-top:2px}' +
    '.gs-row{display:flex;align-items:center;gap:8px;padding:5px 8px;border-radius:4px;cursor:pointer;transition:background .15s;user-select:none}' +
    '.gs-row:hover{background:rgba(255,215,128,.12)}.gs-row input[type="checkbox"]{accent-color:#c9a84c;width:15px;height:15px;cursor:pointer;flex-shrink:0}' +
    '.gs-row label{cursor:pointer;flex:1}.gs-ic{font-size:14px;flex-shrink:0;width:24px;text-align:center}.gs-sep{height:1px;background:rgba(139,105,20,.2);margin:4px 8px}' +
    '.gs-act{display:flex;gap:6px;padding:8px 10px 10px;border-top:1px solid rgba(139,105,20,.3);margin-top:4px}' +
    '.gs-btn{flex:1;padding:5px 8px;border:1px solid #8b6914;border-radius:4px;background:linear-gradient(180deg,#5c3d1e,#3a2a1a);color:#eedcb3;font-size:11px;cursor:pointer;text-align:center;transition:background .15s,color .15s}' +
    '.gs-btn:hover{background:linear-gradient(180deg,#7a5228,#5c3d1e);color:#ffd780}' +
    '#gs-toggle{position:absolute !important;top:56px !important;right:110px !important;z-index:11;margin:0 !important;width:32px;height:33px;display:block;overflow:visible;cursor:pointer;transition:transform .15s}' +
    '#gs-toggle.gs-fallback{position:fixed !important;top:auto !important;right:auto !important;bottom:105px !important;left:15px !important;z-index:1002 !important;width:38px !important;height:38px !important;border-radius:8px !important;border:1px solid #8b6914 !important;background:linear-gradient(180deg,#5c3d1e,#2a1c0e) !important;box-shadow:0 3px 10px rgba(0,0,0,.55) !important}' +
    '#gs-toggle:hover{transform:scale(1.08)}' +
    '#gs-toggle .gs-toggle-logo-wrap{position:absolute;left:0;top:0;width:32px;height:33px;display:flex;align-items:center;justify-content:center;pointer-events:none;font-size:18px}' +
    '#gs-toggle.gs-fallback .gs-toggle-logo-wrap{width:38px;height:38px}' +
    '#gs-toggle .gs-toggle-logo-wrap img{width:18px !important;height:18px !important;object-fit:contain;display:block}' +
    '#gs-badge{position:absolute;top:-4px;right:-4px;background:#c0392b;color:#fff;font-size:8px;font-weight:bold;border-radius:50%;width:14px;height:14px;display:flex;align-items:center;justify-content:center;line-height:1;z-index:2}' +
    '#gs-badge:empty{display:none}#gs-stats{padding:4px 10px 6px;font-size:10px;color:#a08b60;text-align:center}' +
    'li.js-command-row.gs-hidden{display:none!important}.js-dropdown-item-list>div.gs-hidden,.toolbar_activities_body [data-commandtype].gs-hidden,.toolbar_activities_body [data-command_type].gs-hidden,.dropdown-list .content.js-dropdown-item-list>div.gs-hidden{display:none!important}' +
    '#gs_settings .content_category{width:100%;border-collapse:collapse}' +
    '#gs_settings .content_category td{padding:8px 10px;vertical-align:top;border-bottom:1px solid rgba(139,105,20,.15)}' +
    '#gs_settings .content_category td:first-child{width:60px;text-align:center}' +
    '#gs_settings .content_category p{margin:2px 0 0;font-size:11px;color:#666}' +
    '#gs_settings .gs-stab-nav{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap}' +
    '#gs_settings .gs-stab-nav li{margin:0}' +
    '#gs_settings .gs-stab-nav .submenu_link{display:block;text-decoration:none}' +
    '#gs_settings .gs-stab-nav .submenu_link .middle{padding:0 6px}' +
    '#gs_settings .gs-stab-panel{display:none}#gs_settings .gs-stab-panel.visible{display:block}' +
    '#gs_settings .gs-icon-field{display:flex;align-items:center;gap:6px;margin:4px 0}' +
    '#gs_settings .gs-icon-field input[type="text"]{flex:1;padding:3px 6px;border:1px solid #d0be97;border-radius:3px;font-size:11px;background:#fff;max-width:300px}' +
    '#gs_settings .gs-icon-field .gs-iprev{width:24px;height:24px;text-align:center;line-height:24px;font-size:16px;flex-shrink:0}' +
    '#gs_settings .gs-about-center{text-align:center;padding:30px 10px}' +
    '.dropdown-list .content.js-dropdown-item-list,div.content.js-dropdown-item-list{overflow:auto!important}' +
    '#context_menu,#context_menu *{pointer-events:auto!important}' +
    '#gs_settings .alliance_link,#gs_settings a{outline-style:none!important;font-weight:700!important;text-decoration:none!important;cursor:pointer!important}'
  );

  function getCmdType(el) {
    return (el.getAttribute('data-command_type') || el.getAttribute('data-commandtype') || '').toLowerCase();
  }

  function getCancelableValue(el) {
    var v = el.getAttribute('data-cancelable');
    return v == null ? '' : String(v).trim().toLowerCase();
  }

  function normalizeText(v) {
    return String(v || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  function hasIC(el, cls) {
    return !!(el && el.querySelector && el.querySelector('.' + cls));
  }

  function getBlob(el) {
    return String(((el && el.className) || '') + ' ' + ((el && el.innerHTML) || '')).toLowerCase();
  }

  function isNumericCancelable(v) {
    v = String(v == null ? '' : v).trim().toLowerCase();
    if (!v || v === 'null' || v === '-1') return false;
    return /^\d+$/.test(v);
  }

  function samePlayer(a, b) {
    if (!a || !b) return false;
    if (a.id && b.id) return String(a.id) === String(b.id);
    return normalizeText(a.name) && normalizeText(a.name) === normalizeText(b.name);
  }

  function getSelfPlayer() {
    if (getSelfPlayer._cache) return getSelfPlayer._cache;

    var self = { id: '', name: '' };

    try {
      if (window.Game) {
        if (Game.player_id != null) self.id = String(Game.player_id).trim();
        if (typeof Game.player_name === 'string') self.name = Game.player_name.trim();
      }
    } catch (e) {}

    try {
      if (!self.id && window.GameData && GameData.player && GameData.player.id != null) {
        self.id = String(GameData.player.id).trim();
      }
      if (!self.name && window.GameData && GameData.player && typeof GameData.player.name === 'string') {
        self.name = String(GameData.player.name).trim();
      }
    } catch (e) {}

    if (!self.name) {
      var el = document.querySelector('.player_name, .js-player-name');
      if (el) self.name = el.textContent.trim();
    }

    getSelfPlayer._cache = self;
    return self;
  }

  function parsePlayerLink(a) {
    var out = { id: '', name: '' };
    if (!a) return out;

    out.name = (a.textContent || '').trim();

    var href = a.getAttribute('href') || '';
    var hash = href.charAt(0) === '#' ? href.slice(1) : '';

    if (hash) {
      try {
        var decoded = atob(hash);
        var data = JSON.parse(decoded);
        if (data && data.id != null) out.id = String(data.id).trim();
        if (!out.name && data && data.name) out.name = String(data.name).trim();
      } catch (e) {}
    }

    return out;
  }

  function getCommandPlayers(el) {
    return Array.prototype.slice.call(el.querySelectorAll('a.gp_player_link'))
      .map(parsePlayerLink)
      .filter(function (p) { return p.id || p.name; });
  }

  function isOutgoing(el) {
    if (!el) return false;

    var b = getBlob(el);
    var cancelable = getCancelableValue(el);

    if (el.querySelector('.overview_outgoing')) return true;
    if (el.querySelector('.outgoing')) return true;
    if (/\boutgoing\b/.test(b)) return true;
    if (el.querySelector('a.game_arrow_delete')) return true;

    // .js-delete da sola NON basta: anche le rivolte blu attive la hanno.
    if (el.querySelector('.js-delete.cancelable')) return true;
    if (isNumericCancelable(cancelable)) return true;

    return b.indexOf('overview_outgoing') !== -1;
  }

  function isIncoming(el) {
    if (!el) return false;

    var b = getBlob(el);

    if (el.querySelector('.overview_incoming')) return true;
    if (el.querySelector('.incoming')) return true;
    if (el.classList && el.classList.contains('color_highlight')) return true;

    return b.indexOf('overview_incoming') !== -1 || /\bincoming\b/.test(b);
  }

  function isCityDropdownIncomingFallback(el, blob) {
    var ct = getCmdType(el);
    var cancelable = getCancelableValue(el);
    var inCityDropdown = !!el.closest('.js-dropdown-item-list, .toolbar_activities_body, .dropdown-list .content.js-dropdown-item-list');
    var hasPlayers = getCommandPlayers(el).length >= 2;

    if (!inCityDropdown) return false;
    if (hasPlayers) return false;

    // Se Grepolis scrive outgoing, lo rispettiamo. Serve per supporti tra proprie polis.
    if (/\boutgoing\b/.test(blob)) return false;

    if (cancelable !== 'null') return false;

    if (ct === 'abort' || hasIC(el, 'abort') || /\babort\b/.test(blob)) return false;

    // Fallback solo per attacchi ambigui. Non forziamo support come entrata.
    if (/\battack\b/.test(blob) && !/\bsupport\b/.test(blob)) return true;

    return false;
  }

  function getDir(el) {
    var self = getSelfPlayer();
    var players = getCommandPlayers(el);

    if ((self.id || self.name) && players.length >= 2) {
      var fromPlayer = players[0];
      var toPlayer = players[players.length - 1];

      var fromSelf = samePlayer(fromPlayer, self);
      var toSelf = samePlayer(toPlayer, self);

      if (fromSelf && !toSelf) return 'out';
      if (toSelf && !fromSelf) return 'in';
    }

    var blob = getBlob(el);
    var out = isOutgoing(el);
    var inc = isIncoming(el);

    if (out && !inc) return 'out';
    if (inc && !out) return 'in';

    if (isCityDropdownIncomingFallback(el, blob)) return 'in';

    if (out) return 'out';
    if (inc) return 'in';

    return 'out';
  }

  function classify(el) {
    var ct = getCmdType(el);
    if (!ct) return null;

    var dir = getDir(el);
    var b = getBlob(el);

    var hasRevoltArising = hasIC(el, 'revolt_arising') || /\brevolt_arising\b/.test(b);
    var hasRevoltRunning = hasIC(el, 'revolt_running') || /\brevolt_running\b/.test(b);
    var hasPlainRevolt = hasIC(el, 'revolt') || /\brevolt\b/.test(b);
    var hasSupport = hasIC(el, 'support') || /\bsupport\b/.test(b);
    var hasAttack = hasIC(el, 'attack') || /\battack\b/.test(b);

    if (ct === 'abort' || hasIC(el, 'abort') || /\babort\b/.test(b)) {
      return 'abort';
    }

    // Rivolte attive vere: dropdown data-commandtype="revolts".
    if (ct === 'revolts') {
      return hasRevoltRunning ? 'revolt_red' : 'revolt_blue';
    }

    // Panoramica: rivolta blu/rossa attiva.
    if (ct === 'revolt' && hasRevoltArising) {
      return 'revolt_blue';
    }

    if (ct === 'revolt' && hasRevoltRunning) {
      return 'revolt_red';
    }

    // Attacco in modalità Rivolta: data-command_type="revolt" ma icona semplice "revolt".
    if (ct === 'revolt' && hasPlainRevolt && !hasRevoltArising && !hasRevoltRunning) {
      return dir === 'out' ? 'attack_out' : 'attack_in';
    }

    if (ct === 'attack_takeover') return 'siege';

    if (
      (ct === 'unit_movements' || ct === 'colonize') &&
      (hasIC(el, 'attack_takeover') || hasIC(el, 'colonize_ship'))
    ) {
      return 'siege';
    }

    if (
      ct.includes('takeover') ||
      ct.includes('conquest') ||
      ct.includes('colonize') ||
      ct.includes('breach')
    ) {
      return 'siege';
    }

    if (ct === 'unit_movements') {
      if (hasSupport) {
        return dir === 'out' ? 'support_out' : 'support_in';
      }

      // Dropdown: class="revolt outgoing" = attacco in modalità Rivolta.
      if (hasPlainRevolt) {
        return dir === 'out' ? 'attack_out' : 'attack_in';
      }

      if (hasAttack) {
        return dir === 'out' ? 'attack_out' : 'attack_in';
      }
    }

    if (ct === 'attack_land' || ct === 'attack_sea' || ct === 'attack_spy' || ct === 'farm_attack') {
      return dir === 'out' ? 'attack_out' : 'attack_in';
    }

    if (ct.startsWith('attack') && !ct.includes('takeover') && !ct.includes('conquest')) {
      return dir === 'out' ? 'attack_out' : 'attack_in';
    }

    if (ct === 'support') return dir === 'out' ? 'support_out' : 'support_in';

    return null;
  }

  function buildPanel() {
    var p = document.createElement('div');
    p.id = 'gs-panel';

    var html = '';
    var lastGroup = '';

    FILTERS.forEach(function (f) {
      if (!state.groups[f.group]) return;

      if (lastGroup !== f.group) {
        if (lastGroup) html += '<div class="gs-sep"></div>';
        html += '<div class="gs-gl">' + escHtml(tt('group_' + f.group)) + '</div>';
        lastGroup = f.group;
      }

      html += '<div class="gs-row" data-filter="' + escAttr(f.id) + '">' +
        '<input type="checkbox" id="gs-' + escAttr(f.id) + '"' + (state[f.id] ? ' checked' : '') + '>' +
        '<span class="gs-ic">' + iconHtml(f.id, 18) + '</span>' +
        '<label for="gs-' + escAttr(f.id) + '">' + escHtml(tt(f.id)) + '</label>' +
        '</div>';
    });

    p.innerHTML =
      '<div id="gs-header"><span>' + iconHtml('ext', 16) + ' ' + escHtml(tt('title')) + '</span><span style="font-size:10px;opacity:.55">' + escHtml(tt('drag')) + '</span></div>' +
      '<div id="gs-body">' + html + '</div>' +
      '<div class="gs-act"><div class="gs-btn" id="gs-all">' + escHtml(tt('show_all')) + '</div><div class="gs-btn" id="gs-none">' + escHtml(tt('hide_all')) + '</div></div>' +
      '<div id="gs-stats"></div>';

    return p;
  }

  var panel = null;
  var inlineBtn = null;

  function ensurePanel() {
    if (document.getElementById('gs-panel')) return;

    panel = buildPanel();
    document.body.appendChild(panel);

    if (state.panelOpen) panel.classList.add('gs-visible');

    bindPanelEvents();
  }

  function rebuildPanel() {
    var old = document.getElementById('gs-panel');
    var wasOpen = old && old.classList.contains('gs-visible');
    if (old) old.remove();

    panel = buildPanel();
    document.body.appendChild(panel);
    if (wasOpen || state.panelOpen) panel.classList.add('gs-visible');

    bindPanelEvents();
    applyFilters();
  }

  function bindPanelEvents() {
    panel = document.getElementById('gs-panel');
    if (!panel || panel.dataset.gsBound === '1') return;

    panel.dataset.gsBound = '1';

    panel.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    panel.querySelectorAll('.gs-row').forEach(function (row) {
      var cb = row.querySelector('input');
      if (!cb) return;

      var upd = function () {
        state[row.dataset.filter] = cb.checked;
        saveState();
        scheduleFilter(50);
        updateCounter();
        syncSettings();
      };

      cb.addEventListener('change', upd);

      row.addEventListener('click', function (e) {
        if (e.target !== cb) {
          cb.checked = !cb.checked;
          upd();
        }
      });
    });

    var all = document.getElementById('gs-all');
    var none = document.getElementById('gs-none');

    if (all) all.addEventListener('click', function () { setAll(true); });
    if (none) none.addEventListener('click', function () { setAll(false); });

    makePanelDraggable();
  }

  function makePanelDraggable() {
    var hdr = document.getElementById('gs-header');
    var p = document.getElementById('gs-panel');
    if (!hdr || !p || hdr.dataset.gsDrag === '1') return;

    hdr.dataset.gsDrag = '1';

    var dragging = false;
    var ox = 0;
    var oy = 0;

    hdr.addEventListener('mousedown', function (e) {
      dragging = true;
      var r = p.getBoundingClientRect();
      ox = e.clientX - r.left;
      oy = e.clientY - r.top;
      p.style.left = r.left + 'px';
      p.style.top = r.top + 'px';
      p.style.right = 'auto';
      p.style.bottom = 'auto';
      e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      p.style.left = Math.max(0, e.clientX - ox) + 'px';
      p.style.top = Math.max(0, e.clientY - oy) + 'px';
    });

    document.addEventListener('mouseup', function () {
      dragging = false;
    });
  }

  function setAll(v) {
    FILTERS.forEach(function (f) {
      state[f.id] = v;
    });

    saveState();

    document.querySelectorAll('#gs-panel input[type="checkbox"]').forEach(function (cb) {
      cb.checked = v;
    });

    scheduleFilter(50);
    updateCounter();
    syncSettings();
  }

  function injectToggle() {
    if (document.getElementById('gs-toggle')) return;

    var container = document.querySelector('.gods_area');
    var fallback = false;

    if (!container) {
      container = document.body;
      fallback = true;
    }

    if (!container) return;

    inlineBtn = document.createElement('div');
    inlineBtn.id = 'gs-toggle';
    inlineBtn.className = 'btn_settings circle_button gs-gods-toggle' + (fallback ? ' gs-fallback' : '');
    inlineBtn.title = tt('title') + ' - ' + tt('subtitle');
    inlineBtn.innerHTML = '<div class="gs-toggle-logo-wrap">' + iconHtml('ext', 18) + '</div><span id="gs-badge"></span>';

    container.appendChild(inlineBtn);

    inlineBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      ensurePanel();

      var p = document.getElementById('gs-panel');
      if (!p) return;

      p.classList.toggle('gs-visible');
      state.panelOpen = p.classList.contains('gs-visible');
      saveState();

      if (p.classList.contains('gs-visible')) {
        if (fallback) {
          p.style.top = 'auto';
          p.style.right = 'auto';
          p.style.bottom = '150px';
          p.style.left = '15px';
        } else {
          var r = inlineBtn.getBoundingClientRect();
          p.style.top = (r.bottom + 8) + 'px';
          p.style.left = 'auto';
          p.style.right = Math.max(20, window.innerWidth - r.right) + 'px';
          p.style.bottom = 'auto';
        }
      }
    });

    updateCounter();
  }

  document.addEventListener('click', function (e) {
    var p = document.getElementById('gs-panel');
    var t = document.getElementById('gs-toggle');

    if (!p || !t) return;

    if (p.classList.contains('gs-visible') && !p.contains(e.target) && !t.contains(e.target)) {
      p.classList.remove('gs-visible');
      state.panelOpen = false;
      saveState();
    }
  });

  function updateCounter() {
    var c = FILTERS.filter(function (f) { return !state[f.id]; }).length;
    var b = document.getElementById('gs-badge');
    if (b) b.textContent = c || '';
  }

  function applyFilters() {
    filterOverview();
    filterCity();
  }

  function filterOverview() {
    var c = document.getElementById('command_overview');
    var st = document.getElementById('gs-stats');

    if (!c) {
      if (st) st.textContent = tt('waiting');
      return;
    }

    var rows = c.querySelectorAll('li.js-command-row');
    var total = 0;
    var hidden = 0;

    rows.forEach(function (li) {
      total++;
      var tp = classify(li);
      var hide = !!(tp && !state[tp]);

      if (hide) li.classList.add('gs-hidden');
      else li.classList.remove('gs-hidden');

      if (hide) hidden++;
    });

    if (st) {
      st.textContent = hidden > 0 ? tt('visible') + ': ' + (total - hidden) + ' / ' + total : tt('total') + ': ' + total;
    }
  }

  function filterCity() {
    var selector = [
      '.js-dropdown-item-list > div[data-commandtype]',
      '.js-dropdown-item-list > div[data-command_type]',
      '.toolbar_activities_body [data-commandtype]',
      '.toolbar_activities_body [data-command_type]',
      '.dropdown-list .content.js-dropdown-item-list > div[data-commandtype]',
      '.dropdown-list .content.js-dropdown-item-list > div[data-command_type]'
    ].join(',');

    document.querySelectorAll(selector).forEach(function (el) {
      var tp = classify(el);
      var hide = !!(tp && !state[tp]);

      if (hide) el.classList.add('gs-hidden');
      else el.classList.remove('gs-hidden');
    });
  }

  var filterTimer = null;

  function scheduleFilter(delay) {
    if (filterTimer) clearTimeout(filterTimer);
    filterTimer = setTimeout(applyFilters, typeof delay === 'number' ? delay : 200);
  }

  function softBurstFilter() {
    scheduleFilter(100);
    setTimeout(applyFilters, 500);
    setTimeout(applyFilters, 1200);
  }

  var cmdObs = null;
  var cityObs = null;

  function mutationOnlyContextMenu(mutations) {
    var foundAdded = false;

    for (var i = 0; i < mutations.length; i++) {
      var nodes = Array.prototype.slice.call(mutations[i].addedNodes || []);
      if (!nodes.length) continue;

      foundAdded = true;

      for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        if (!node || node.nodeType !== 1) continue;

        if (node.id === 'context_menu') continue;
        if (node.closest && node.closest('#context_menu')) continue;

        return false;
      }
    }

    return foundAdded;
  }

  function watch() {
    injectToggle();
    ensurePanel();
    injectSettings();

    var c = document.getElementById('command_overview');
    if (c && !c.dataset.gsW) {
      c.dataset.gsW = '1';
      if (cmdObs) cmdObs.disconnect();
      cmdObs = new MutationObserver(function () {
        softBurstFilter();
      });
      cmdObs.observe(c, { childList: true, subtree: true });
    }

    var cityRoot = document.querySelector('.toolbar_activities_body, .dropdown-list .content.js-dropdown-item-list, .js-dropdown-item-list');
    if (cityRoot && !cityRoot.dataset.gsW) {
      cityRoot.dataset.gsW = '1';
      if (cityObs) cityObs.disconnect();
      cityObs = new MutationObserver(function (m) {
        if (mutationOnlyContextMenu(m)) return;
        softBurstFilter();
      });
      cityObs.observe(cityRoot, { childList: true, subtree: true });
    }

    scheduleFilter(100);
  }

  var bodyObs = new MutationObserver(function (m) {
    if (mutationOnlyContextMenu(m)) return;

    for (var i = 0; i < m.length; i++) {
      if (m[i].addedNodes && m[i].addedNodes.length > 0) {
        watch();
        return;
      }
    }
  });

  if (document.body) {
    bodyObs.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });
  }

  function injectSettings() {
    if (document.getElementById('gs_li')) return;

    var menu = document.querySelector('.settings-menu');
    var mainC = document.querySelector('.settings-container');

    if (!menu || !mainC) return;

    var targetUl = null;
    var bolds = menu.querySelectorAll('b');

    for (var i = 0; i < bolds.length; i++) {
      var tx = bolds[i].textContent.trim();
      if (tx === 'Altro' || tx === 'Other' || tx === 'Sonstiges' || tx === 'Otros') {
        targetUl = bolds[i].nextElementSibling;
        break;
      }
    }

    if (!targetUl || targetUl.tagName !== 'UL') {
      targetUl = menu.querySelector('ul');
    }

    if (!targetUl) return;

    var li = document.createElement('li');
    li.id = 'gs_li';
    li.innerHTML = '<span style="font-size:15px;vertical-align:middle;display:inline-block;">' + iconHtml('ext', 16) + '</span> <a id="gs_settings_link" href="#">' + escHtml(tt('title')) + '</a>';
    targetUl.appendChild(li);

    var sec = document.createElement('div');
    sec.id = 'gs_settings';
    sec.className = 'player_settings section';
    sec.style.display = 'none';

    sec.innerHTML = buildSettingsHtml();
    mainC.appendChild(sec);

    bindSettingsEvents(sec, menu, mainC);
    refreshUpdateStatusUI();
  }

  function buildSettingsHtml() {
    var filterRows = '';

    FILTERS.forEach(function (f) {
      filterRows += '<tr><td><span style="font-size:34px">' + iconHtml(f.id, 34) + '</span></td><td>' +
        '<div id="gs-s-' + escAttr(f.id) + '" class="checkbox_new' + (state[f.id] ? ' checked green' : '') + '" data-gs-f="' + escAttr(f.id) + '" style="cursor:pointer"><div class="cbx_icon"></div><div class="cbx_caption">' + escHtml(tt(f.id)) + '</div></div>' +
        '<p>' + escHtml(tt(f.id + '_desc')) + '</p></td></tr>';
    });

    var displayRows = '';
    displayRows += '<tr><td><span style="font-size:34px">🌐</span></td><td>' +
      '<div style="font-weight:bold;margin-bottom:4px">' + escHtml(tt('language')) + '</div>' +
      '<select id="gs-s-lang" style="padding:4px 8px;border:1px solid #9e854e;border-radius:3px;font-size:12px;background:#FFEECA">' +
      '<option value="it"' + (state.lang === 'it' ? ' selected' : '') + '>🇮🇹 Italiano</option>' +
      '<option value="en"' + (state.lang === 'en' ? ' selected' : '') + '>🇬🇧 English</option>' +
      '</select></td></tr>';

    displayRows += '<tr><td colspan="2"><div style="font-weight:bold;margin-top:8px;margin-bottom:6px">' + escHtml(tt('visible_groups')) + '</div></td></tr>';

    GROUP_KEYS.forEach(function (gk) {
      displayRows += '<tr><td></td><td>' +
        '<div class="checkbox_new' + (state.groups[gk] ? ' checked green' : '') + '" data-gs-g="' + escAttr(gk) + '" style="cursor:pointer"><div class="cbx_icon"></div><div class="cbx_caption">' + escHtml(tt('group_' + gk)) + '</div></div>' +
        '<p>' + escHtml(tt('group_show')) + '</p></td></tr>';
    });

    var iconRows = '';

    FILTERS.forEach(function (f) {
      iconRows += '<tr><td><span style="font-size:34px">' + iconHtml(f.id, 34) + '</span></td><td>' +
        '<div style="font-weight:bold;margin-bottom:4px">' + escHtml(tt(f.id)) + '</div>' +
        '<div class="gs-icon-field"><div class="gs-iprev">' + iconHtml(f.id, 18) + '</div>' +
        '<input type="text" class="gs-s-icon" data-icon-id="' + escAttr(f.id) + '" value="' + escAttr(state.icons[f.id] || '') + '" placeholder="' + escAttr(tt('icon_placeholder')) + '"></div>' +
        '</td></tr>';
    });

    iconRows += '<tr><td></td><td><a href="#" id="gs-reset-icons" style="color:#c0392b;font-size:11px">' + escHtml(tt('reset_icons')) + '</a></td></tr>';

    var about = '';
    about += '<div class="gs-stab-panel gs-about-center" data-gs-tab="about">';
    about += '<div style="font-size:58px;margin-bottom:10px">' + iconHtml('ext', 48) + '</div>';
    about += '<h2 style="color:#8b6914;margin:0 0 4px">GrepoSentry</h2>';
    about += '<p style="font-size:11px;color:#888;margin:0 0 8px">v' + escHtml(VERSION) + '</p>';
    about += '<div style="margin:4px 0 10px"><span id="gs-update-status" style="font-size:11px;color:#8b6914">' + escHtml(getUpdateStatusText()) + '</span> ';
    about += '<a id="gs-update-link" href="' + escAttr(UPDATE_INSTALL_URL) + '" target="_blank" rel="noopener noreferrer" style="display:none;font-size:11px;color:#c0392b;margin-left:8px">' + escHtml(tt('update_open')) + ' →</a></div>';
    about += '<p style="font-size:13px;margin-bottom:4px">Creato da <strong>' + escHtml(AUTHOR) + '</strong></p>';
    about += '<p style="font-size:12px;color:#888;margin-bottom:12px"><a href="' + escAttr(SITE_URL) + '" target="_blank" style="color:#8b6914">silthersgaming.net</a> | <a href="' + escAttr(PLUGIN_URL) + '" target="_blank" style="color:#8b6914">grepolis.latavernadeglisbronzi.net</a></p>';
    about += '<table style="width:100%;border-collapse:collapse;text-align:left;font-size:12px">';
    about += '<tr><td style="padding:6px 10px;color:#888;width:130px">' + escHtml(tt('server')) + '</td><td style="padding:6px 10px"><strong>' + escHtml(SERVER_ID) + '</strong></td></tr>';
    about += '<tr><td style="padding:6px 10px;color:#888">Fix 1.0.13</td><td style="padding:6px 10px">Rivolta Blu separata da Attacco Rivolta; support outgoing corretto; menu polis meno disturbato.</td></tr>';
    about += '</table>';
    about += '<p style="font-size:10px;color:#aaa;margin-top:12px">' + escHtml(tt('server_note')) + '</p>';
    about += '</div>';

    return '' +
      '<div class="game_header bold"><a href="' + escAttr(PLUGIN_URL) + '" target="_blank" style="color:white">' + escHtml(tt('title')) + ' (v' + escHtml(VERSION) + ')</a></div>' +
      '<ul class="menu_inner gs-stab-nav">' +
      '<li><a class="submenu_link active" data-gs-tab="filters"><span class="left"><span class="right"><span class="middle">' + escHtml(tt('tab_filters')) + '</span></span></span></a></li>' +
      '<li><a class="submenu_link" data-gs-tab="display"><span class="left"><span class="right"><span class="middle">' + escHtml(tt('tab_display')) + '</span></span></span></a></li>' +
      '<li><a class="submenu_link" data-gs-tab="icons"><span class="left"><span class="right"><span class="middle">' + escHtml(tt('tab_icons')) + '</span></span></span></a></li>' +
      '<li><a class="submenu_link" data-gs-tab="about"><span class="left"><span class="right"><span class="middle">' + escHtml(tt('tab_about')) + '</span></span></span></a></li>' +
      '</ul>' +
      '<div class="content">' +
      '<table class="content_category gs-stab-panel visible" data-gs-tab="filters"><tbody>' + filterRows + '</tbody></table>' +
      '<table class="content_category gs-stab-panel" data-gs-tab="display"><tbody>' + displayRows + '</tbody></table>' +
      '<table class="content_category gs-stab-panel" data-gs-tab="icons"><tbody>' + iconRows + '</tbody></table>' +
      about +
      '</div>';
  }

  function bindSettingsEvents(sec, menu, mainC) {
    var link = document.getElementById('gs_settings_link');

    if (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        mainC.querySelectorAll('.section').forEach(function (s) { s.style.display = 'none'; });
        sec.style.display = 'block';
      });
    }

    menu.querySelectorAll('a').forEach(function (a) {
      if (a.id === 'gs_settings_link') return;
      a.addEventListener('click', function () {
        sec.style.display = 'none';
      });
    });

    sec.querySelectorAll('.gs-stab-nav .submenu_link').forEach(function (tab) {
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        sec.querySelectorAll('.gs-stab-nav .submenu_link').forEach(function (t2) { t2.classList.remove('active'); });
        sec.querySelectorAll('.gs-stab-panel').forEach(function (p) { p.classList.remove('visible'); });
        tab.classList.add('active');
        var panelTab = sec.querySelector('.gs-stab-panel[data-gs-tab="' + tab.dataset.gsTab + '"]');
        if (panelTab) panelTab.classList.add('visible');
      });
    });

    sec.querySelectorAll('.checkbox_new[data-gs-f]').forEach(function (cbx) {
      cbx.addEventListener('click', function () {
        var fid = this.dataset.gsF;
        state[fid] = !this.classList.contains('checked');

        if (state[fid]) this.classList.add('checked', 'green');
        else this.classList.remove('checked', 'green');

        saveState();
        syncPanel();
        updateCounter();
        scheduleFilter(50);
      });
    });

    sec.querySelectorAll('.checkbox_new[data-gs-g]').forEach(function (cbx) {
      cbx.addEventListener('click', function () {
        var gk = this.dataset.gsG;
        state.groups[gk] = !this.classList.contains('checked');

        if (state.groups[gk]) this.classList.add('checked', 'green');
        else this.classList.remove('checked', 'green');

        saveState();
        rebuildPanel();
      });
    });

    var langSel = sec.querySelector('#gs-s-lang');
    if (langSel) {
      langSel.addEventListener('change', function () {
        state.lang = this.value === 'en' ? 'en' : 'it';
        saveState();
        rebuildAllUi();
      });
    }

    sec.querySelectorAll('.gs-s-icon').forEach(function (inp) {
      inp.addEventListener('change', function () {
        var id = this.dataset.iconId;
        if (!id || id === 'ext') return;

        var cleaned = normalizeIconUrl(this.value);
        if (cleaned) {
          state.icons[id] = cleaned;
          this.value = cleaned;
        } else {
          delete state.icons[id];
          this.value = '';
        }

        saveState();
        rebuildAllUi();
      });
    });

    var reset = sec.querySelector('#gs-reset-icons');
    if (reset) {
      reset.addEventListener('click', function (e) {
        e.preventDefault();
        state.icons = {};
        saveState();
        rebuildAllUi();
      });
    }
  }

  function rebuildAllUi() {
    var p = document.getElementById('gs-panel');
    var t = document.getElementById('gs-toggle');
    var s = document.getElementById('gs_settings');
    var li = document.getElementById('gs_li');

    if (p) p.remove();
    if (t) t.remove();
    if (s) s.remove();
    if (li) li.remove();

    panel = null;
    inlineBtn = null;

    injectToggle();
    ensurePanel();
    injectSettings();
    applyFilters();
  }

  function syncPanel() {
    FILTERS.forEach(function (f) {
      var cb = document.getElementById('gs-' + f.id);
      if (cb) cb.checked = !!state[f.id];
    });
  }

  function syncSettings() {
    FILTERS.forEach(function (f) {
      var cbx = document.getElementById('gs-s-' + f.id);
      if (!cbx) return;

      if (state[f.id]) cbx.classList.add('checked', 'green');
      else cbx.classList.remove('checked', 'green');
    });
  }

  function boot() {
    injectToggle();
    ensurePanel();
    injectSettings();
    scheduleFilter(100);
    setTimeout(applyFilters, 500);
    setTimeout(applyFilters, 1300);
    checkForGrepoSentryUpdate();

    setInterval(watch, 3000);
    watch();

    console.log('%c[GrepoSentry v' + VERSION + '] Loaded - Server: ' + SERVER_ID, 'color:#ffd780;font-weight:bold;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
