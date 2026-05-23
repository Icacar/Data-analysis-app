export type SensorCallback = (promille: number) => void

export interface SensorAdapter {
  start: (cb: SensorCallback) => void
  stop: () => void
}

export function createSimulatedSensor(targetPromille: number): SensorAdapter {
  let timer: ReturnType<typeof setTimeout> | null = null

  return {
    start(cb: SensorCallback) {
      // Simulate a 3-second reading with slight noise converging to target
      let elapsed = 0
      const interval = 100
      timer = setInterval(() => {
        elapsed += interval
        const progress = Math.min(elapsed / 3000, 1)
        // Add ±0.02 noise during reading, stabilize at end
        const noise = progress < 0.9 ? (Math.random() - 0.5) * 0.04 : 0
        const current = targetPromille * progress + noise
        cb(Math.max(0, current))

        if (elapsed >= 3000) {
          clearInterval(timer!)
          cb(targetPromille)
        }
      }, interval)
    },

    stop() {
      if (timer) clearInterval(timer)
    },
  }
}
