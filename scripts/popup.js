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
		const sidebar = document.getElementById("sidebar")
		sidebar.checked = res.sidebar === undefined || res.sidebar
		sidebar.addEventListener("change", (e) =>
			chrome.storage.local.set({ sidebar: e.target.checked })
		)
		const videoEndscreen = document.getElementById("video-endscreen")
		videoEndscreen.checked = res.videoEndscreen === undefined || res.videoEndscreen
		videoEndscreen.addEventListener("change", (e) =>
			chrome.storage.local.set({ videoEndscreen: e.target.checked })
		)
	})
)
