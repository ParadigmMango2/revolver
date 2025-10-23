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
		const rightSidebar = document.getElementById("right-sidebar")
		rightSidebar.checked = res.rightSidebar === undefined || res.rightSidebar
		rightSidebar.addEventListener("change", (e) =>
			chrome.storage.local.set({ rightSidebar: e.target.checked })
		)
		const trendingSearches = document.getElementById("trending-searches")
		trendingSearches.checked = res.trendingSearches === undefined || res.trendingSearches
		trendingSearches.addEventListener("change", (e) =>
			chrome.storage.local.set({ trendingSearches: e.target.checked })
		)
		const videoEndscreen = document.getElementById("video-endscreen")
		videoEndscreen.checked = res.videoEndscreen === undefined || res.videoEndscreen
		videoEndscreen.addEventListener("change", (e) =>
			chrome.storage.local.set({ videoEndscreen: e.target.checked })
		)
		const leftSidebar = document.getElementById("left-sidebar")
		leftSidebar.checked = res.leftSidebar
		leftSidebar.addEventListener("change", (e) =>
			chrome.storage.local.set({ leftSidebar: e.target.checked })
		)
	})
)
