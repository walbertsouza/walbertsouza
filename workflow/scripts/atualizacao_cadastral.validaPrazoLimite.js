// Retorna true caso nao tenha ultrapassado o prazo
function validaPrazoLimite(){
	
	// Valida prazo limite para atualizacao cadastral
	
	log.info("[atualizacao_cadastral][validaPrazoLimite] INIT");
	
	//TODO - Ver qual será o usuário admin
	var c1 = DatasetFactory.createConstraint("userSecurityId", "walbert.souza", "walbert.souza", ConstraintType.MUST);

	var constraints = new Array(c1);

	var datasetPrazoLimite = DatasetFactory.getDataset("dsEmissaoCadastralCadastroPrazoLimite", null, constraints, null);
	
	if (!!datasetPrazoLimite && datasetPrazoLimite.rowsCount > 0){
		var dataLimite = String(datasetPrazoLimite.getValue(0, "txt_prazo_limite"));
		
		// Trabalha data limite
		dataLimite = dataLimite.trim().split("/");
		var dataLimite = parseInt(dataLimite[2] + "" + dataLimite[1] + "" + dataLimite[0]);
		
		// Pega data de hoje
		var today = new Date();
		var year = today.getFullYear();
		
		var month = "";
		if (today.getMonth() + 1 < 10) month = '0' + (today.getMonth() + 1);
		else month = (today.getMonth() + 1);
		
		var day = "";
		if (today.getDate() < 10) day = '0' + today.getDate();
		else day = today.getDate();

		var dataAtual = parseInt(year + "" + month + "" + day);
		
		log.info("[atualizacao_cadastral][validaPrazoLimite] Data Limite = " + dataLimite);
		log.info("[atualizacao_cadastral][validaPrazoLimite] Data Atual = " + dataAtual);
		
		if (dataLimite > dataAtual){
			log.info("[atualizacao_cadastral][validaPrazoLimite] Data limite nao ultrapassada");
			return true;
		}
		
		log.info("[atualizacao_cadastral][validaPrazoLimite] Data limite ultrapassada");
		
	}
	
	return false;
}