uniform vec3 uOuterColor;
uniform vec3 uInnerColor;

varying float vElevation;

void main() {
  vec3 color = mix(uOuterColor, uInnerColor, vElevation);

  gl_FragColor = vec4(color, 1.0);
}