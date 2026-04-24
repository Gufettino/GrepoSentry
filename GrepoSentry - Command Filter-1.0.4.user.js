// ==UserScript==
// @name         GrepoSentry - Command Filter
// @namespace    https://grepolis.latavernadeglisbronzi.net/
// @version      1.0.4
// @description  Filtro ordini avanzato per Grepolis. Filtra attacchi, supporti, rientri, rivolte e conquiste nella panoramica comandi e nel dropdown citta. Creato da Gufettino | SilthersGaming.net
// @author       Gufettino (SilthersGaming.net)
// @include      http://*.grepolis.com/game/*
// @include      https://*.grepolis.com/game/*
// @exclude      view-source://*
// @match        https://*.grepolis.com/game/*
// @updateURL    https://grepolis.latavernadeglisbronzi.net/downloads/GrepoSentry-Command-Filter.meta.js
// @downloadURL  https://grepolis.latavernadeglisbronzi.net/downloads/GrepoSentry-Command-Filter.user.js
// @homepageURL  https://grepolis.latavernadeglisbronzi.net/
// @supportURL   https://grepolis.latavernadeglisbronzi.net/
// @icon         https://grepolis.latavernadeglisbronzi.net/logo.png
// @icon64       https://grepolis.latavernadeglisbronzi.net/logo.png
// @grant        GM_addStyle
// @run-at       document-idle
// @copyright    2026+, grepolis.latavernadeglisbronzi.net | latavernadeglisbronzi.net | silthersgaming.net
// ==/UserScript==

(function () {
  'use strict';

  var VERSION = '1.0.4';
  var AUTHOR = 'Gufettino';
  var SITE = 'SilthersGaming.net';
  var SITE_URL = 'https://silthersgaming.net';
  var PLUGIN_URL = 'https://grepolis.latavernadeglisbronzi.net';
  var COMMUNITY = 'silthersgaming.net | latavernadeglisbronzi.net';
  var COPYRIGHT = '2026+, grepolis.latavernadeglisbronzi.net';
  var OFFICIAL_LOGO_URL = 'https://grepolis.latavernadeglisbronzi.net/logo.png';
  var KOFI_URL = 'https://ko-fi.com/C0C5BUSID';
  var KOFI_IMAGE_URL = 'https://grepolis.latavernadeglisbronzi.net/logokofi.png';

  var SERVER_ID = (function () {
    var m = window.location.hostname.match(/^([a-z]{2}\d+)\./);
    return m ? m[1] : 'default';
  })();

  var STORAGE_KEY = 'greposentry_' + SERVER_ID;

  var LANG = {
    en: {
      title: 'GrepoSentry',
      subtitle: 'Command Filter',
      settings_title: 'GrepoSentry',
      settings_ver: 'Version is up to date',
      tab_filters: 'Filters',
      tab_display: 'Display',
      tab_icons: 'Icons',
      tab_about: 'About',
      language: 'Language',
      lang_en: 'English',
      lang_it: 'Italiano',
      visible_groups: 'Visible groups in panel',
      custom_icons: 'Custom icons',
      icon_placeholder: 'Image URL (empty = emoji)',
      ext_icon: 'Extension icon',
      ext_icon_desc: 'Custom icon for the GrepoSentry button in the command bar and settings',
      save: 'Save',
      saved: 'Settings saved ✓',
      show_all: '✅ Show All',
      hide_all: '❌ Hide All',
      visible: 'Visible',
      total: 'Total commands',
      drag: 'drag',
      server: 'Current server',
      server_note: 'Settings are saved per server and persist across sessions.',
      created_by: 'Created by',
      community: 'Community',
      website: 'Official Website',
      changelog_link: 'Changelog & Updates',
      roadmap_link: 'Roadmap',
      visit_site: 'Visit website',
      copyright: 'Copyright',
      reset_icons: 'Reset all icons to default',
      group_attack: 'Attacks',
      group_support: 'Supports',
      group_abort: 'Returns',
      group_revolt: 'Revolts (Revolt)',
      group_siege: 'Conquests (Siege)',
      attack_out: 'Outgoing Attacks',
      attack_out_desc: 'Hide or show your outgoing attacks',
      attack_in: 'Incoming Attacks',
      attack_in_desc: 'Hide or show incoming enemy attacks',
      support_out: 'Outgoing Supports',
      support_out_desc: 'Hide or show supports you sent to other cities',
      support_in: 'Incoming Supports',
      support_in_desc: 'Hide or show supports arriving at your cities',
      abort: 'Returns / Aborts',
      abort_desc: 'Hide or show troops returning home after cancellation',
      revolt_blue: 'Revolts Active (Blue)',
      revolt_blue_desc: 'Hide or show blue revolts (phase 1 - arising)',
      revolt_red: 'Revolts Active (Red)',
      revolt_red_desc: 'Hide or show red revolts (phase 2 - running)',
      siege: 'Conquests',
      siege_desc: 'Hide or show conquest commands (city takeover)',
      group_show: 'Show this group in the quick filter panel',
      useful_info: 'Useful Info',
      support_project: 'Support the project',
      support_project_desc: 'If you want to support GrepoSentry, you can do it here.',
      support_button_alt: 'Support GrepoSentry on Ko-fi'
    },
    it: {
      title: 'GrepoSentry',
      subtitle: 'Filtro Ordini',
      settings_title: 'GrepoSentry',
      settings_ver: 'La versione e aggiornata',
      tab_filters: 'Filtri',
      tab_display: 'Visualizzazione',
      tab_icons: 'Icone',
      tab_about: 'Info',
      language: 'Lingua',
      lang_en: 'English',
      lang_it: 'Italiano',
      visible_groups: 'Gruppi visibili nel pannello',
      custom_icons: 'Icone personalizzate',
      icon_placeholder: 'URL immagine (vuoto = emoji)',
      ext_icon: 'Icona estensione',
      ext_icon_desc: 'Icona personalizzata per il pulsante GrepoSentry nella barra comandi e nelle impostazioni',
      save: 'Salva',
      saved: 'Impostazioni salvate ✓',
      show_all: '✅ Mostra Tutti',
      hide_all: '❌ Nascondi Tutti',
      visible: 'Visibili',
      total: 'Totale ordini',
      drag: 'trascina',
      server: 'Server attuale',
      server_note: 'Le impostazioni vengono salvate per ogni server e rimangono attive tra le sessioni.',
      created_by: 'Creato da',
      community: 'Community',
      website: 'Sito Web Ufficiale',
      changelog_link: 'Changelog e Aggiornamenti',
      roadmap_link: 'Roadmap',
      visit_site: 'Visita il sito',
      copyright: 'Copyright',
      reset_icons: 'Resetta tutte le icone',
      group_attack: 'Attacchi',
      group_support: 'Supporti',
      group_abort: 'Rientri',
      group_revolt: 'Rivolte (Rivolta)',
      group_siege: 'Conquiste (Assedio)',
      attack_out: 'Attacchi in Uscita',
      attack_out_desc: 'Nascondi o mostra i tuoi attacchi in uscita',
      attack_in: 'Attacchi in Entrata',
      attack_in_desc: 'Nascondi o mostra gli attacchi nemici in arrivo',
      support_out: 'Supporti in Uscita',
      support_out_desc: 'Nascondi o mostra i supporti inviati ad altre citta',
      support_in: 'Supporti in Entrata',
      support_in_desc: 'Nascondi o mostra i supporti in arrivo alle tue citta',
      abort: 'Rientri / Interruzioni',
      abort_desc: 'Nascondi o mostra le truppe in rientro dopo un annullamento',
      revolt_blue: 'Rivolte in Corso (Blu)',
      revolt_blue_desc: 'Nascondi o mostra le rivolte blu (fase 1 - in crescita)',
      revolt_red: 'Rivolte in Corso (Rosse)',
      revolt_red_desc: 'Nascondi o mostra le rivolte rosse (fase 2 - attiva)',
      siege: 'Conquiste',
      siege_desc: 'Nascondi o mostra i comandi di conquista (presa della citta)',
      group_show: 'Mostra questo gruppo nel pannello filtro rapido',
      useful_info: 'Informazioni Utili',
      support_project: 'Supporta il progetto',
      support_project_desc: 'Se vuoi supportare GrepoSentry, puoi farlo qui.',
      support_button_alt: 'Supporta GrepoSentry su Ko-fi'
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
    ext: '🗂️'
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

  function defaultState() {
    var s = { lang: 'en', icons: {}, groups: {} };
    FILTERS.forEach(function (f) { s[f.id] = true; });
    GROUP_KEYS.forEach(function (k) { s.groups[k] = true; });
    return s;
  }

  function loadState() {
    try {
      var raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!raw) return defaultState();

      var s = defaultState();

      FILTERS.forEach(function (f) {
        if (typeof raw[f.id] === 'boolean') s[f.id] = raw[f.id];
      });

      if (raw.icons) {
        s.icons = raw.icons;
        delete s.icons.ext;
      }

      if (raw.groups) {
        GROUP_KEYS.forEach(function (k) {
          if (typeof raw.groups[k] === 'boolean') s.groups[k] = raw.groups[k];
        });
      }

      if (raw.lang) s.lang = raw.lang;
      return s;
    } catch (e) {
      return defaultState();
    }
  }

  function saveState(s) {
    if (s && s.icons) delete s.icons.ext;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  }

  var state = loadState();
  saveState(state);

  function tt(key) {
    var l = LANG[state.lang] || LANG.en;
    return l[key] || LANG.en[key] || key;
  }

  function getIconUrl(id) {
    if (id === 'ext') return OFFICIAL_LOGO_URL;
    if (state.icons[id]) return state.icons[id];
    return '';
  }

  function icon(id) {
    var url = getIconUrl(id);
    if (url) {
      return '<img src="' + url + '" style="width:190px;height:190px;vertical-align:middle;object-fit:contain;" onerror="this.style.display=\'none\';this.nextSibling.style.display=\'inline\'"><span style="display:none">' + (DEFAULT_ICONS[id] || '') + '</span>';
    }
    return DEFAULT_ICONS[id] || '';
  }

  function iconText(id) {
    var url = getIconUrl(id);
    if (url) {
      return '<img src="' + url + '" style="width:16px;height:16px;vertical-align:middle;object-fit:contain;" onerror="this.outerHTML=\'' + (DEFAULT_ICONS[id] || '') + '\'">';
    }
    return DEFAULT_ICONS[id] || '';
  }

  function iconBig(id) {
    var url = getIconUrl(id);
    if (url) {
      return '<img src="' + url + '" style="width:48px;height:48px;object-fit:contain;" onerror="this.outerHTML=\'<span style=font-size:36px>' + (DEFAULT_ICONS[id] || '') + '</span>\'">';
    }
    return '<span style="font-size:36px">' + (DEFAULT_ICONS[id] || '') + '</span>';
  }

  function getCmdType(el) {
    return (el.getAttribute('data-command_type') || el.getAttribute('data-commandtype') || '').toLowerCase();
  }

  function isOutgoing(el) {
    if (el.querySelector('.overview_outgoing')) return true;
    if (el.querySelector('.outgoing')) return true;
    if (el.querySelector('a.game_arrow_delete')) return true;
    if (el.querySelector('.js-delete')) return true;
    var b = el.innerHTML.toLowerCase();
    return b.indexOf('overview_outgoing') !== -1 || b.indexOf(' outgoing') !== -1;
  }

  function isIncoming(el) {
    if (el.querySelector('.overview_incoming')) return true;
    if (el.querySelector('.incoming')) return true;
    if (el.classList.contains('color_highlight')) return true;
    var b = el.innerHTML.toLowerCase();
    return b.indexOf('overview_incoming') !== -1 || b.indexOf(' incoming') !== -1;
  }

  function normalizeText(v) {
    return String(v || '').replace(/\s+/g, ' ').trim().toLowerCase();
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
        self.name = GameData.player.name.trim();
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

  function getCancelableValue(el) {
    var v = el.getAttribute('data-cancelable');
    return v == null ? '' : String(v).trim().toLowerCase();
  }

  function hasIC(el, cls) {
    return el.querySelector('.' + cls) !== null;
  }

  function getBlob(el) {
    return (el.className + ' ' + el.innerHTML).toLowerCase();
  }

  function isCityDropdownIncomingFallback(el, blob) {
    var ct = getCmdType(el);
    var cancelable = getCancelableValue(el);
    var inCityDropdown = !!el.closest('.js-dropdown-item-list, .toolbar_activities_body');
    var hasPlayers = getCommandPlayers(el).length >= 2;

    if (!inCityDropdown) return false;
    if (hasPlayers) return false;
    if (cancelable !== 'null') return false;

    if (ct === 'abort' || hasIC(el, 'abort') || /\babort\b/.test(blob)) return false;

    if (/\battack\b/.test(blob)) return true;
    if (/\bsupport\b/.test(blob)) return true;

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

    if (isCityDropdownIncomingFallback(el, blob)) return 'in';

    var out = isOutgoing(el);
    var inc = isIncoming(el);

    if (inc && !out) return 'in';
    if (out && !inc) return 'out';
    if (inc) return 'in';
    if (out) return 'out';

    return 'out';
  }

  function classify(el) {
    var ct = getCmdType(el);
    if (!ct) return null;

    var dir = getDir(el);
    var b = getBlob(el);

    if (
      ct === 'abort' ||
      hasIC(el, 'abort') ||
      /\babort\b/.test(b)
    ) {
      return 'abort';
    }

    if (ct === 'revolts' || ct.includes('revolt')) {
      return /revolt_running|red/.test(b) ? 'revolt_red' : 'revolt_blue';
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

    if (ct === 'attack_land' || ct === 'attack_sea' || ct === 'attack_spy' || ct === 'farm_attack') {
      return dir === 'out' ? 'attack_out' : 'attack_in';
    }

    if (ct.startsWith('attack') && !ct.includes('takeover') && !ct.includes('conquest')) {
      return dir === 'out' ? 'attack_out' : 'attack_in';
    }

    if (ct === 'support') return dir === 'out' ? 'support_out' : 'support_in';

    if (ct === 'unit_movements') {
      if (/revolt_running|red/.test(b)) return 'revolt_red';
      if (/revolt/.test(b)) return 'revolt_blue';
      if (/support/.test(b) && !/attack/.test(b)) return dir === 'out' ? 'support_out' : 'support_in';
      if (/attack/.test(b)) return dir === 'out' ? 'attack_out' : 'attack_in';
    }

    return null;
  }

  GM_addStyle(
    '#gs-panel{position:fixed;top:100px;right:20px;z-index:10000;background:linear-gradient(180deg,#3a2a1a,#2a1c0e);border:2px solid #8b6914;border-radius:8px;min-width:270px;box-shadow:0 4px 16px rgba(0,0,0,.5);font:12px Verdana,Arial,sans-serif;color:#eedcb3;display:none}' +
    '#gs-panel.gs-visible{display:block}' +
    '#gs-header{background:linear-gradient(180deg,#5c3d1e,#3a2a1a);padding:8px 12px;border-bottom:1px solid #8b6914;border-radius:6px 6px 0 0;font-weight:bold;font-size:13px;color:#ffd780;display:flex;justify-content:space-between;align-items:center;cursor:move}' +
    '#gs-header span{pointer-events:none}#gs-body{padding:8px 10px;max-height:400px;overflow-y:auto}' +
    '.gs-gl{font-size:10px;color:#8b7740;text-transform:uppercase;letter-spacing:.5px;padding:6px 8px 2px;margin-top:2px}' +
    '.gs-row{display:flex;align-items:center;gap:8px;padding:5px 8px;border-radius:4px;cursor:pointer;transition:background .15s;user-select:none}' +
    '.gs-row:hover{background:rgba(255,215,128,.12)}.gs-row input[type="checkbox"]{accent-color:#c9a84c;width:15px;height:15px;cursor:pointer;flex-shrink:0}' +
    '.gs-row label{cursor:pointer;flex:1}.gs-ic{font-size:14px;flex-shrink:0}.gs-sep{height:1px;background:rgba(139,105,20,.2);margin:4px 8px}' +
    '.gs-act{display:flex;gap:6px;padding:8px 10px 10px;border-top:1px solid rgba(139,105,20,.3);margin-top:4px}' +
    '.gs-btn{flex:1;padding:5px 8px;border:1px solid #8b6914;border-radius:4px;background:linear-gradient(180deg,#5c3d1e,#3a2a1a);color:#eedcb3;font-size:11px;cursor:pointer;text-align:center;transition:background .15s,color .15s}' +
    '.gs-btn:hover{background:linear-gradient(180deg,#7a5228,#5c3d1e);color:#ffd780}' +
    '#gs-toggle{position:absolute !important;top:56px !important;right:110px !important;z-index:11;margin:0 !important;width:32px;height:33px;display:block;overflow:visible;cursor:pointer;transition:transform .15s}' +
    '#gs-toggle:hover{transform:scale(1.08)}' +
    '#gs-toggle .gs-toggle-logo-wrap{position:absolute;left:0;top:0;width:32px;height:33px;display:flex;align-items:center;justify-content:center;pointer-events:none}' +
    '#gs-toggle .gs-toggle-logo-wrap img{width:18px !important;height:18px !important;object-fit:contain;display:block}' +
    '#gs-badge{position:absolute;top:-4px;right:-4px;background:#c0392b;color:#fff;font-size:8px;font-weight:bold;border-radius:50%;width:14px;height:14px;display:flex;align-items:center;justify-content:center;line-height:1;z-index:2}' +
    '#gs-badge:empty{display:none}#gs-stats{padding:4px 10px 6px;font-size:10px;color:#a08b60;text-align:center}' +
    'li.js-command-row.gs-hidden{display:none!important}.gs-hidden{display:none!important}' +
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
    '#gs_settings .gs-about-center{text-align:center;padding:30px 10px}'
  );

  function buildPanel() {
    var p = document.createElement('div');
    p.id = 'gs-panel';

    var bHTML = '', has = false;
    GROUP_KEYS.forEach(function (gk) {
      if (!state.groups[gk]) return;
      var gf = FILTERS.filter(function (f) { return f.group === gk; });
      if (has) bHTML += '<div class="gs-sep"></div>';
      bHTML += '<div class="gs-gl">' + tt('group_' + gk) + '</div>';
      gf.forEach(function (f) {
        bHTML += '<div class="gs-row" data-filter="' + f.id + '"><input type="checkbox" id="gs-' + f.id + '"' + (state[f.id] ? ' checked' : '') + '><span class="gs-ic">' + icon(f.id) + '</span><label for="gs-' + f.id + '">' + tt(f.id) + '</label></div>';
      });
      has = true;
    });

    p.innerHTML =
      '<div id="gs-header"><span>' + iconText('ext') + ' ' + tt('title') + '</span><span style="font-size:10px;opacity:.5">' + tt('drag') + '</span></div>' +
      '<div id="gs-body">' + bHTML + '</div>' +
      '<div class="gs-act"><div class="gs-btn" id="gs-all">' + tt('show_all') + '</div><div class="gs-btn" id="gs-none">' + tt('hide_all') + '</div></div>' +
      '<div id="gs-stats"></div>';

    return p;
  }

  var panel = buildPanel();
  document.body.appendChild(panel);

  function rebuildPanel() {
    var vis = panel.classList.contains('gs-visible');
    var old = document.getElementById('gs-panel');
    if (old) old.remove();

    panel = buildPanel();
    document.body.appendChild(panel);

    if (vis) panel.classList.add('gs-visible');
    bindPanelEvents();
    applyFilters();
  }

  function bindPanelEvents() {
    panel.addEventListener('click', function (e) { e.stopPropagation(); });

    panel.querySelectorAll('.gs-row').forEach(function (row) {
      var cb = row.querySelector('input');
      var upd = function () {
        state[row.dataset.filter] = cb.checked;
        saveState(state);
        scheduleFilter();
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

    var a = document.getElementById('gs-all');
    var n = document.getElementById('gs-none');
    if (a) a.addEventListener('click', function () { setAll(true); });
    if (n) n.addEventListener('click', function () { setAll(false); });

    var hdr = document.getElementById('gs-header');
    if (hdr) {
      var dr = false, ox, oy;
      hdr.addEventListener('mousedown', function (e) {
        dr = true;
        var r = panel.getBoundingClientRect();
        ox = e.clientX - r.left;
        oy = e.clientY - r.top;
        e.preventDefault();
      });

      document.addEventListener('mousemove', function (e) {
        if (!dr) return;
        panel.style.left = (e.clientX - ox) + 'px';
        panel.style.top = (e.clientY - oy) + 'px';
        panel.style.right = 'auto';
      });

      document.addEventListener('mouseup', function () {
        dr = false;
      });
    }
  }
  bindPanelEvents();

  function setAll(v) {
    FILTERS.forEach(function (f) { state[f.id] = v; });
    panel.querySelectorAll('input[type="checkbox"]').forEach(function (cb) { cb.checked = v; });
    saveState(state);
    scheduleFilter();
    updateCounter();
    syncSettings();
  }

  var inlineBtn = null;

  function injectToggle() {
    if (document.getElementById('gs-toggle')) return;

    var godsArea = document.querySelector('.gods_area');
    if (!godsArea) return;

    inlineBtn = document.createElement('div');
    inlineBtn.id = 'gs-toggle';
    inlineBtn.className = 'btn_settings circle_button gs-gods-toggle';
    inlineBtn.title = tt('title');
    inlineBtn.innerHTML = '<div class="gs-toggle-logo-wrap">' + iconText('ext') + '</div><span id="gs-badge"></span>';

    godsArea.appendChild(inlineBtn);

    inlineBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      panel.classList.toggle('gs-visible');

      if (panel.classList.contains('gs-visible')) {
        var r = inlineBtn.getBoundingClientRect();
        panel.style.top = (r.bottom + 8) + 'px';
        panel.style.left = 'auto';
        panel.style.right = Math.max(20, window.innerWidth - r.right) + 'px';
      }
    });

    updateCounter();
  }

  document.addEventListener('click', function (e) {
    if (panel.classList.contains('gs-visible') && !panel.contains(e.target) && e.target !== inlineBtn && !(inlineBtn && inlineBtn.contains(e.target))) {
      panel.classList.remove('gs-visible');
    }
  });

  function updateCounter() {
    var c = FILTERS.filter(function (f) { return !state[f.id]; }).length;
    var b = document.getElementById('gs-badge');
    if (b) b.textContent = c || '';
  }

  var isF = false;

  function applyFilters() {
    if (isF) return;
    isF = true;
    try {
      fOverview();
      fCity();
    } finally {
      isF = false;
    }
  }

  function fOverview() {
    var c = document.getElementById('command_overview');
    if (!c) return;

    var rows = c.querySelectorAll('li.js-command-row'), tot = 0, hid = 0;
    rows.forEach(function (li) {
      tot++;
      var tp = classify(li);
      var hide = tp && !state[tp];
      var isH = li.classList.contains('gs-hidden');

      if (hide && !isH) li.classList.add('gs-hidden');
      else if (!hide && isH) li.classList.remove('gs-hidden');

      if (hide) hid++;
    });

    var st = document.getElementById('gs-stats');
    if (st) st.textContent = hid > 0 ? tt('visible') + ': ' + (tot - hid) + ' / ' + tot : tt('total') + ': ' + tot;
  }

  function fCity() {
    document.querySelectorAll('.js-dropdown-item-list > div[data-commandtype],.js-dropdown-item-list > div[data-command_type],.toolbar_activities_body [data-commandtype],.toolbar_activities_body [data-command_type]').forEach(function (el) {
      var tp = classify(el);
      var hide = tp && !state[tp];
      var isH = el.classList.contains('gs-hidden');

      if (hide && !isH) el.classList.add('gs-hidden');
      else if (!hide && isH) el.classList.remove('gs-hidden');
    });
  }

  var fT = null;

  function scheduleFilter() {
    if (fT) clearTimeout(fT);
    fT = setTimeout(applyFilters, 300);
  }

  var cmdObs = null;

  function watch() {
    injectToggle();
    injectSettings();

    var c = document.getElementById('command_overview');
    if (c && !c.dataset.gsW) {
      c.dataset.gsW = '1';
      if (cmdObs) cmdObs.disconnect();
      cmdObs = new MutationObserver(function () {
        scheduleFilter();
      });
      cmdObs.observe(c, { childList: true, subtree: false });
    }

    scheduleFilter();
  }

  var bObs = new MutationObserver(function (m) {
    for (var i = 0; i < m.length; i++) {
      if (m[i].addedNodes.length > 0) {
        watch();
        return;
      }
    }
  });

  bObs.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false
  });

  setInterval(watch, 3000);
  watch();

  function injectSettings() {
    if (document.getElementById('gs_li')) return;

    var menu = document.querySelector('.settings-menu');
    if (!menu) return;

    var altroUl = null, bolds = menu.querySelectorAll('b');
    for (var i = 0; i < bolds.length; i++) {
      var tx = bolds[i].textContent.trim();
      if (tx === 'Altro' || tx === 'Other' || tx === 'Sonstiges' || tx === 'Otros') {
        altroUl = bolds[i].nextElementSibling;
        break;
      }
    }
    if (!altroUl || altroUl.tagName !== 'UL') return;

    var li = document.createElement('li');
    li.id = 'gs_li';
    li.innerHTML = '<span style="font-size:15px;vertical-align:middle;display:inline-block;">' + iconText('ext') + '</span> <a id="gs_settings_link" href="#">' + tt('title') + '</a>';
    altroUl.appendChild(li);

    var mainC = document.querySelector('.settings-container');
    if (!mainC) return;

    var sec = document.createElement('div');
    sec.id = 'gs_settings';
    sec.className = 'player_settings section';
    sec.style.display = 'none';

    var filterRows = '';
    FILTERS.forEach(function (f) {
      filterRows += '<tr><td>' + iconBig(f.id) + '</td><td>' +
        '<div id="gs-s-' + f.id + '" class="checkbox_new' + (state[f.id] ? ' checked green' : '') + '" data-gs-f="' + f.id + '" style="cursor:pointer"><div class="cbx_icon"></div><div class="cbx_caption">' + tt(f.id) + '</div></div>' +
        '<p>' + tt(f.id + '_desc') + '</p></td></tr>';
    });

    var displayRows = '';
    displayRows += '<tr><td><span style="font-size:36px">🌐</span></td><td>' +
      '<div style="font-weight:bold;margin-bottom:4px">' + tt('language') + '</div>' +
      '<select id="gs-s-lang" style="padding:4px 8px;border:1px solid #9e854e;border-radius:3px;font-size:12px;background:#FFEECA">' +
      '<option value="en"' + (state.lang === 'en' ? ' selected' : '') + '>🇬🇧 ' + tt('lang_en') + '</option>' +
      '<option value="it"' + (state.lang === 'it' ? ' selected' : '') + '>🇮🇹 ' + tt('lang_it') + '</option></select></td></tr>';

    displayRows += '<tr><td colspan="2" style="padding-top:12px"><div style="font-weight:bold;margin-bottom:6px">' + tt('visible_groups') + '</div></td></tr>';

    GROUP_KEYS.forEach(function (gk) {
      displayRows += '<tr><td></td><td><div class="checkbox_new' + (state.groups[gk] ? ' checked green' : '') + '" data-gs-g="' + gk + '" style="cursor:pointer"><div class="cbx_icon"></div><div class="cbx_caption">' + tt('group_' + gk) + '</div></div>' +
        '<p>' + tt('group_show') + '</p></td></tr>';
    });

    var iconRows = '';
    FILTERS.forEach(function (f) {
      iconRows += '<tr><td>' + iconBig(f.id) + '</td><td><div style="font-weight:bold;margin-bottom:4px">' + tt(f.id) + '</div>' +
        '<div class="gs-icon-field"><div class="gs-iprev">' + icon(f.id) + '</div><input type="text" class="gs-s-icon" data-icon-id="' + f.id + '" value="' + (state.icons[f.id] || '') + '" placeholder="' + tt('icon_placeholder') + '"></div></td></tr>';
    });

    iconRows += '<tr><td></td><td><a href="#" id="gs-reset-icons" style="color:#c0392b;font-size:11px">' + tt('reset_icons') + '</a></td></tr>';

    sec.innerHTML =
      '<div class="game_header bold"><a href="' + SITE_URL + '" target="_blank" style="color:white">' + tt('title') + ' (v' + VERSION + ')</a>' +
      '<div style="float:right;margin-top:-2px;margin-right:-5px"><span class="grepo_input"><span class="left"><span class="right">' +
      '<select id="gs-s-lang-quick" style="font-size:11px"><option value="en"' + (state.lang === 'en' ? ' selected' : '') + '>EN</option><option value="it"' + (state.lang === 'it' ? ' selected' : '') + '>IT</option></select>' +
      '</span></span></span></div></div>' +
      '<div style="color:#090;margin:4px 0 8px"><span style="font-size:11px">✅ ' + tt('settings_ver') + '</span></div>' +
      '<ul class="menu_inner gs-stab-nav">' +
      '<li><a class="submenu_link active" data-gs-tab="filters"><span class="left"><span class="right"><span class="middle">' + tt('tab_filters') + '</span></span></span></a></li>' +
      '<li><a class="submenu_link" data-gs-tab="display"><span class="left"><span class="right"><span class="middle">' + tt('tab_display') + '</span></span></span></a></li>' +
      '<li><a class="submenu_link" data-gs-tab="icons"><span class="left"><span class="right"><span class="middle">' + tt('tab_icons') + '</span></span></span></a></li>' +
      '<li><a class="submenu_link" data-gs-tab="about"><span class="left"><span class="right"><span class="middle">' + tt('tab_about') + '</span></span></span></a></li></ul>' +
      '<div class="content">' +
      '<table class="content_category gs-stab-panel visible" data-gs-tab="filters"><tbody>' + filterRows + '</tbody></table>' +
      '<table class="content_category gs-stab-panel" data-gs-tab="display"><tbody>' + displayRows + '</tbody></table>' +
      '<table class="content_category gs-stab-panel" data-gs-tab="icons"><tbody>' + iconRows + '</tbody></table>' +
      '<div class="gs-stab-panel gs-about-center" data-gs-tab="about">' +
      '<div style="font-size:60px;margin-bottom:10px">' + icon('ext') + '</div>' +
      '<h2 style="color:#8b6914;margin:0 0 4px">GrepoSentry</h2>' +
      '<p style="font-size:11px;color:#888;margin:0 0 6px">v' + VERSION + '</p>' +
      '<p style="font-size:13px;margin-bottom:4px">' + tt('created_by') + ' <strong>' + AUTHOR + '</strong></p>' +
      '<p style="font-size:12px;color:#888;margin-bottom:16px">' + tt('community') + ': <a href="' + SITE_URL + '" target="_blank" style="color:#8b6914">silthersgaming.net</a> | <a href="https://latavernadeglisbronzi.net" target="_blank" style="color:#8b6914">latavernadeglisbronzi.net</a></p>' +
      '<hr style="margin:0 0 14px;border-color:rgba(139,105,20,.2)">' +
      '<table style="width:100%;border-collapse:collapse;text-align:left;font-size:12px">' +
      '<tr><td style="padding:6px 10px;color:#888;width:140px">' + tt('website') + '</td><td style="padding:6px 10px"><a href="' + PLUGIN_URL + '" target="_blank" style="color:#8b6914;font-weight:600">grepolis.latavernadeglisbronzi.net</a></td></tr>' +
      '<tr><td style="padding:6px 10px;color:#888">' + tt('changelog_link') + '</td><td style="padding:6px 10px"><a href="' + PLUGIN_URL + '/updates.php" target="_blank" style="color:#8b6914">' + tt('visit_site') + ' →</a></td></tr>' +
      '<tr><td style="padding:6px 10px;color:#888">' + tt('roadmap_link') + '</td><td style="padding:6px 10px"><a href="' + PLUGIN_URL + '/roadmap.php" target="_blank" style="color:#8b6914">' + tt('visit_site') + ' →</a></td></tr>' +
      '<tr><td style="padding:6px 10px;color:#888">' + tt('server') + '</td><td style="padding:6px 10px"><strong>' + SERVER_ID + '</strong></td></tr>' +
      '</table>' +
      '<hr style="margin:14px 0;border-color:rgba(139,105,20,.2)">' +
      '<p style="font-size:10px;color:#aaa">' + tt('server_note') + '</p>' +
      '<p style="font-size:9px;color:#666;margin-top:8px">' + tt('copyright') + ': ' + COPYRIGHT + '</p>' +
      '<div style="margin-top:18px;text-align:center">' +
      '<p style="font-size:12px;color:#888;margin:0 0 6px">' + tt('support_project') + '</p>' +
      '<p style="font-size:10px;color:#999;margin:0 0 10px">' + tt('support_project_desc') + '</p>' +
      '<a href="' + KOFI_URL + '" target="_blank" rel="noopener noreferrer">' +
      '<img src="' + KOFI_IMAGE_URL + '" alt="' + tt('support_button_alt') + '" style="border:0;width:220px;max-width:100%;height:auto;object-fit:contain;">' +
      '</a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div style="bottom:-42px;font-weight:bold;position:absolute;width:99%">' +
      '<a href="' + PLUGIN_URL + '" target="_blank" style="font-weight:bold;float:left"><img src="/images/game/ally/founder.png" style="float:left;height:19px;margin:0 5px -3px"><span>' + AUTHOR + '</span></a>' +
      '<span style="font-weight:bold;float:right"><a href="' + PLUGIN_URL + '" target="_blank" style="color:#8b6914">grepolis.latavernadeglisbronzi.net</a></span></div>';

    mainC.appendChild(sec);

    document.getElementById('gs_settings_link').addEventListener('click', function (e) {
      e.preventDefault();
      mainC.querySelectorAll('.section').forEach(function (s) { s.style.display = 'none'; });
      ['gd_settings_container', 'dio_settings_container'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.style.display = 'none';
      });
      sec.style.display = 'block';
      menu.querySelectorAll('.settings-link, a').forEach(function (a) { a.classList.remove('selected'); });
    });

    menu.querySelectorAll('.settings-link, a').forEach(function (a) {
      if (a.id === 'gs_settings_link') return;
      a.addEventListener('click', function () { sec.style.display = 'none'; });
    });

    sec.querySelectorAll('.gs-stab-nav .submenu_link').forEach(function (tab) {
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        sec.querySelectorAll('.gs-stab-nav .submenu_link').forEach(function (t2) { t2.classList.remove('active'); });
        sec.querySelectorAll('.gs-stab-panel').forEach(function (p) { p.classList.remove('visible'); });
        tab.classList.add('active');
        sec.querySelector('.gs-stab-panel[data-gs-tab="' + tab.dataset.gsTab + '"]').classList.add('visible');
      });
    });

    sec.querySelectorAll('.checkbox_new[data-gs-f]').forEach(function (cbx) {
      cbx.addEventListener('click', function () {
        var fid = this.dataset.gsF;
        if (this.classList.contains('checked')) {
          this.classList.remove('checked', 'green');
          state[fid] = false;
        } else {
          this.classList.add('checked', 'green');
          state[fid] = true;
        }
        saveState(state);
        scheduleFilter();
        updateCounter();
        syncPanel();
      });
    });

    sec.querySelectorAll('.checkbox_new[data-gs-g]').forEach(function (cbx) {
      cbx.addEventListener('click', function () {
        var gk = this.dataset.gsG;
        if (this.classList.contains('checked')) {
          this.classList.remove('checked', 'green');
          state.groups[gk] = false;
        } else {
          this.classList.add('checked', 'green');
          state.groups[gk] = true;
        }
        saveState(state);
        rebuildPanel();
      });
    });

    var langSel = sec.querySelector('#gs-s-lang');
    if (langSel) {
      langSel.addEventListener('change', function () {
        state.lang = this.value;
        saveState(state);
        var q = sec.querySelector('#gs-s-lang-quick');
        if (q) q.value = this.value;
      });
    }

    var langQ = sec.querySelector('#gs-s-lang-quick');
    if (langQ) {
      langQ.addEventListener('change', function () {
        state.lang = this.value;
        saveState(state);
        if (langSel) langSel.value = this.value;
      });
    }

    var ri = sec.querySelector('#gs-reset-icons');
    if (ri) {
      ri.addEventListener('click', function (e) {
        e.preventDefault();
        state.icons = {};
        saveState(state);
        sec.querySelectorAll('.gs-s-icon').forEach(function (inp) { inp.value = ''; });
        rebuildPanel();
        refreshToggle();
      });
    }

    sec.querySelectorAll('.gs-s-icon').forEach(function (inp) {
      inp.addEventListener('change', function () {
        var id = this.dataset.iconId;
        if (!id || id === 'ext') return;
        if (this.value.trim()) state.icons[id] = this.value.trim();
        else delete state.icons[id];
        saveState(state);
        rebuildPanel();
        refreshToggle();
      });
    });
  }

  function refreshToggle() {
    var old = document.getElementById('gs-toggle');
    if (old) old.remove();
    inlineBtn = null;
    injectToggle();
  }

  function syncPanel() {
    FILTERS.forEach(function (f) {
      var cb = document.getElementById('gs-' + f.id);
      if (cb) cb.checked = state[f.id];
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

  console.log('%c[GrepoSentry v' + VERSION + '] Loaded - Server: ' + SERVER_ID + ' | ' + AUTHOR + ' @ ' + SITE + ' | ' + PLUGIN_URL, 'color:#ffd780;font-weight:bold;');
})();