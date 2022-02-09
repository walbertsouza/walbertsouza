function displayFields(form, customHTML) {
	var activity = getValue('WKNumState');

	form.setShowDisabledFields(true); // ajustar campos antes de assumir tarefa
	form.setHidePrintLink(true); // tirar botão imprimir

	if (activity == 3 || activity == 0) {
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1)
				: (today.getMonth() + 1);
		var day = today.getDate() < 10 ? '0' + today.getDate() : today
				.getDate();
		form.setValue('datasolicitacao', year + '-' + month + '-' + day);

		user = getUser(getValue("WKUser"));
		// form.setValue("nomecompleto", user.colleagueName);

		// oculto folhapagamento etapa solicitacao
		form.setVisibleById("folhapagamento", false);

		var funcionario = dadosfunc(user.mail);

		form.setValue("nomecompleto", funcionario.NOME);
		form.setValue("matricula", funcionario.MATRICULA);
		form.setValue("empresa", funcionario.NOMEFIL);
		form.setValue("departamento", funcionario.DESCDEPART);
		form.setValue("cargo", funcionario.FUNCAO);
		form.setValue("idfluigsolicitante", user.id);
		form.setValue("emailsolicitante", user.mail);

		form.setVisibleById("observacaofolha", false);
		form.setVisibleById("div_analisereembolso", false);
		
		
		// data para o proximo processamento
		var dthoje = new Date(); //pego data
		dthoje.setHours(0, 0, 0, 0);

		var dtcorte = new Date();
		dtcorte.setHours(0, 0, 0, 0);
		dtcorte.setDate(13)

		//throw("Data hoje" + dtcorte );
		//teste.setMonth(teste.getMonth()+1)

		if (dthoje > dtcorte) {

			//data para processamento 
			var dtnew = new Date();
			dtnew.setHours(0, 0, 0, 0);
			dtnew.setDate(1)
			dtnew.setMonth(dtnew.getMonth() + 1)

			form.setValue("nextmes",dtnew.toISOString().substr(0,10))
			
		}else{
			
			form.setValue("nextmes", dthoje.toISOString().substr(0,10))
			
		}					
		
	}
	
	//se fila não mostra form
	if (activity == 61) {
		form.setVisibleById("principal", false);
	}else{
		form.setVisibleById("aviso", false);
	}		

	if (form.getValue('tipoocorrencia') != 'educacao' && activity == 35 || activity == 4 || activity == 10 || activity == 39) {
		form.setVisibleById("div_analisereembolso", false);
	}
	
	if (form.getValue('tipoocorrencia') == 'educacao' && activity == 35 || activity == 51) {
		form.setVisibleById("observacaofolha", true);
		form.setVisibleById("div_analisereembolso", true);
	}
	
	if (activity == 43) {
		form.setVisibleById("observacaofolha", false);
	}

}

// Consumo serviço rest
function dadosfunc(email) {

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