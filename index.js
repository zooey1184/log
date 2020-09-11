/**
 * log 函数
 * log[t[i]] => log.info
 * exp: 
 * log.info('error', 'hello', 'world') => error:有背景色 hello 合在error第一行 后面每个都是一行
 * log.warn('warn message'): 无背景色 字体颜色为warn
 * log.tip('this is {{tip}} message') => 包裹在{{}} 里面的字体颜色为设置tip的颜色
 * error  会以error流输出  其他都是log standout 输出
 */
const chalk = require('chalk');
const log = console.log;
const err = console.error

const chalkType = {
	info: 'blue',
	wran: 'yellow',
	warn: 'yellow',
	error: 'red',
	success: 'green',
  tip: 'cyan',
  bold: 'bold',
  underline: 'underline'
}
const excludeBG = ['underline', 'bold']

function useMustache(_type, content, c, opts) {
  const type = _type
  let chalkFn = chalk[type]
  if (type === 'hex' || type === 'rgb') {
    if (excludeBG.includes(opts)) {
      chalkFn = chalk[type](c)[opts]
    } else {
      chalkFn = chalk[type](c)
    }
  }
  
  if (typeof content === 'object' && content.length) {
    if (content.join('').match(/\{\{[^}]*\}\}/g)) {
      return content.join('').replace(/\{\{[^}]*\}\}/g, ll => {
        const t1 = ll.replace(/[\{\{|\}\}]/g, '')
        return chalkFn(t1)
      })
    } else {
      return chalkFn(content.join(' '))
    }
  } else {
    if (content.match(/\{\{[^}]*\}\}/g)) {
      const alog = content.replace(/\{\{[^}]*\}\}/g, ll => {
        const t1 = ll.replace(/[\{\{|\}\}]/g, '')
        return chalkFn(t1)
      })
      return alog
    } else {
      return chalkFn(content)
    }
  }
}

function _hex(type, c, content, opts) {
  if (content.length > 1) {
    const [title, ...last] = content
    if (opts && excludeBG.includes(opts)) {
      log(chalk.bgHex(c)(title), useMustache(type, last, c, opts))
    } else {
      log(chalk.bgHex(c)(title), useMustache(type, last, c))
    }
  } else {
    log(useMustache(type, content[0], c))
  }
}

const proxy = new Proxy(log, {
  get(t, i) {
    if (t[i]) {
      return function () {
        let args = Array.from(arguments)
        if (t[i].match(/rgb/)) {
          _hex('rgb', t[i], args)
        } else if (t[i].match(/^#/)) {
          _hex('hex', t[i], args)
        }
      }
    }
    if (i in chalkType) {
      return function () {
        let args = Array.from(arguments)
        let type = chalkType[i]
        const logfn = type === 'error' ? err : log

        if(args.length>1) {
          let [title, ...last] = args
          let bg = 'bg'+ type.replace(/\b(\w)|\s(\w)/g, function(m){
            return m.toUpperCase();
          });
          const BG = excludeBG.includes(type) ? type : bg
          const color = excludeBG.includes(type) ? 'cyanBright' : 'black'
          logfn(chalk[BG][color](` ${title.toUpperCase()} `), useMustache(type, last))
        } else {
          logfn(useMustache(type, args[0]))
        }
      }
    } else {
      if (i === 'hex' || i === 'rgb') {
        return function() {
          const t = Array.from(arguments)[0]
          return function() {
            _hex(i, t, Array.from(arguments))
          }
        }
      }
      // 默认 白底黑字 || 白字
      return function () {
        let args = Array.from(arguments)
        if(args.length>1) {
          let [title, ...last] = args
          log(chalk.bgWhite.black(` ${title.toUpperCase()} `), chalk.white(last.join(' ')))
        } else {
          log(args[0])
        }
      }
    }
  }
})

module.exports = proxy