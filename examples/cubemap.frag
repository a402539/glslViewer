#ifdef GL_ES
precision mediump float;
#endif

uniform samplerCube u_cubeMap;

uniform vec3        u_light;
uniform vec3        u_camera;

varying vec4        v_position;

#ifdef V_COLOR
varying vec4        v_color;
#endif
varying vec3        v_normal;
varying vec2        v_texcoord;

void main(void) {
   vec3 color = vec3(1.0);

#ifdef V_COLOR
    color = v_color.rgb;
#endif

    vec3 refle = reflect(v_position.xyz - u_camera, v_normal);

    vec4 reflection = textureCube(u_cubeMap, refle);

    // Reinhard tonemapping
    reflection = reflection / (reflection + vec4(1.0));

    color *= 0.25 + reflection.rgb;

    float shade = dot(v_normal, normalize(vec3(u_light)));
    color *= smoothstep(-1.0, 1.0, shade);

    gl_FragColor = vec4(color, 1.0);
}
