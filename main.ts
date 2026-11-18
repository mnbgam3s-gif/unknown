namespace SpriteKind {
    export const Portal = SpriteKind.create()
    export const Memory = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (finalChoiceOpen && !(gameFinished)) {
        showEnding(2)
    }
})
// ENDING BUTTONS
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (finalChoiceOpen && !(gameFinished)) {
        if (memoriesFound == 3) {
            showEnding(3)
        } else {
            showEnding(1)
        }
    }
})
// ENTER PORTAL
sprites.onOverlap(SpriteKind.Player, SpriteKind.Portal, function (sprite, otherSprite) {
    if (gameFinished || finalChoiceOpen) {
        return
    }
    if (area < 5) {
        otherSprite.destroy()
        area += 1
        loadArea()
    } else {
        otherSprite.destroy()
        finalChoiceOpen = true
        game.showLongText("You have reached the final room.\n\nPRESS A to escape.\nPRESS B to remain.", DialogLayout.Bottom)
    }
})
// LOAD AREA
function loadArea () {
    if (portal) {
        portal.destroy()
    }
    if (memory) {
        memory.destroy()
        memory = null
    }
    tiles.setCurrentTilemap(tilemap`UNKNOWN_Room_01`)
    scene.setBackgroundColor(area + 1)
    mySprite.setImage(originalPlayerImage)
    mySprite.setPosition(45, 45)
    createPortal()
    createMemory()
    showAreaStory()
}
// COLLECT MEMORY
sprites.onOverlap(SpriteKind.Player, SpriteKind.Memory, function (sprite, otherSprite) {
    otherSprite.destroy()
    memory = null
memoriesFound += 1
    game.showLongText("" + "MEMORY RECOVERED\n" + memoriesFound + " / 3", DialogLayout.Bottom)
})
// AREA STORY
function showAreaStory () {
    if (area == 0) {
        game.showLongText("AREA 01 — THE QUIET ROOM\n\nEverything seems normal.", DialogLayout.Bottom)
    } else if (area == 1) {
        game.showLongText("AREA 02 — THE SHIFTING HALL\n\nThis place feels familiar.", DialogLayout.Bottom)
    } else if (area == 2) {
        game.showLongText("AREA 03 — THE FORGOTTEN FLOOR\n\nYOU HAVE BEEN HERE BEFORE.", DialogLayout.Bottom)
    } else if (area == 3) {
        game.showLongText("AREA 04 — THE OBSERVER\n\nUNKNOWN: I can see you.", DialogLayout.Bottom)
    } else if (area == 4) {
        game.showLongText("AREA 05 — THE BROKEN WORLD\n\nThe rules are changing.", DialogLayout.Bottom)
    } else if (area == 5) {
        game.showLongText("AREA 06 — THE FINAL ROOM\n\nThis is where it ends.", DialogLayout.Bottom)
    }
}
// ENDING
function showEnding (ending: number) {
    if (gameFinished) {
        return
    }
    gameFinished = true
    music.stopAllSounds()
    if (ending == 1) {
        game.showLongText("ENDING 01 — THE ESCAPE\n\nYou leave the unknown world behind.", DialogLayout.Full)
    } else if (ending == 2) {
        game.showLongText("ENDING 02 — THE LOOP\n\nThe room returns. The story begins again.", DialogLayout.Full)
    } else {
        game.showLongText("ENDING 03 — THE TRUTH\n\nYou remember everything.", DialogLayout.Full)
    }
    game.splash("UNKNOWN", "THE END")
    game.over(true)
}
// STRANGE TILE
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.floorLight3, function (sprite, location) {
    if (!(strangeTileUsed)) {
        strangeTileUsed = true
        music.stopAllSounds()
        sprite.setImage(img`
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
            `)
        pause(1000)
        sprite.setImage(originalPlayerImage)
        game.showLongText("UNKNOWN: That wasn't supposed to happen.", DialogLayout.Bottom)
    }
})
// PORTAL CREATION
function createPortal () {
    portal = sprites.create(img`
        . . . 5 5 5 5 . . 
        . . 5 5 5 5 5 5 . 
        . 5 5 1 1 1 5 5 5 
        5 5 1 1 1 1 1 5 5 
        5 5 1 1 1 1 1 5 5 
        5 5 1 1 1 1 1 5 5 
        . 5 5 1 1 1 5 5 5 
        . . 5 5 5 5 5 5 . 
        . . . 5 5 5 5 . . 
        `, SpriteKind.Portal)
    portal.setPosition(205, 160)
}
// MEMORY CREATION
function createMemory () {
    if (area >= 1 && area <= 3) {
        memory = sprites.create(img`
            . . . 8 8 . . . 
            . . 8 9 9 8 . . 
            . 8 9 9 9 9 8 . 
            8 9 9 9 9 9 9 8 
            8 9 9 9 9 9 9 8 
            . 8 9 9 9 9 8 . 
            . . 8 9 9 8 . . 
            . . . 8 8 . . . 
            `, SpriteKind.Memory)
        memory.setPosition(85, 75)
    }
}
let strangeTileUsed = false
let portal: Sprite = null
let memoriesFound = 0
let gameFinished = false
let finalChoiceOpen = false
let area = 0
let mySprite: Sprite = null
let originalPlayerImage: Image = null
let memory: Sprite = null
// PLAYER
originalPlayerImage = img`
    ......44....44.....
    .....422....244....
    ....4222....224....
    ...42222....2224...
    ..42222222222224...
    ..42222222222224...
    .4222222222222224..
    .42221111111122224.
    4222111111111122224
    4222111551115112224
    422211141114112224.
    .42221111111122224.
    ..422211111122224..
    ...222333322222....
    ....2233333222.....
    ...42223322244.....
    ..422222222224.....
    .42223322332224....
    4222222222222224...
    4422233223322244...
    .422222..222244....
    ..222......222.....
    `
mySprite = sprites.create(originalPlayerImage, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 100)
scene.cameraFollowSprite(mySprite)
// INTRO
game.splash("UNKNOWN", "A world that remembers...")
game.showLongText("You wake up in a quiet room. You don't remember arriving here.", DialogLayout.Bottom)
// MUSIC AND ROOM
tiles.setCurrentTilemap(tilemap`UNKNOWN_Room_01`)
music.play(pianoRoll.createSong(assets.song`Unknown_Opening_Drums`), music.PlaybackMode.LoopingInBackground)
// START
area = 0
loadArea()
