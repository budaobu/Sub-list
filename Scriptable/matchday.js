/*******
* Copy from:https://gist.github.com/bsehovac/60da2fa1c541e7aa89cdba1beeb9a584
*/
const TEAM_ID = 133667 // AC Milan
const DARK_MODE = true

const textSize = 9.5
const logoSize = 38
const spacing = {
  normal: 8,
  smaller: 6,
  vs: 5,
  widget: 2
}

const fetchData = async (url, type = 'loadJSON') => {
  const request = new Request(url)
  const res = await request[type]()
  return res
}

const getTeamData = async id => {
  const url = 'https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id='
  const teamUrl = url + id
  const data = (await fetchData(teamUrl)).teams[0]
  return {
    image: await fetchData(`${data.strTeamBadge}/preview`, 'loadImage'),
    stadium: data.strStadium
  }
}

const getEventData = async () => {
  const url = 'https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id='
  const event = (await fetchData(url + TEAM_ID)).events[0]
  const home = await getTeamData(event.idHomeTeam)
  const away = await getTeamData(event.idAwayTeam)
  return {
    competition: event.strLeague,
    homeLogo: home.image,
    awayLogo: away.image,
    homeTeam: event.strHomeTeam,
    awayTeam: event.strAwayTeam,
    date: event.strTimestamp,
    stadium: home.stadium,
  }
}

const getFormattedDate = timestamp => {
  const formats = [
    "MMM d, yyyy 'at' h:mm a",
    "'Tomorrow at' h:mm a",
    "'Today at' h:mm a",
  ]

  const millisPerDay = 24 * 60 * 60 * 1000
  const matchDay = (new Date(timestamp)).setHours(0, 0, 0, 0)
  const today = (new Date()).setHours(0, 0, 0, 0)
  const diff = (matchDay - today) / millisPerDay
  const format = diff < 1 ? 2 : diff < 2 ? 1 : 0

  const dateFormatter = new DateFormatter()
  dateFormatter.dateFormat = formats[format]
  return dateFormatter.string(new Date(timestamp))
}

const addText = (el, string, type) => {
  const text = el.addText(string)
  text.font = type === 'bold' ?
    Font.boldSystemFont(textSize * 1.2) :
    Font.regularSystemFont(textSize)
  text.textColor = new Color(DARK_MODE ? '#fff' : '#000', 1)
  text.centerAlignText()
}

const addImage = (el, src) => {
  const image = el.addImage(src)
  image.imageSize = new Size(logoSize, logoSize)
}

const addSpacer = (el, type) => {
  el.addSpacer(spacing[type])
}

const addLogos = (el, homeLogo, awayLogo) => {
  const s = el.addStack()
  s.centerAlignContent()
  addSpacer(s)
  addImage(s, homeLogo)
  addSpacer(s, 'vs')
  addText(s, 'vs')
  addSpacer(s, 'vs')
  addImage(s, awayLogo)
  addSpacer(s)
}

const initWidget = () => {
  const w = new ListWidget()
  w.backgroundColor = new Color(DARK_MODE ? '#1B1B1B' : '#ffffff')
  w.setPadding(
    spacing.widget, spacing.widget,
    spacing.widget, spacing.widget,
  )
  return w
}

const createNextMatchWidget = async () => {
  const d = await getEventData()
  const w = initWidget()

  addSpacer(w)
  addText(w, d.competition)
  addSpacer(w, 'normal')
  addLogos(w, d.homeLogo, d.awayLogo)
  addSpacer(w, 'normal')
  addText(w, d.homeTeam.toUpperCase(), 'bold')
  addText(w, d.awayTeam.toUpperCase(), 'bold')
  addSpacer(w, 'smaller')
  addText(w, getFormattedDate(d.date))
  addText(w, d.stadium)
  addSpacer(w)

  return w
}

const widget = await createNextMatchWidget()

Script.setWidget(widget)
Script.complete()

await widget.presentSmall()
