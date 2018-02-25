import Markdown from 'markdown-it';
import hljs from 'highlightjs';
const md = new Markdown({
	highlight: function (str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return '<pre class="hljs"><code>' +
				hljs.highlight(lang, str, true).value +
				'</code></pre>';
			} catch (__) {}
		}
		return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
	}
});
export default body => {
	return md.render(body);
};