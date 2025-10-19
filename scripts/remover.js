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
			// When testing homepage selectors, remember to test all three popular feeds:
			// 1. Normal    2. Dynamic v1    3. Dynamic v2
			selectors.push(
				"shreddit-feed[reload-url^=\"/svc/shreddit/feeds/home-feed\"]",
				"shreddit-feed[reload-url^=\"/svc/shreddit/feeds/popular-feed\"]",
				"#dynamic-feed-main", // dynamic v1 feed + sort dropdowns
				".main-container:has(> #main-content > #dynamic-feed-main):not(:has(.right-sidebar))", // dynamic v2 feed + sort dropdowns
				"div.my-xs.mx-2xs > shreddit-async-loader", // home + popular sort dropdowns
				"div.my-xs.mx-2xs ~ hr", // line between dropdowns and feed
				"shreddit-gallery-carousel", // popular carousel
				"aside[aria-label=\"Popular Communities\"]",
			)
		if (res.subreddits === undefined || res.subreddits)
			selectors.push(
				"shreddit-feed[reload-url^=\"/svc/shreddit/community-more-posts\"]", // subreddit feed
				"community-highlight-carousel",
				"div.mb-xs.mt-xs > shreddit-async-loader", // subreddit sort dropdowns
			)
		style.innerText = selectors.length > 0
			? selectors.join(",") + "{display:none!important;}"
			: ""
	})
}
