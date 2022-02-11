function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("id");
	dataset.addColumn("descricao");
	
	dataset.addRow(["BEP","BEP"]);
	dataset.addRow(["CBTUR","CBTUR"]);
	dataset.addRow(["BANCORTUR","BANCORTUR"]);
	dataset.addRow(["BCS","BCS"]);
	dataset.addRow(["BAC","BAC"]);
	dataset.addRow(["INSTITUTO","INSTITUTO"]);
	dataset.addRow(["CSC","CSC"]);
	dataset.addRow(["CRC","CRC"]);
	
	return dataset;

}function onMobileSync(user) {

}