const puppeteer = require('puppeteer')
require('dotenv').config()
const fsSync = require('fs')
const path = require('path')
const { Auth, GetData, readCookies } = require('../utils/service.http')
const settings = require('../utils/http.settings')

async function startParse () {
    const browser = await puppeteer.launch(settings)
    const page = await browser.newPage()
    try {
        const pathCookie = path.resolve(__dirname, '..', './cookies.json')

        if (!fsSync.existsSync(pathCookie)) {
            await Auth(browser, page)
            const data = await GetData(browser, page)
            await browser.close()
            return data
        }
        await readCookies(browser, page)
        const data = await GetData(browser, page)
        await browser.close()
        return data

    } catch (e) {
        console.log(e)
        await browser.close()
    }
}

module.exports = {
    startParse
}
