<template>
  <canvas ref="canvas" :style="canvasStyle"></canvas>
</template>

<script>
export default {
  name: "ParticleBackground",
  props: {
    zIndex: {
      type: Number,
      default: -1,
    },
    opacity: {
      type: Number,
      default: 0.5,
    },
  },
  data() {
    return {
      animationId: null,
    };
  },
  computed: {
    canvasStyle() {
      return {
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: this.zIndex,
        opacity: this.opacity,
        pointerEvents: "none",
        width: "100vw",
        height: "100vh",
      };
    },
  },
  mounted() {
    this.initParticles();
  },
  beforeDestroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
  },
  methods: {
    initParticles() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
      let a, c, u;
      function randomColor() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
      }
      function resize() {
        a = canvas.width = window.innerWidth;
        c = canvas.height = window.innerHeight;
      }
      resize();
      window.addEventListener("resize", resize);
      const w = Math.random,
        count = 99;
      let y = { x: null, y: null, max: 20000 };
      let s = [];
      for (let f = 0; count > f; f++) {
        let h = w() * a,
          g = w() * c,
          v = 2 * w() - 1,
          p = 2 * w() - 1;
        s.push({ x: h, y: g, xa: v, ya: p, max: 6000 });
      }
      u = s.concat([y]);
      function draw() {
        ctx.clearRect(0, 0, a, c);
        s.forEach(function (i, x) {
          for (
            i.x += i.xa,
              i.y += i.ya,
              i.xa *= i.x > a || i.x < 0 ? -1 : 1,
              i.ya *= i.y > c || i.y < 0 ? -1 : 1,
              ctx.fillRect(i.x - 0.5, i.y - 0.5, 1, 1),
              e = x + 1;
            e < u.length;
            e++
          ) {
            let n = u[e],
              o,
              m,
              l,
              t;
            if (null !== n.x && null !== n.y) {
              (o = i.x - n.x), (m = i.y - n.y);
              l = o * o + m * m;
              if (l < n.max) {
                if (n === y && l >= n.max / 2) {
                  i.x -= 0.03 * o;
                  i.y -= 0.03 * m;
                }
                t = (n.max - l) / n.max;
                ctx.beginPath();
                ctx.lineWidth = t / 2;
                ctx.strokeStyle = randomColor();
                ctx.moveTo(i.x, i.y);
                ctx.lineTo(n.x, n.y);
                ctx.stroke();
              }
            }
          }
        });
        this.animationId = requestAnimationFrame(draw.bind(this));
      }
      window.onmousemove = function (evt) {
        y.x = evt.clientX;
        y.y = evt.clientY;
      };
      window.onmouseout = function () {
        y.x = null;
        y.y = null;
      };
      draw.call(this);
    },
  },
};
</script>
