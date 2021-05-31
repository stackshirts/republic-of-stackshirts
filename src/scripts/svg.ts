import fs from 'fs-extra'
import {
  optimize,
  OptimizeOptions
} from 'svgo'

const svgoOptions: OptimizeOptions = {
  plugins: [
    {
      name: 'removeDimensions',
    },
    {
      name: 'removeXMLNS',
    },
    {
      name: 'cleanupIDs'
    }
  ],
}

// Get pathToSvg from args
const args = process.argv.slice(2)
const pathToSvg = args[0]

const data = fs.readFileSync(pathToSvg, 'utf-8')
const result = optimize(data, svgoOptions)
// {
//     // optimized SVG data string
//     data: '<svg width="10" height="20">test</svg>'
//     // additional info such as width/height
//     info: {
//         width: '10',
//         height: '20'
//     }
// }

fs.writeFileSync(pathToSvg, result.data)
