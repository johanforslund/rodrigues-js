function rodrigues(rvec) {
  const r = vec3.fromValues(rvec[0], rvec[1], rvec[2]);

  const theta = vec3.length(r);

  const c = Math.cos(theta);
  const s = Math.sin(theta);
  const c1 = 1.0 - c;
  const itheta = theta ? 1.0 / theta : 0.0;

  vec3.scale(r, r, itheta);

  const rrt = mat3.create();
  mat4.set(
    rrt,
    r[0] * r[0],
    r[0] * r[1],
    r[0] * r[2],
    r[0] * r[1],
    r[1] * r[1],
    r[1] * r[2],
    r[0] * r[2],
    r[1] * r[2],
    r[2] * r[2]
  );

  const r_x = mat3.create();
  mat3.set(r_x, 0, -r[2], r[1], r[2], 0, -r[0], -r[1], r[0], 0);

  const x_1 = mat3.create();
  mat3.multiplyScalar(x_1, x_1, c);

  const x_2 = mat3.create();
  mat3.copy(x_2, rrt);
  mat3.multiplyScalar(x_2, x_2, c1);

  const x_3 = mat3.create();
  mat3.copy(x_3, r_x);
  mat3.multiplyScalar(x_3, x_3, s);

  const R_1 = mat3.create();
  mat3.add(R_1, x_1, x_2);

  const R = mat3.create();
  mat3.add(R, R_1, x_3);

  return R;
}
