function inputFields(form) {
	if (form
			&& form.getValue("date0")
			&& form.getValue("date0").match(
					"^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$")) {
		var split = form.getValue("date0").split('/');
		form.setValue("date0", split[2] + '-' + split[1] + '-' + split[0]);
	}
}