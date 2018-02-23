import Markdown from 'markdown-it';
const md = new Markdown();
export default body => {
	return md.render(body);
};