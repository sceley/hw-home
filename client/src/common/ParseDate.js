import moment from 'moment';
export default date => {
	let d1 = moment(date);
	let d2 = moment();
	if (d2.diff(d1,'years') > 0) {
		return d2.diff(d1,'years') + '年前';
	}
	if (d2.diff(d1, 'months') > 0) {
		return d2.diff(d1, 'months') + '月前';
	}
	if (d2.diff(d1, 'days') > 0) {
		return d2.diff(d1, 'days') + '日前';
	}
	if (d2.diff(d1, 'hours') > 0) {
		return d2.diff(d1, 'hours') + '小时前';
	}
	if (d2.diff(d1, 'mintues') > 0) {
		return d2.diff(d1, 'mintues') + '分前';
	}
	return '刚刚';
};