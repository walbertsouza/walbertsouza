$(document).ready(
	function() {
		
		// TODO - desabilitar
		$("#htxt_usuario_solicitacao").val("walbert.souza")
		
		var atividade = $("#htxt_atividade").val();
		
		// Atividades
		var inicio = 4;
		var validarDados = 5;
		var validarInformacoes = 11;
		var ajustarInformacoes = 24;
		var tratarErroIntegracao = 19;

		// MASCARAS DOS CAMPOS
		var behavior = function(val) {
			return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000'	: '(00) 0000-00009';
		}, options = {
			onKeyPress : function(val, e, field, options) {
				field.mask(behavior.apply({}, arguments), options);
			}
		};
		$('input[name="txt_telefone"]').mask(behavior, options);
//		$('input[name="valor"]').mask("#0.000.000,00", { reverse: true });
//		$('input[name="nparcela"]').mask("#00/00", { reverse: true });
		
		// desabilita os campos select de Dados Cadastrais
		var arrCombo = ["op_estado_civil", "op_sexo", "op_cor_raca", "op_deficiencia", "op_grau_escolaridade"];

		for (var i = 0; i < arrCombo.length; i++){
			bloqueiaCombo(arrCombo[i]);
		}
		
		if (atividade == ajustarInformacoes || atividade == tratarErroIntegracao){
			// manipula campos do quadro alteracao de dados
			var arrCamposHabilitar = ["ch_nome_completo", "ch_possui_deficiencia", "ch_estado_civil", "ch_grau_escolaridade", "ch_telefone_celular", 
			"ch_email_pessoal", "ch_cor_raca", "ch_endereco"];
			
			for (var i = 0; i < arrCamposHabilitar.length; i++){
				habilitarAlteracao(arrCamposHabilitar[i]);
			}
		}
});

function validacaoDados(){
	var validacao = document.getElementById("rd_dados_corretos_sim").checked;
	
	// se selecionar nao
	if (!validacao) {
		$("#divAlteracaoDados").show();
		$("#divInfoCovid").show();
//		window.location.href = "#divAlteracaoDados";
	}else{
		$("#divAlteracaoDados").hide();
		$("#divInfoCovid").show();
//		window.location.href = "#divInfoCovid";
	}
}

function habilitarAlteracao(id){
	
	// MASCARAS DOS CAMPOS
	var behavior = function(val) {
		return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000'	: '(00) 0000-00009';
	}, options = {
		onKeyPress : function(val, e, field, options) {
			field.mask(behavior.apply({}, arguments), options);
		}
	};
	
	var validacao = document.getElementById(id).checked;

	if (id == "ch_nome_completo") $("#txt_nome_completo_dc").attr("readonly", !validacao);
	
	else if (id == "ch_possui_deficiencia") {
		var campo = "op_deficiencia";
		if (validacao) habilitaCombo(campo);
		else bloqueiaCombo(campo);
	}
	
	else if (id == "ch_estado_civil") {
		var campo = "op_estado_civil";
		if (validacao) habilitaCombo(campo);
		else bloqueiaCombo(campo);
	}
	
	else if (id == "ch_grau_escolaridade") {
		var campo = "op_grau_escolaridade";
		if (validacao) habilitaCombo(campo);
		else bloqueiaCombo(campo);
	}
	
	else if (id == "ch_telefone_celular") {
		$("#txt_telefone_celular").attr("readonly", !validacao);
		$('input[name="txt_telefone_celular"]').mask(behavior, options);
	}
	
	else if (id == "ch_email_pessoal") $("#txt_email_pessoal").attr("readonly", !validacao);
	
	else if (id == "ch_cor_raca") {
		var campo = "op_cor_raca";
		if (validacao) habilitaCombo(campo);
		else bloqueiaCombo(campo);
	}
	
	else if (id == "ch_endereco") {
		$("#txt_endereco").attr("readonly", !validacao);
		$("#txt_numero").attr("readonly", !validacao);
		$("#txt_tipo_logradouro").attr("readonly", !validacao);
		$("#txt_estado").attr("readonly", !validacao);
		$("#txt_bairro").attr("readonly", !validacao);
		$("#txt_municipio").attr("readonly", !validacao);
		$("#txt_cep").attr("readonly", !validacao);
		$('input[name="txt_cep"]').mask("00000-000", { reverse: true });
	}
	
}

function validacaoFOPAG(){
	var validacao = document.getElementById("rd_informacoes_acordo_sim").checked;
	
	if (validacao) $("#divInformarAjuste").hide();
	else $("#divInformarAjuste").show();
}

function bloqueiaCombo(campo){
	$("#" + campo).attr('readonly', true);
	var options = $("#" + campo).children('option:not(:selected)');
	options.prop('disabled', true);
}

function habilitaCombo(campo){
	$("#" + campo).attr('readonly', false);
	var options = $("#" + campo).children('option:not(:selected)');
	options.prop('disabled', false);
}