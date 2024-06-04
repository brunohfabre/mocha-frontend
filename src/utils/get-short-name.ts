export function getShortName(name: string) {
  const splittedName = name.trim().split(' ')

  const shortName = `${splittedName[0]} ${splittedName.reverse()[0]}`

  return shortName
}
