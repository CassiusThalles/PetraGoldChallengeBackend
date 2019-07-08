/*******************************************************************************
************************ controller.js file (controllers/apis) *****************
*******************************************************************************/

const express = require('express');
const knightService = require('../../services/knights/knight');
const weaponService = require('../../services/weapons/weapon');
let router = express.Router();

//routers to the knight API
router.get('/knights', knightService.getKnights);
router.get('/knights/:id', knightService.getKnightById);
router.post('/knights', knightService.createKnight);
router.put('/knights/:id', knightService.updateKnight);
router.delete('/knights/:id', knightService.deleteKnight);

//routers to the weapon API
router.get('/weapons', weaponService.getWeapons);
router.get('/weapons/:id', weaponService.getWeaponById);
router.post('/weapons', weaponService.createWeapon);
router.put('/weapons/:id', weaponService.updateWeapon);
router.delete('/weapons/:id', weaponService.deleteWeapon);

module.exports = router;