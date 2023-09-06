uniform sampler2D uTexture;
uniform float uTime;

varying float vElevation;

void main() {
    float elevation = texture2D(uTexture, uv).r;
    vElevation = elevation;

    vec3 pos = position + normal * elevation * (sin(uTime * 0.001) + 0.5) * 0.5;    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    
}