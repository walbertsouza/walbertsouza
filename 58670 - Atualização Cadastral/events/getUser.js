/**
 * Retorna os dados do usuario.
 * 
 * @param colleagueId: Matricula do usuario.
 * @returns {User}.
 */
function getUser(colleagueId){
	var constraints = new Array();
	var dataset = null;
	var user = {"colleagueName":""};
	
	constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", colleagueId, colleagueId, ConstraintType.MUST));
	
	dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
	
	if(dataset.rowsCount > 0) {
		user.login = dataset.getValue(0,"login");
		user.colleagueName = dataset.getValue(0,"colleagueName");
		user.mail = dataset.getValue(0,"mail");
		user.id = dataset.getValue(0,"colleaguePK.colleagueId"); 
	}
	else{
		log.error("Usuario nao encontrado para a matricula: "+colleagueId);
		throw("Usuario nao encontrado para a matricula: "+colleagueId);
	}
	
	return user;
}