import fs from "fs-extra"
import fetch from "node-fetch"
import { Font, woff2 } from "fonteditor-core"

/**
 * @param {string} text
 * @returns {Promise<Response>}
 */
async function loadGoogleFont(text) {
  const API = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&text=${text}`
  const css = await (await fetch(API)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (!resource) return

  const res = await fetch(resource[1])
  return res
}

/**
 * @returns {Promise<Response>}
 */
async function loadYakuhanjp() {
  const API = `https://cdn.jsdelivr.net/npm/yakuhanjp@3.4.1/dist/fonts/YakuHanJP/YakuHanJP-Bold.woff2`
  const res = await fetch(API)
  return res
}

/**
 * @param {string} text
 * @returns {void}
 */
async function main(text) {
  const gRes = await loadGoogleFont(text)
  const yRes = await loadYakuhanjp()

  if (!gRes || !yRes) return console.log("Error load fonts!")

  const fontBuffer1 = await gRes.arrayBuffer()
  const fontBuffer2 = await yRes.arrayBuffer()

  woff2.init().then(() => {
    const font1 = Font.create(fontBuffer1, {
      type: "woff2",
      hinting: true,
    })
    const font2 = Font.create(fontBuffer2, {
      type: "woff2",
      hinting: true,
    })

    const glyphs = [...font1.getGlyf(), ...font2.getGlyf()]
    font1.setGlyf(glyphs)

    const newFontBuffer = font1.write({
      type: "otf",
      hinting: true,
    })
    fs.outputFile("./test2/dist/merged-font.otf", newFontBuffer)
  })
}

main("「テスト」！！！").catch(console.error)
