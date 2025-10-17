window.addEventListener("load", () =>
	chrome.storage.local.get((res) => {
		const home = document.getElementById("home")
		home.checked = res.home === undefined || res.home
		home.addEventListener("change", (e) =>
			chrome.storage.local.set({ home: e.target.checked })
		)
		const subreddits = document.getElementById("subreddits")
		subreddits.checked = res.subreddits === undefined || res.subreddits
		subreddits.addEventListener("change", (e) =>
			chrome.storage.local.set({ subreddits: e.target.checked })
		)
	})
)
