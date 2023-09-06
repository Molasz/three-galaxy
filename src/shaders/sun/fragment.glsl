uniform vec3 uDarkColor;
uniform vec3 uLightColor;

varying float vElevation;

void main() {
  vec3 color = mix(uLightColor, uDarkColor, vElevation * 5.0);

  gl_FragColor = vec4(color, 1.0);
}