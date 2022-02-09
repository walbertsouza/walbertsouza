function enableFields(form) {
	var activity = getValue('WKNumState');
//	if (activity == 3 || activity == 0) {
//		form.setEnabled('telefone', false);
//	}

	if (activity >= 4) {
		form.setEnabled('telefone', false);
	}
	
	if (activity >= 35) {
		form.setEnabled('tipoocorrencia', false);
		form.setEnabled('detalhamento', false);
	}
	
	if (activity == 4 || activity == 10) {
		form.setEnabled('observacaofolha', false);
		form.setEnabled('tipoocorrencia', false);
		form.setEnabled('detalhamento', false);
	}
	
	if (activity == 35) {
		form.setEnabled('valor', false);
		form.setEnabled('nparcela', false);
	}

	
}
