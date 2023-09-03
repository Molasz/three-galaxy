varying vec2 vColor;

void main() {
    float strength = pow(1.0 - distance(gl_PointCoord, vec2(0.5)), 8.0);
    vec3 color = vec3(vColor + 0.75, 0.0);

    gl_FragColor = vec4(color, strength);
}