const moment = require("moment/moment")

const mix = (data) => {
    return data
}

const getDayOfMonth = (data) => {
  return moment(data).format('DD')
}

const getMonth = (data) => {
  let month = moment(data).format('M')
  switch (month){
    case 1:
      return 'JAN'
    case 2:
      return 'FEB'
    case 3:
      return 'MAR'
    case 4:
      return 'APR'
    case 5:
      return 'MAY'
    case 6:
      return 'JUN'
    case 7:
      return 'JUL'
    case 8:
      return 'AUG'
    case 9:
      return 'SEP'
    case 10:
      return 'OCT'
    case 11:
      return 'NOV'
    case 12:
      return 'DEC'
    default:
      return 'JAN'
  }
}


module.exports = 
	(env) => {
		env.addFilter('mix', mix)
		env.addFilter('getDayOfMonth', getDayOfMonth)
		env.addFilter('getMonth', getMonth)
    
    }
