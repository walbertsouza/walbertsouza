function validateForm(form) {
	// Coleta a atividade atual
	var activity = getValue("WKNumState");
	var campo_obr = [];

	// Atividades
	var inicio = 4;
	var validarDados = 5;
	var validarInformacoes = 11;
	var ajustarInformacoes = 24;
	var tratarErroIntegracao = 19;
	
	if (activity == validarDados) {
		campo_obr.push("txt_nome_completo_dc", "op_estado_civil", "op_sexo", "txt_telefone_celular", "op_cor_raca", "op_deficiencia",
		"op_grau_escolaridade", "txt_email_pessoal", "txt_endereco", "txt_numero", "txt_tipo_logradouro", "txt_estado", "txt_bairro",
		"txt_municipio", "txt_cep", "rd_dados_corretos", "rd_vacina_covid");
	}
	
	if (activity == validarInformacoes) {
		campo_obr.push("rd_informacoes_acordo");
		
		var infoAcordo = form.getValue("rd_informacoes_acordo");
		
		if (infoAcordo == "nao"){
			campo_obr.push("txta_informar_ajuste");
		}
	}
	
	if (activity == ajustarInformacoes) {
		campo_obr.push("txt_nome_completo_dc", "op_estado_civil", "op_sexo", "txt_telefone_celular", "op_cor_raca", "op_deficiencia",
		"op_grau_escolaridade", "txt_email_pessoal", "txt_endereco", "txt_numero", "txt_tipo_logradouro", "txt_estado", "txt_bairro",
		"txt_municipio", "txt_cep", "rd_dados_corretos", "rd_vacina_covid");
	}

    // Array com os campos obrigatorios gerais
	for (var i = 0; i < campo_obr.length; i++) {
		msgvalida(form, campo_obr[i]);
	}
}
/**
 * msgvalida
 * 
 * Funcao que verifica se o campo esta vazio e para sim retorna a mensagem com o
 * nome do campo
 * 
 * @param form
 *            Object - recebe o form
 * @param campo
 *            String - id do campo
 */
function msgvalida(form, campo) {
	console.log("Campo Obrigatório = "+campo)
	if (form.getValue(campo) == null || form.getValue(campo).trim().length() == 0) {
		log.info("\n\n\n========================= CAMPOS OBR ===================================");
		log.info("\n >>> " + form.getValue(campo));
		throw "Campo de preenchimento obrigat&oacute;rio [ " + i18n.translate(campo) + " ]";
	}
}

/**
 * validaCheckbox
 * 
 * Funcao que valida se entre campos Checkbox, pelo menos um está preenchido
 * 
 * @param form
 *            Object - recebe o form
 * @param campo
 *            Array - campos do checkbox
 * @param nomeCheckbox           
 * 			  String - campo com o nome da label do Checkbox
 */
function validaCheckbox(form, campos, nomeCheckbox){
	var valida = false;
	for(var i = 0; i<campos.length; i++){
		if (form.getValue(campos[i]) == "sim")
			valida = true
	}
	
	if(!valida){
		throw "Campo de preenchimento obrigat\u00f3rio [ " + i18n.translate(nomeCheckbox) + " ]";
	}
		
}

/**
 * validaPaiFilho
 * 
 * Funcao que valida campos em tabela PaixFilho
 * 
 * @param form
 *            Object - recebe o form
 * @param tablename
 *            String - nome da tabela
 * @param cmp           
 * 			  Array - campos da tabela paixfilho
 */
function validaPaiFilho(form, tablename, cmp){
	var indexes = form.getChildrenIndexes(tablename);
	
	if(indexes.length>0){
		for (var i = 0; i < indexes.length; i++) {
			for (var a = 0; a < cmp.length; a++) {
				
				var val_cmp = form.getValue(cmp[a] + "___" + indexes[i]);
					
				if (val_cmp == null || val_cmp.trim().length() == 0) {
					throw "Campo de preenchimento obrigat&oacute;rio [ "
							+ i18n.translate(cmp[a]) + " ]";
				}
			}
		}
	}else{
		throw "Campo de preenchimento obrigat&oacute;rio [ " + i18n.translate(cmp[0]) + " ]";
	}
}

// Valida se é Brasil 
function validaPaisBrasil(pais){
	if(pais == "BRA" || pais == "BRB" || pais == "BRI" || pais == "BR" || pais == "CORPORATE") return true;
	else return false;
}