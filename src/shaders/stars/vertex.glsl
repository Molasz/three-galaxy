uniform float uPixelRatio;
uniform float uTime;
uniform float uSpeed;

attribute float aSize;
attribute float aRandom;
attribute vec2 aColor;

varying vec2 vColor;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;

    gl_PointSize = aSize * aRandom;
    
    float sizeAugment = (abs(sin(uTime * uSpeed * 0.00001 * aRandom)) + 1.0) * 2.0;
    gl_PointSize *= sizeAugment;
    
    gl_PointSize *= (1.0 / -viewPosition.z) * uPixelRatio;

    vColor = aColor;
}