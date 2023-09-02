uniform float uPixelRatio;
uniform float uSize;
uniform float uTime;
varying vec2 vUv;

attribute float aRandom;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;

    gl_PointSize = uSize * uPixelRatio * tan(aRandom) * 25.0;
    gl_PointSize *= sin(uTime * aRandom * 0.0005);
    gl_PointSize = max(gl_PointSize, 1000.0);
    gl_PointSize *= (1.0 / -viewPosition.z);

    vUv = uv;
}