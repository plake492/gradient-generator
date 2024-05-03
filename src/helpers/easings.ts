/**
 * Cubic easing out - decelerating to zero velocity.
 * @param {number} t - The normalized time (typically in the range [0, 1]).
 * @returns {number} The eased value.
 */
export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)
