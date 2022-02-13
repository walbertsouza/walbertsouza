function displayFields(form,customHTML){
	var activity = getValue('WKNumState');
	
	if (activity == 4 || activity == 0) {
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1)
				: (today.getMonth() + 1);
		var day = today.getDate() < 10 ? '0' + today.getDate() : today
				.getDate();
		form.setValue('txt_data_solicitacao', day + '/' + month + '/' + year);
	    
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
	}
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