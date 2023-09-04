uniform sampler2D uTexture;

uniform vec3 uDarkColor;
uniform vec3 uLightColor;

varying vec2 vUv;

void main() {
  float elevation = texture2D(uTexture, vUv).r;
  vec3 color = mix(uLightColor, uDarkColor, elevation * 3.0);

  gl_FragColor = vec4(color, 1.0);
}