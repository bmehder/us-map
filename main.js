const localdata = JSON.parse(localStorage.getItem('mapData'))

const map = new FlaMap(localdata || map_cfg).drawOnDomReady('mapElement')

const consoleOutput = () => {
  console.clear()
  for (const item in localdata?.map_data || map_cfg.map_data) {
    console.log(
      localdata?.map_data[item].shortname || map_cfg.map_data[item].shortname,
      localdata?.map_data[item].name || map_cfg.map_data[item].name
    )
  }
}
consoleOutput()

const saveData = () =>
  localStorage.setItem('mapData', JSON.stringify(localdata || map_cfg))

map.on('click', (ev, sid, map) => {
  const count = +map.fetchStateAttr(sid, 'shortname')
  const newCount = count + 1

  map.setStateAttr(sid, { shortname: newCount })
  map.stateLabelModifyText(sid, newCount)

  saveData()
  consoleOutput()
})
