export function getAbbreviatedName(name: string) {
  const splittedName = name.trim().split(' ')

  const abbreviatedName = splittedName[0][0] + splittedName.reverse()[0][0]

  return abbreviatedName.toUpperCase()
}
