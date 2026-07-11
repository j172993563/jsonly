// initial
const styleDom = document.creatElement("style")
styleDom.innerHTML = `
#container .row:first-child {
	display: none;
}
`
document.head.appendChild(styleDom)