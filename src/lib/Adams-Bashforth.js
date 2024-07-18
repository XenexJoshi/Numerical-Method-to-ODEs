import Runge_Kutta from "./Runge-Kutta";

function generate_y(f, t0, y0, dest, h) {
  let result = Runge_Kutta(f, t0, y0, dest, h);
  let inter = result[1];
  return inter[inter.length - 1];
}

function fn(f, t_val, y_val) {
  return f({
    t: t_val,
    y: y_val
  })
}

function fourth_order(f, s0, s1, s2, s3, h) {
  return (
    s3[1] + (h * ((55 * fn(f, s3[0], s3[1])) -
      (59 * fn(f, s2[0], s2[1])) + (37 * fn(f, s1[0], s1[1])) -
      (9 * fn(f, s0[0], s0[1]))) / 24)
  );
}

function Adams_Bashforth(f, t0, y0, dest, step) {
  const h = parseFloat(step);
  const count = (parseFloat(dest) - parseFloat(t0)) / h;
  if (count <= 3) {
    return Runge_Kutta(f, t0, y0, dest, h);
  }
  let s0 = [parseFloat(t0), parseFloat(y0)];
  let s1 = [t0 + h, generate_y(f, t0, y0, t0 + h, h)];
  let s2 = [t0 + (2 * h), generate_y(f, t0, y0, t0 + (2 * h), h)];
  let s3 = [t0 + (3 * h), generate_y(f, t0, y0, t0 + (3 * h), h)];

  let x_tab = [s0[0], s1[0], s2[0], s3[0]];
  let y_tab = [s0[1], s1[1], s2[1], s3[1]];

  for (let i = s3[0] + h; i <= parseFloat(dest); i += h) {
    let t_temp = i;
    let y_temp = fourth_order(f, s0, s1, s2, s3, h);

    x_tab.push(t_temp);
    y_tab.push(y_temp);

    s0 = s1;
    s1 = s2;
    s2 = s3;
    s3 = [t_temp, y_temp];
  } return [x_tab, y_tab];
}

export default Adams_Bashforth;