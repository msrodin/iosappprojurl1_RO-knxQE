import * as RODIN from 'rodin/core';
RODIN.start();

RODIN.Scene.add(new RODIN.Sculpt(new THREE.AmbientLight()));

let hoverAnimation = new RODIN.AnimationClip("hoverAnim", {scale: {x: 1.2, y: 1.2, z: 1.2}});
hoverAnimation.duration(100);

let hoverOutAnimation = new RODIN.AnimationClip("hoverOutAnim", {scale: {x: 1, y: 1, z: 1}});
hoverOutAnimation.duration(100);

for (let i = 0; i < 40; i++) {
  let box = new RODIN.Box(.2, .2, .2, new THREE.MeshNormalMaterial({wireframe: true, color: 0x996633}));
  box.animation.add(hoverAnimation, hoverOutAnimation);
  box.on(RODIN.CONST.READY, onReady);
  box.on(RODIN.CONST.GAMEPAD_HOVER, hover);
  box.on(RODIN.CONST.GAMEPAD_HOVER_OUT, hoverOut);
}

function onReady(evt) {
  evt.target.position.set(Math.random() * 4 - 2, Math.random() * 4 - 0.4, Math.random() * 4 - 2);
  RODIN.Scene.add(evt.target);
}
function hover(evt) {
  if (evt.target.animation.isPlaying('hoverOutAnim')) {
    evt.target.animation.stop('hoverOutAnim', false);
  }
  evt.target.animation.start('hoverAnim');
}
function hoverOut(evt) {
  if (evt.target.animation.isPlaying('hoverAnim')) {
    evt.target.animation.stop('hoverAnim', false);
  }
  evt.target.animation.start('hoverOutAnim');
}
