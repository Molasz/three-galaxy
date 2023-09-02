uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
    // float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    // float strength = 0.05 / distanceToCenter;
    // gl_FragColor = vec4(1.0, 1.0, 0.0, strength - 0.1);

    vec4 texture = texture2D(uTexture, vUv);
    texture.rgb = vec3(1.0,1.0,0.0);

    gl_FragColor = texture;
}