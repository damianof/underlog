# underlog

[![npm version](https://badge.fury.io/js/underlog.svg)](https://badge.fury.io/js/underlog)

Logger that can support different clients (Browser, Node, custom, etc)

# StdErrTransport Default color styles
{
  log: '0;1;37m', // white, bold
  highlight: '7;1;36m', // cyan background, bold
  debug: '0;1;34m', // blue, bold
  info: '0;1;32m', // green, bold
  warn: '0;1;33m', // yellow, bold
  error: '0;1;31m' // red, bold
}

# Terminal Color Reference (this values can be used for the levelStyles param for the StdErrTransport)
# (please note that you can also provide more complex values like '0;1;37m' to define bg, bold or other attributes)
Reset: '0m'
Bright: '1m'
Dim: '2m'
Underscore: '4m'
Reverse: '7m'

FgBlack: '30m'
FgRed: '31m'
FgGreen: '32m'
FgYellow: '33m'
FgBlue: '34m'
FgMagenta: '35m'
FgCyan: '36m'
FgWhite: '37m'

BgBlack: '40m'
BgRed: '41m'
BgGreen: '42m'
BgYellow: '43m'
BgBlue: '44m'
BgMagenta: '45m'
BgCyan: '46m'
BgWhite: '47m'

