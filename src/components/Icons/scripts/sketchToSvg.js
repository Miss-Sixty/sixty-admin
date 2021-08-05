const fs = require('fs-extra')
const path = require('path')
const shell = require('shelljs')

const svgDir = path.join(__dirname, '../sketchSvg')
const sketch = path.join(__dirname, '../../../assets/sketch/icons.sketch')
const SKETCH_TOOL_DIR = '/Applications/Sketch.app/Contents/Resources/sketchtool/bin/sketchtool'
fs.removeSync(svgDir)

// extract svg from sketch
// should install sketchtool first
// install guide: https://developer.sketchapp.com/guides/sketchtool/
//导出切片 svg格式
shell.exec(`${SKETCH_TOOL_DIR} export slices --formats=svg --overwriting=YES --save-for-web=YES --output=${svgDir} ${sketch}`)
