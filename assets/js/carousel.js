// Featured carousel on the home page: each slide plays a clip of its demo video
// (data-start..data-end seconds), then the carousel moves on. Pauses on hover/focus, when
// off screen or in a background tab, and never auto-plays for prefers-reduced-motion.
(function () {
	var root = document.getElementById("featured-carousel");
	if (!root) return;
	var slides = [].slice.call(root.querySelectorAll(".slide"));
	var dots = [].slice.call(root.querySelectorAll(".carousel-dot"));
	var toggle = root.querySelector(".carousel-toggle");
	var count = slides.length;
	var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	var index = 0;
	var userPaused = reduceMotion;
	var hovering = false;
	var onScreen = true;
	var stallTimer = null;
	var STALL_MS = 15000; // if a clip can't load or play, move on anyway

	function videoOf(i) {
		return slides[i].querySelector("video");
	}
	function clip(v) {
		var start = parseFloat(v.dataset.start) || 0;
		var end = parseFloat(v.dataset.end) || 0;
		return { start: start, end: end > start ? end : Infinity };
	}
	function shouldPlay() {
		return !userPaused && !hovering && onScreen && !document.hidden;
	}

	// Videos carry data-src so only the slide being shown (and the next one, just before its
	// turn) downloads.
	function load(i) {
		var v = videoOf(i);
		if (!v.getAttribute("src")) {
			v.src = v.dataset.src;
			v.load();
		}
		return v;
	}

	function setProgress(p) {
		dots.forEach(function (d, i) {
			d.style.setProperty("--p", i === index ? String(Math.max(0, Math.min(1, p))) : "0");
		});
	}

	function sync() {
		var v = load(index);
		var c = clip(v);
		clearTimeout(stallTimer);
		if (!shouldPlay()) {
			v.pause();
			return;
		}
		var begin = function () {
			if (v !== videoOf(index)) return;
			if (v.currentTime < c.start || v.currentTime >= c.end) v.currentTime = c.start;
			var p = v.play();
			if (p && p.catch) p.catch(function () {});
		};
		if (v.readyState >= 1) begin();
		else v.addEventListener("loadedmetadata", begin, { once: true });
		stallTimer = setTimeout(function () {
			if (shouldPlay()) show(index + 1);
		}, STALL_MS);
	}

	function show(i) {
		index = ((i % count) + count) % count;
		slides.forEach(function (s, k) {
			var active = k === index;
			s.classList.toggle("is-active", active);
			s.setAttribute("aria-hidden", active ? "false" : "true");
			if ("inert" in s) s.inert = !active;
			if (!active) videoOf(k).pause();
		});
		dots.forEach(function (d, k) {
			if (k === index) d.setAttribute("aria-current", "true");
			else d.removeAttribute("aria-current");
		});
		// Always start a slide from the top of its clip.
		var v = load(index);
		if (v.readyState >= 1) v.currentTime = clip(v).start;
		setProgress(0);
		sync();
	}

	slides.forEach(function (s, i) {
		var v = videoOf(i);
		v.addEventListener("timeupdate", function () {
			if (i !== index) return;
			var c = clip(v);
			var span = (isFinite(c.end) ? c.end : v.duration || 0) - c.start;
			var p = span > 0 ? (v.currentTime - c.start) / span : 0;
			setProgress(p);
			if (p > 0.45 && count > 1) load((index + 1) % count); // warm up the next clip
			if (v.currentTime >= c.end && !v.paused) show(index + 1);
		});
		v.addEventListener("ended", function () {
			if (i === index) show(index + 1);
		});
	});

	dots.forEach(function (d, i) {
		d.addEventListener("click", function () {
			show(i);
		});
	});
	root.querySelector(".carousel-prev").addEventListener("click", function () {
		show(index - 1);
	});
	root.querySelector(".carousel-next").addEventListener("click", function () {
		show(index + 1);
	});

	function renderToggle() {
		toggle.setAttribute("aria-pressed", userPaused ? "true" : "false");
		toggle.setAttribute("aria-label", userPaused ? "Play the slideshow" : "Pause the slideshow");
		toggle.classList.toggle("is-paused", userPaused);
	}
	toggle.addEventListener("click", function () {
		userPaused = !userPaused;
		renderToggle();
		sync();
	});

	// Pause while someone is reading or interacting with a slide.
	var stage = root.querySelector(".carousel-slides");
	stage.addEventListener("pointerenter", function (e) {
		if (e.pointerType === "touch") return;
		hovering = true;
		sync();
	});
	stage.addEventListener("pointerleave", function () {
		hovering = false;
		sync();
	});
	stage.addEventListener("focusin", function () {
		hovering = true;
		sync();
	});
	stage.addEventListener("focusout", function () {
		hovering = false;
		sync();
	});
	document.addEventListener("visibilitychange", sync);
	if ("IntersectionObserver" in window) {
		new IntersectionObserver(
			function (entries) {
				onScreen = entries[0].isIntersecting;
				sync();
			},
			{ threshold: 0.25 }
		).observe(root);
	}

	renderToggle();
	show(0);
})();
