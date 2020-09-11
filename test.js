const log = require('./index')

log('this is normal log style\n')
log.info('this is info news')
// 如果拆分多个，则第一个会设置成有背景色的提示
log.success('success', 'this is success log style\n')
// 如果字符串中有{{}}  包裹  包裹内部使用颜色  其他为白色
log.tip('this is {{tip}} log style\n')
log.warn('warn', 'this is {{warn}} ', 'log style\n')
log.xx('xxxx', 'not defined this function or property show this default style\n')
// bold | underline
log.bold('this is bold style\n')

// hex 使用hex 函数 颜色为hex 样式
log.hex('#d43f33')('hex','this is {{hex}} style\n')

// 除此之外  你还可以自定义
log.good = '#CD0074'
log.good(' GOOD ', 'this is {{good}} style')
log.success = 'rgb(120,189,144)'
log.success(' new Info ','success news info')