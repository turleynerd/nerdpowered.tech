// Private feedback form: posts into the "Nerd Powered Feedback" Google Form, so responses land in
// Google Forms / Sheets and email Chris. No account needed for visitors.
// Google's formResponse endpoint doesn't send CORS headers, so the request is fire-and-forget
// (mode "no-cors"): we can detect network failures but not Google-side rejections.
(function () {
	var FORM_ACTION =
		"https://docs.google.com/forms/d/e/1FAIpQLSfVJtNS5yyNwOZWvsoJnkj2SQP04wGNbxQ-QAMN3lG7kMhwOQ/formResponse";
	var FORM_VIEW =
		"https://docs.google.com/forms/d/e/1FAIpQLSfVJtNS5yyNwOZWvsoJnkj2SQP04wGNbxQ-QAMN3lG7kMhwOQ/viewform";
	var FIELDS = {
		message: "entry.121709853",
		name: "entry.1691594811",
		email: "entry.2093789047",
		topic: "entry.37121553"
	};

	document.querySelectorAll("form.private-form").forEach(function (form) {
		var status = form.querySelector(".form-status");
		var button = form.querySelector("button[type=submit]");

		form.addEventListener("submit", function (event) {
			event.preventDefault();
			// Honeypot: real visitors never see or fill this field.
			if (form.elements.website && form.elements.website.value) return;

			var body = new URLSearchParams();
			body.append(FIELDS.message, form.elements.message.value.trim());
			body.append(FIELDS.name, form.elements.name.value.trim());
			body.append(FIELDS.email, form.elements.email.value.trim());
			body.append(FIELDS.topic, form.dataset.topic || "General");

			button.disabled = true;
			status.className = "form-status";
			status.textContent = "Sending…";

			fetch(FORM_ACTION, { method: "POST", mode: "no-cors", body: body })
				.then(function () {
					form.reset();
					form.classList.add("sent");
					status.className = "form-status ok";
					status.textContent = "Thanks! Your message was sent.";
				})
				.catch(function () {
					status.className = "form-status error";
					status.innerHTML =
						'Couldn’t send right now. Please try again, or use the <a href="' +
						FORM_VIEW +
						'" target="_blank" rel="noopener">feedback form on Google</a>.';
				})
				.then(function () {
					button.disabled = false;
				});
		});
	});
})();
