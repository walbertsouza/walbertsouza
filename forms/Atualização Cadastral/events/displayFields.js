function displayFields(form,customHTML){
	var activity = getValue('WKNumState');
	
	form.setValue('htxt_atividade', activity);
	
	
	// Atividades
	var inicio = 4;
	var validarDados = 5;
	var validarInformacoes = 11;
	var ajustarInformacoes = 24;
	var tratarErroIntegracao = 19;
	
	// Array de bloqueio
	var bloqueioZoom = [];
	var naoeditaveis = [];
	var bloqueiaCombo = [];
	var esconder = [];
	var mostrar = [];
	var bloqueio_check = [];
	
	// inicia script
	customHTML.append("<script>");
	
	// Eventos para todas as atividades
	
	var validacaoFOPAG = form.getValue("rd_informacoes_acordo");
	
	if (validacaoFOPAG == "nao") mostrar.push("divInformarAjuste");
	
	// Eventos por atividade
	
	if (activity == inicio || activity == 0){
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1)
				: (today.getMonth() + 1);
		var day = today.getDate() < 10 ? '0' + today.getDate() : today
				.getDate();
		form.setValue('txt_data_solicitacao', day + '/' + month + '/' + year);
		
		esconder.push("divValidacaoDados", "divAlteracaoDados", "divInfoCovid", "divValidacaoFOPAG", "divIntegracaoProtheus");
		
		// caso a validacao esteja como sim, esconde os campos de alteracao de dados
		var validaDadosCorretos = form.getValue("rd_dados_corretos");
		
		if (validaDadosCorretos == "sim"){
			esconder.push("divAlteracaoDados");
		}
	}
	
	if (activity == validarDados) {
	    
	    user = getUser(getValue("WKUser"));
//	    form.setValue("nomecompleto", user.colleagueName);
	 
		var funcionario = dadosfunc(user.mail);
	    
		form.setValue("txt_nome_completo", funcionario.NOME);
		form.setValue("txt_empresa", funcionario.NOMEFIL);
		form.setValue("txt_matricula", funcionario.MATRICULA);
		form.setValue("txt_departamento", funcionario.DESCDEPART);
		form.setValue("txt_cargo", funcionario.FUNCAO);
		form.setValue("htxt_user_id_solicitante", user.id);
		form.setValue("txt_email_corporativo", user.mail);
		
		esconder.push("divAlteracaoDados", "divInfoCovid", "divValidacaoFOPAG", "divIntegracaoProtheus");
	}
	
	if (activity == validarInformacoes){
		esconder.push("divIntegracaoProtheus");
		bloqueio_check.push("rd_dados_corretos_sim", "rd_dados_corretos_nao", "ch_nome_completo", "ch_possui_deficiencia", "ch_estado_civil", "ch_grau_escolaridade", "ch_telefone_celular", "ch_email_pessoal", "ch_cor_raca", 
		"ch_endereco", "rd_vacina_covid_1dose", "rd_vacina_covid_2dose", "rd_vacina_covid_reforco", "rd_vacina_covid_nenhuma");
		naoeditaveis.push("txt_telefone");
		
		// caso a validacao esteja como sim, esconde os campos de alteracao de dados
		var validaDadosCorretos = form.getValue("rd_dados_corretos");
		
		if (validaDadosCorretos == "sim"){
			esconder.push("divAlteracaoDados");
		}
	}
	
	if (activity == ajustarInformacoes){
		esconder.push("divIntegracaoProtheus");
		naoeditaveis.push("txta_informar_ajuste");
		bloqueio_check.push("rd_informacoes_acordo_sim", "rd_informacoes_acordo_nao");
		
		// caso a validacao esteja como sim, esconde os campos de alteracao de dados
		var validaDadosCorretos = form.getValue("rd_dados_corretos");
		
		if (validaDadosCorretos == "sim"){
			esconder.push("divAlteracaoDados");
		}
	}
	
	if (activity == tratarErroIntegracao){
		naoeditaveis.push("txta_informar_ajuste");
		bloqueio_check.push("rd_informacoes_acordo_sim", "rd_informacoes_acordo_nao");
		
		// caso a validacao esteja como sim, esconde os campos de alteracao de dados
		var validaDadosCorretos = form.getValue("rd_dados_corretos");
		
		if (validaDadosCorretos == "sim"){
			esconder.push("divAlteracaoDados");
		}
	}
	
	
	for (var i = 0; i < bloqueioZoom.length; i++) {
//		customHTML.append("$('#" + bloqueioZoom[i] + "').removeAttr('onclick');");
		customHTML.append("$('#" + bloqueioZoom[i] + "').attr('onclick', 'return false');");
	}

	// Marca os campos apenas como readonly
	for (var i = 0; i < naoeditaveis.length; i++) {
		customHTML.append("$('#" + naoeditaveis[i] + "').attr('readonly', true);");
	}

	// Esconder campos
	for (var i = 0; i < esconder.length; i++) {
		customHTML.append("$('#" + esconder[i] + "').hide();");
	}
	
	// Mostrar campos
	for (var i = 0; i < mostrar.length; i++) {
		customHTML.append("$('#" + mostrar[i] + "').show();");
	}

	// Bloqueio os campos de combo
	for (var i = 0; i < bloqueiaCombo.length; i++) {
		customHTML.append("$('#" + bloqueiaCombo[i] + "').attr('readonly', true);");
		customHTML.append("var options = $('#" + bloqueiaCombo[i] + "').children('option:not(:selected)');");
		customHTML.append("options.prop('disabled', true);");
	}
	
	// Bloqueio checkbox
	for ( var i = 0 ; i < bloqueio_check.length; i++)
	{
//		customHTML.append('$("#' + bloqueio_check[i] + '").attr("disabled",true);');
		customHTML.append('$("#' + bloqueio_check[i] + '").attr( "onclick" , "return false");');
	}
	
	// finaliza script
	customHTML.append("</script>");
}

//Consumo serviço rest
function dadosfunc(email) {
	// cosnsumo serviço rest

	var clientService = fluigAPI.getAuthorizeClientService();

	var data = {
		companyId : getValue('WKCompany') + '',
		serviceCode : 'BANCORBRAS_REST',
		endpoint : '/GETDADOSFUNC?CHAVE=c8ZKRwZz8HyPMPQIlziD&email=' + email,
		method : 'get',// 'delete', 'patch', 'put', 'get'
		timeoutService : '100', // segundos
	};
	var vo = clientService.invoke(JSON.stringify(data));

	// trato o retorno
	var objdata = JSON.parse(vo.getResult());

	return objdata;

}