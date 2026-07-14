// ============================================
// GOOGLE APPS SCRIPT - PLANILHA DE LEADS
// ============================================
// 
// INSTRUÇÕES:
// 1. Abra Google Sheets (planilhas.google.com)
// 2. Abra a planilha
// 3. Vá em Extensões > Apps Script
// 4. Cole TODO este código
// 5. Salve (Ctrl+S)
// 6. Clique em Executar > doGet (para autorizar)
// 7. Autorize quando pedir
// 8. Implante > Nova implantação
// 9. Tipo: Aplicativo da Web
// 10. Quem tem acesso: Qualquer pessoa
// 11. Clique em Implantar
// 12. Copie a URL
//
// ============================================

var SPREADSHEET_ID = '1fUS4fvZwPWBoY4OujYEcJf0LZ1jridqnsobv_mKln1U';

function getLeadsSheet() {
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  return spreadsheet.getSheets()[0];
}

function doGet(e) {
  try {
    var params = e && e.parameter ? e.parameter : {};

    // Pega os parâmetros da URL/formulário
    var nome = (params.nome || '').trim();
    var cidade = (params.cidade || '').trim();
    var whatsapp = (params.whatsapp || '').trim();
    var email = (params.email || '').trim();
    var origem = (params.origem || '').trim().toLowerCase();

    var origemWhatsapp = origem.indexOf('whatsapp') !== -1 ? 'WhatsApp' : '';
    var origemComunidade = origem.indexOf('comunidade') !== -1 ? 'Comunidade' : '';
    
    // Abre a planilha correta
    var sheet = getLeadsSheet();
    
    // Adiciona uma nova linha com os dados, explicitamente nas colunas A:G
    sheet.getRange(sheet.getLastRow() + 1, 1, 1, 7).setValues([[
      new Date(),          // A: Data/Hora
      nome,                // B: Nome
      cidade,              // C: Cidade
      whatsapp,            // D: Telefone/WhatsApp digitado
      origemWhatsapp,      // E: Origem WhatsApp
      origemComunidade,    // F: Origem Comunidade
      email                // G: Email opcional
    ]]);
    
    // Retorna sucesso
    return ContentService.createTextOutput(
      JSON.stringify({ "status": "success", "message": "Dados salvos com sucesso!" })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Retorna erro
    return ContentService.createTextOutput(
      JSON.stringify({ "status": "error", "message": error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  return doGet(e);
}