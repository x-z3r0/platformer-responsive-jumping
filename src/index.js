import * as canvas from './canvas';
import {isKeyDown} from './keyMonitor';
import * as diagnostics from './diagnostics';

const player = {
  x: 0,

  y: 0,
  yv: 0,

  maxJumpHeight: 400,
  minJumpHeight: 10,

  maxJumpTime: 20,

  jumpKeyLetGo: false,

  isOnGround: false,
  isJumping: false,

  width: 75,
  height: 75,

  TEST_framesJumped: 0,
};

const groundLevel = player.height / -2;

const handlePhysics = p => {
  const gravity = (p.maxJumpHeight * 2) / (p.maxJumpTime ** 2);
  const initialVelocity = Math.sqrt(gravity * p.maxJumpHeight * 2);

  if(isKeyDown(' ')) {
    if(p.isOnGround) {
      p.yv = initialVelocity;
      p.isJumping = true;
      p.jumpKeyLetGo = false;
    }
  } else if(p.isJumping && !p.jumpKeyLetGo) {
    p.jumpKeyLetGo = true;

    if(p.yv > 0) {
      let num = gravity * (p.minJumpHeight * 2 - initialVelocity * 2 + gravity);
      p.yv *= Math.sign(num) * (Math.sqrt(Math.abs(num))) / (initialVelocity - gravity);
    }
  }

  p.yv -= gravity / 2;
  p.y += p.yv;

  p.yv -= gravity / 2;

  if (p.y <= groundLevel + player.height / 2) {
    p.isOnGround = true;
    p.isJumping = false;
    p.y = groundLevel + player.height / 2;
    p.yv = 0;
  } else {
    p.isOnGround = false;
  }
};

const drawPlayer = (ctx, p) => {
  const drawX = (p.x - (p.width / 2)) + (canvas.getDim().w / 2);
  const drawY = ((p.y * -1) - (p.height / 2)) + (canvas.getDim().h / 2);

  ctx.fillStyle = '#fff';
  ctx.fillRect(drawX, drawY, p.width, p.height);
};

canvas.setCustomFrameRate(60);

canvas.init(ctx => {
  handlePhysics(player);

  drawPlayer(ctx, player);

  diagnostics.display(ctx, player);
});