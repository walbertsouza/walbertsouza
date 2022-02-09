function validateForm(form) {

	var CURRENT_STATE = getValue("WKNumState");
	var errorMsg = "";

	if (CURRENT_STATE == 0 || CURRENT_STATE == 3) {
		checkIfIsNotNull(form, "telefone", "Telefone");
		checkIfIsNotNull(form, "tipoocorrencia", "Tipo de ocorrência");
		checkIfIsNotNull(form, "detalhamento", "Detalhamento da movimentação");
	}
	
	if (CURRENT_STATE == 35) {
		checkIfIsNotNull(form, "observacaofolha", "Observação - Folha de Pagamento");
	}
	
	if (CURRENT_STATE == 43) {
		checkIfIsNotNull(form, "valor", "Valor");
		checkIfIsNotNull(form, "nparcela", "Nº da parcela");
	}
}

function checkIfIsNotNull(form, value, field) {
	if (form.getValue(value) == null || form.getValue(value).isEmpty()) {
		throw "O campo '" + field + "' é obrigatório.";
	}
}
