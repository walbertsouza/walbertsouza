$(document).ready(
	function() {

		// MASCARAS DOS CAMPOS
		var behavior = function(val) {
			return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000'	: '(00) 0000-00009';
		}, options = {
			onKeyPress : function(val, e, field, options) {
				field.mask(behavior.apply({}, arguments), options);
			}
		};
		$('input[name="telefone"]').mask(behavior, options);
		$('input[name="valor"]').mask("#0.000.000,00", { reverse: true });
		$('input[name="nparcela"]').mask("#00/00", { reverse: true });
		
		// desabilita os campos select de Dados Cadastrais
		$("#op_estado_civil").attr("disabled", true);
		$("#op_sexo").attr("disabled", true);
		$("#op_cor_raca").attr("disabled", true);
		$("#op_deficiencia").attr("disabled", true);
		$("#op_grau_escolaridade").attr("disabled", true);
});
