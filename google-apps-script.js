// ============================================
// GOOGLE APPS SCRIPT - PLANILHA DE LEADS
// ============================================
//
// Colunas esperadas na planilha:
// A: Data/Hora
// B: Nome
// C: Cidade
// D: Telefone/WhatsApp
// E: WhatsApp
// F: Comunidade
// G: Email
// H: Debug temporário
//
// IMPORTANTE:
// Depois de colar no Apps Script, salve e publique em:
// Implantar > Gerenciar implantações > lápis > Versão: Nova versão > Implantar
// ============================================

var SPREADSHEET_ID = '1fUS4fvZwPWBoY4OujYEcJf0LZ1jridqnsobv_mKln1U';
var SHEET_NAME = ''; // Se quiser fixar a aba, coloque o nome exato aqui.
var VERSION = 'LEADS_ORIGEM_EMAIL_DEBUG_2026_07_14_001';

function getLeadsSheet() {
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  return SHEET_NAME
    ? spreadsheet.getSheetByName(SHEET_NAME)
    : spreadsheet.getSheets()[0];
}

function doGet(e) {
  return handleLeadRequest(e);
}

function doPost(e) {
  return handleLeadRequest(e);
}

function handleLeadRequest(e) {
  try {
    var params = collectParams(e);

    var nome = getParam(params, ['nome', 'Nome', 'name']);
    var cidade = getParam(params, ['cidade', 'Cidade', 'city']);
    var whatsapp = getParam(params, ['whatsapp', 'WhatsApp', 'telefone', 'phone']);
    var email = getParam(params, ['email', 'Email', 'e-mail', 'mail']);
    var origemOriginal = getParam(params, ['origem', 'Origem', 'source', 'origemDoClique']);
    var origem = normalizeText(origemOriginal);

    var origemWhatsapp = origem.indexOf('whatsapp') !== -1 || origem.indexOf('whats') !== -1
      ? 'WhatsApp'
      : '';

    var origemComunidade = origem.indexOf('comunidade') !== -1 || origem.indexOf('community') !== -1 || origem.indexOf('grupo') !== -1
      ? 'Comunidade'
      : '';

    var debug = JSON.stringify({
      version: VERSION,
      origemRecebida: origemOriginal,
      emailRecebido: email,
      chavesRecebidas: Object.keys(params),
      params: params
    });

    var sheet = getLeadsSheet();
    if (!sheet) {
      throw new Error('Aba da planilha não encontrada. Confira SHEET_NAME.');
    }

    sheet.getRange(sheet.getLastRow() + 1, 1, 1, 8).setValues([[
      new Date(),          // A: Data/Hora
      nome,                // B: Nome
      cidade,              // C: Cidade
      whatsapp,            // D: Telefone/WhatsApp digitado
      origemWhatsapp,      // E: WhatsApp
      origemComunidade,    // F: Comunidade
      email,               // G: Email
      debug                // H: Debug temporário
    ]]);

    return jsonResponse({
      status: 'success',
      version: VERSION,
      recebido: {
        nome: nome,
        cidade: cidade,
        whatsapp: whatsapp,
        origemOriginal: origemOriginal,
        origemWhatsapp: origemWhatsapp,
        origemComunidade: origemComunidade,
        email: email,
        chavesRecebidas: Object.keys(params)
      }
    });

  } catch (error) {
    return jsonResponse({
      status: 'error',
      version: VERSION,
      message: error.toString()
    });
  }
}

function collectParams(e) {
  var params = {};

  if (e && e.parameter) {
    mergeParams(params, e.parameter);
  }

  if (e && e.parameters) {
    Object.keys(e.parameters).forEach(function(key) {
      var value = e.parameters[key];
      params[key] = Array.isArray(value) ? String(value[0] || '') : String(value || '');
    });
  }

  if (e && e.queryString) {
    mergeParams(params, parseQueryString(e.queryString));
  }

  if (e && e.postData && e.postData.contents) {
    mergeParams(params, parseQueryString(e.postData.contents));
  }

  return params;
}

function mergeParams(target, source) {
  Object.keys(source || {}).forEach(function(key) {
    if (target[key] === undefined || target[key] === '') {
      target[key] = String(source[key] || '');
    }
  });
}

function getParam(params, names) {
  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    if (params[name] !== undefined && params[name] !== null && String(params[name]).trim() !== '') {
      return String(params[name]).trim();
    }
  }
  return '';
}

function parseQueryString(query) {
  var out = {};
  String(query || '').split('&').forEach(function(pair) {
    if (!pair) return;
    var parts = pair.split('=');
    var key = decodeURIComponent(String(parts.shift() || '').replace(/\+/g, ' '));
    var value = decodeURIComponent(String(parts.join('=') || '').replace(/\+/g, ' '));
    if (key) out[key] = value;
  });
  return out;
}

function normalizeText(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
