function getK1(f, t_val, y_val) {
  return f({
    t: t_val,
    y: y_val
  });
}

function getKi(f, t_val, y_val, h, kb) {
  return f({
    t: (t_val + (h / 2)),
    y: (y_val + ((h * kb) / 2))
  });
}

function getK4(f, t_val, y_val, h, kb) {
  return f({
    t: (t_val + h),
    y: (y_val + (h * kb))
  })
}

function next_step(f, t_val, y_val, h) {
  let k1 = getK1(f, t_val, y_val);
  let k2 = getKi(f, t_val, y_val, h, k1);
  let k3 = getKi(f, t_val, y_val, h, k2);
  let k4 = getK4(f, t_val, y_val, h, k3);

  let t_next = t_val + h;
  let y_next = y_val + (h * (k1 + (2 * k2) + (2 * k3) + k4) / 6);

  return [t_next, y_next];
}

function Runge_Kutta(f, t0, y0, dest, step) {
  const h = parseFloat(step);

  let t_temp = parseFloat(t0);
  let y_temp = parseFloat(y0);
  let t_tab = [t_temp];
  let y_tab = [t_temp];

  for (let i = parseFloat(t0); i < parseFloat(dest); i += h) {
    let curr = next_step(f, t_temp, y_temp, h);
    t_temp = curr[0];
    y_temp = curr[1];

    t_tab.push(t_temp);
    y_tab.push(y_temp);
  } return y_tab[y_tab.length - 1];
}

export default Runge_Kutta;