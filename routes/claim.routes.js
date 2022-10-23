const { Router } = require('express')
const { startParse } = require('../utils/puppeteer')
const getDetails = require('../utils/service.httpGetDetails')
const getCoordinates = require('../utils/service.httpGetCoordinates')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const data = await startParse()
        res.json(data)

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/coordinates/:id',async (req, res) => {
    try {
        const coordinates = await getCoordinates(req.params.id)
        res.json(coordinates)

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.get('/detail/:id',async (req, res) => {
    try {
        const detail = await getDetails(req.params.id)
        res.json(detail)

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})


module.exports = router

