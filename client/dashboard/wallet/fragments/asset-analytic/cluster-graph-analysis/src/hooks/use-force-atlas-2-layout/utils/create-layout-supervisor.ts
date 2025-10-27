import forceAtlas2Worker from 'graphology-layout-forceatlas2/worker.js'

export const FA2LayoutSupervisor =
  'default' in forceAtlas2Worker ? forceAtlas2Worker.default : forceAtlas2Worker

export type FA2LayoutSupervisorInstance = InstanceType<typeof FA2LayoutSupervisor>
