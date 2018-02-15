module.exports = 
[{
	user_id: {
		type: 'int usigned auto_increment'
	},
	userName: {
		type: 'text'
	},
	password: {
		type: 'varchar(10)'
	},
	mobile: {
		type: 'varchar(11)'
	},
	email: {
		type: 'varchar(15)'
	},
	member: {
		type: 'boolean',
		default: '0'
	}
}];