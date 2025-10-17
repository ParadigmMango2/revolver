const style = document.createElement("style")
document.getElementsByTagName("head")[0].appendChild(style)
update()
chrome.storage.onChanged.addListener((changes, _) => {
	if (changes.home || changes.subreddits) update()
})
function update() {
	chrome.storage.local.get(res => {
		const selectors = []
		if (res.home === undefined || res.home)
			selectors.push(
				"shreddit-feed[reload-url^=\"/svc/shreddit/feeds/home-feed\"]",
				"shreddit-feed[reload-url^=\"/svc/shreddit/feeds/popular-feed\"]",
				"shreddit-feed[reload-url^=\"/svc/shreddit/feeds/dynamic-feed\"]",
			)
		if (res.subreddits === undefined || res.subreddits)
			selectors.push(
				"shreddit-feed[reload-url^=\"/svc/shreddit/community-more-posts\"]", // subreddit feed
				"community-highlight-carousel",
			)
		style.innerText = selectors.length > 0
			? selectors.join(",") + "{display:none!important;}"
			: ""
	})
}
