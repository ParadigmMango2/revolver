const styles = []
const shadowHosts = ["reddit-search-large", "reddit-search-small"] // for nesting, order parents before children. if root element is custom, mention it(custom#id, not #id)
injectHead()
injectShadowRoots()
update()
chrome.storage.onChanged.addListener((changes, _) => {
	if (changes.home || changes.subreddits || changes.rightSidebar || changes.trendingSearches || changes.videoEndscreen || changes.leftSidebar) update()
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
				"div.my-xs.mx-2xs + hr:not(:has(+ shreddit-feed[reload-url^=\"/svc/shreddit/community-more-posts/\"]))", // line between dropdowns and feed
				"shreddit-gallery-carousel", // popular carousel
				"aside[aria-label=\"Popular Communities\"]",
			)
		if (res.subreddits === undefined || res.subreddits)
			selectors.push(
				"shreddit-feed[reload-url^=\"/svc/shreddit/community-more-posts\"]", // subreddit feed
				"community-highlight-carousel",
				"div.mb-xs.mt-xs > shreddit-async-loader", // subreddit sort dropdowns
				"div.my-xs.mx-2xs + hr:has(+ shreddit-feed[reload-url^=\"/svc/shreddit/community-more-posts/\"])", // line between dropdowns and feed
			)
		if (res.rightSidebar === undefined || res.rightSidebar)
			selectors.push(
				"aside[aria-label=\"Related Posts Section\"]",
				"ul:has(> li[id^=\"rr-trending-post\"])", // trending posts content
				"h6:has(+ ul > li[id^=\"rr-trending-post\"])", // trending posts header
				"hr:has(+ h6 + ul > li[id^=\"rr-trending-post\"])", // trending posts hr
				"div:has(> ul > li > a[href^=\"https://www.reddit.com/posts/\"])", // top posts section
				"#answers-suggested-queries-m3", // reddit answers queries
			)
		if (res.trendingSearches === undefined || res.trendingSearches)
			selectors.push(
				"#reddit-trending-searches-partial-container",
				"div:has(+ #reddit-trending-searches-partial-container)",
			)
		if (res.videoEndscreen === undefined || res.videoEndscreen)
			selectors.push(
				".overlay-recommendations", // video suggestions
				".overlay-header", // video endscreen header
			)
		if (res.leftSidebar)
			selectors.push(
				"flex-left-nav-container",
			)
		styles.forEach((style) => {
			style.innerText = selectors.length > 0
				? selectors.join(",") + "{display:none!important;}"
				: ""
		})
	})
}

function injectHead() {
	const style = document.createElement("style")
	document.getElementsByTagName("head")[0].appendChild(style)
	styles.push(style)
}

// Currently only works on custom elements
function injectShadowRoots() {
	shadowHosts.forEach((shadowHost) => {
		const style = document.createElement("style")
		customElements.whenDefined(shadowHost).then(() => {
			document.querySelector(shadowHost).shadowRoot.appendChild(style)
		})
		styles.push(style)
	})
}
