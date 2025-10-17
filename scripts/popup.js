window.addEventListener("load", () =>
	chrome.storage.local.get((res) => {
		const home = document.getElementById("home")
		home.checked = res.home === undefined || res.home
		home.addEventListener("change", (e) =>
			chrome.storage.local.set({ home: e.target.checked })
		)
	})
)
