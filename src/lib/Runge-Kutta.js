/**
 * [getK1(f, t_val, y_val)] is the first-step approximation term in the Runge-Kutta
 * approximation of the function f starting at point (t_val, y_val).
 */
function getK1(f, t_val, y_val) {
  return f({
    t: t_val,
    y: y_val
  });
}

/**
 * [getKi(f, t_val, y_val, h, kb)] is the second/third-step approximation term in the 
 * Runge-Kutta approximation of the function f starting at point (t_val, y_val)
 * , with step-size h and last-term kb.
 */
function getKi(f, t_val, y_val, h, kb) {
  return f({
    t: (t_val + (h / 2)),
    y: (y_val + ((h * kb) / 2))
  });
}

/**
 * [getK4(f, t_val, y_val, h, kb)] is the fourth-step approximation term in the 
 * Runge-Kutta approximation of the function f starting at point (t_val, y_val), 
 * with step-size h and last-term kb.
 */
function getK4(f, t_val, y_val, h, kb) {
  return f({
    t: (t_val + h),
    y: (y_val + (h * kb))
  })
}

/**
 * [next_step(f, t_val, y_val, h)] is the next term in the Runge-Kutta 
 * approximation of function f, with current position (t_val, y_val) with 
 * step-size h.
 */
function next_step(f, t_val, y_val, h) {
  let k1 = getK1(f, t_val, y_val);
  let k2 = getKi(f, t_val, y_val, h, k1);
  let k3 = getKi(f, t_val, y_val, h, k2);
  let k4 = getK4(f, t_val, y_val, h, k3);

  let t_next = t_val + h;
  let y_next = y_val + (h * (k1 + (2 * k2) + (2 * k3) + k4) / 6);

  return [t_next, y_next];
}

/**
 * [Runge-Kutta(f, t0, y0, dest, step)] is the result of Runge-Kutta
 * approximation on function f, with initial conditions (t0, y0) evaluated at
 * point t = dest and step-size step. The result of the function is [t_tab, y_tab]
 * where t_tab is an array of t-coordinates used for approximation and y_tab is
 * an array of corresponding y-values.
 */
function Runge_Kutta(f, t0, y0, dest, step) {
  const h = parseFloat(step);

  let t_temp = parseFloat(t0);
  let y_temp = parseFloat(y0);
  let t_tab = [t_temp];
  let y_tab = [y_temp];

  for (let i = parseFloat(t0) + h; i <= parseFloat(dest); i += h) {
    let curr = next_step(f, t_temp, y_temp, h);
    t_temp = curr[0];
    y_temp = curr[1];

    t_tab.push(t_temp);
    y_tab.push(y_temp);
  } return [t_tab, y_tab];
}

export default Runge_Kutta;